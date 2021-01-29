import React, { useEffect } from 'react';
import factory from '../ethereum/factory';

export default function CampaignIndex({ campaigns }) {
    return <div>{campaigns[0]}</div>;
}

CampaignIndex.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
}