import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

export default function RequestRow({ id, request, address, numApprovers }) {

    function renderRow() {
        const { Row, Cell } = Table;

        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{numApprovers}</Cell>
                <Cell>
                    <Button color='green' basic onClick={onApprove}>Approve</Button>
                </Cell>
                <Cell>
                    <Button color='teal' basic onClick={onFinalize}>Finalize</Button>
                </Cell>
            </Row>
        );
    }

    async function onApprove() {
        const campaign = await Campaign(address);
        const accounts = await web3.eth.getAccounts();

        await campaign.methods.approveRequest(id).send({
            from: accounts[0]
        });
    }

    async function onFinalize() {
        const campaign = await Campaign(address);
        const accounts = await web3.eth.getAccounts();

        await campaign.methods.finalizeRequest(id).send({
            from: accounts[0]
        });
    }

    return (
        <>
            {renderRow()}
        </>
    );
}