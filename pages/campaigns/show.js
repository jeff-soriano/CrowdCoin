import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

export default function CampaignShow() {
    return (
        <Layout>
            <h1>Campaign show!</h1>
        </Layout>
    );
}

CampaignShow.getInitialProps = async (ctx) => {
    const campaign = await Campaign(ctx.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
        minimumContribution: summary[0],
        balance: summary[1],
        numRequests: summary[2],
        numApprovers: summary[3],
        manager: summary[4]
    };
}