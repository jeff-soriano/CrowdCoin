// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minContribution) public {
        address campaignAddress =
            address(new Campaign(minContribution, msg.sender));

        deployedCampaigns.push(campaignAddress);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint256 public minimumContribution;
    uint256 public numRequests;
    uint256 public numApprovers;
    mapping(address => bool) public approvers;
    mapping(uint256 => Request) public requests;

    constructor(uint256 minContribution, address creator) {
        // The manager will be the person deploying the contract
        manager = creator;
        minimumContribution = minContribution;
        numRequests = 0;
    }

    modifier restrictedToManager() {
        require(
            msg.sender == manager,
            "Only the manager can use this function"
        );
        _;
    }

    modifier requestValueLessThanBalance(uint256 value) {
        require(
            value <= address(this).balance,
            "Your request value must be less than or equal to the contract's current balance"
        );
        _;
    }

    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "Contribution amount does not meet minimum contribution amount"
        );

        // Only increment number of approvers once so that one address can't cound as multiple approvers even after
        // contributing more than once
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            numApprovers++;
        }
    }

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    )
        public
        restrictedToManager
        requestValueLessThanBalance(value)
        returns (uint256 requestId)
    {
        requestId = numRequests++;
        Request storage request = requests[requestId];

        request.description = description;
        request.value = value;
        request.recipient = recipient;
        request.approvalCount = 0;
    }

    function approveRequest(uint256 requestId) public {
        Request storage request = requests[requestId];

        require(
            approvers[msg.sender],
            "You must be a contributor to this camapgin to approve requests"
        );
        require(
            !request.approvals[msg.sender],
            "You have already approved this request"
        );

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 requestId)
        public
        payable
        restrictedToManager
        requestValueLessThanBalance(requests[requestId].value)
    {
        Request storage request = requests[requestId];

        require(
            !requests[requestId].complete,
            "This request has already been finalized"
        );
        require(
            requests[requestId].approvalCount > (numApprovers / 2),
            "You must have the approval of the majority of contributors"
        );

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }
}
