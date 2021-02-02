import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

export default function CampaignNew() {
    const [minContribution, setMinContribution] = useState('');

    async function onSubmit(event) {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();

        await factory.methods
            .createCampaign(minContribution)
            .send({
                from: accounts[0]
            });
    }

    return (
        <Layout>
            <h3>Create a Campaign</h3>

            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label='wei'
                        labelPosition='right'
                        value={minContribution}
                        onChange={event => setMinContribution(event.target.value)} />
                </Form.Field>
                <Button primary>Create Campaign</Button>
            </Form>
        </Layout>
    );
}