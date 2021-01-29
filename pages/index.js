import 'semantic-ui-css/semantic.min.css'
import factory from '../ethereum/factory';
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
        <div>
            <h3>Open Campaigns</h3>
            {renderCampaigns()}
            <Button content="Create Campaign" icon="add circle" primary />
        </div>
    );
}

CampaignIndex.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
}