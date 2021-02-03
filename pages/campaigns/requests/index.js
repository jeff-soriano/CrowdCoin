import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

export default function RequestIndex({ address, requests, numRequests, numApprovers }) {

    function renderTable() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
        );
    }

    function renderRows() {
        return requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={address}
                numApprovers={numApprovers}
            />
        });
    }

    return (
        <Layout>
            <h1>Requests</h1>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary floated='right' style={{ marginBottom: 10 }}>Add Request</Button>
                </a>
            </Link>
            {renderTable()}
        </Layout>
    );
};

RequestIndex.getInitialProps = async (ctx) => {
    const address = ctx.query.address;
    const campaign = Campaign(address);
    const numRequests = await campaign.methods.numRequests().call();
    const numApprovers = await campaign.methods.numApprovers().call();

    const requests = await Promise.all(
        Array(parseInt(numRequests)).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, numRequests, numApprovers };
}