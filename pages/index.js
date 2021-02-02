import 'semantic-ui-css/semantic.min.css'
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Card, Button } from 'semantic-ui-react'

export default function CampaignIndex({ campaigns }) {
    function renderCampaigns() {
        const items = campaigns.map(campaign => {
            return {
                header: campaign,
                description: <a>View Campaign</a>,
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    return (
        <Layout>
            <div>
                <h3>Open Campaigns</h3>
                <Button floated='right' content="Create Campaign" icon="add circle" primary />
                {renderCampaigns()}
            </div>
        </Layout>
    );
}

CampaignIndex.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
}