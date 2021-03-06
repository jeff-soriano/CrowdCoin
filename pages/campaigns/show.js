import React from 'react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Link } from '../../routes';

export default function CampaignShow({
    address,
    minimumContribution,
    balance,
    numRequests,
    numApprovers,
    manager }) {

    function renderCards() {
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and ' +
                    'can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },
            {
                header: numRequests,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved'
            },
            {
                header: numApprovers,
                meta: 'Number of Approvers',
                description: 'The number of people who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend'
            }
        ];

        return <Card.Group items={items} />;
    }
    return (
        <Layout>
            <h1>Campaign view</h1>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
}

CampaignShow.getInitialProps = async (ctx) => {
    const campaign = await Campaign(ctx.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
        address: ctx.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        numRequests: summary[2],
        numApprovers: summary[3],
        manager: summary[4]
    };
}