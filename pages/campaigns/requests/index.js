import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';

export default function RequestIndex({ address, requests, numRequests }) {
    return (
        <Layout>
            <h1>Requests</h1>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
        </Layout>
    );
};

RequestIndex.getInitialProps = async (ctx) => {
    const address = ctx.query.address;
    const campaign = Campaign(address);
    const numRequests = await campaign.methods.numRequests().call();

    const requests = await Promise.all(
        Array(parseInt(numRequests)).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, numRequests };
}