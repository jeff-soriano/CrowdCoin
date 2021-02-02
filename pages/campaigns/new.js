import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

export default function CampaignNew() {
    const [minContribution, setMinContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit(event) {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();

        setLoading(true);
        setErrorMessage('');
        try {
            await factory.methods
                .createCampaign(minContribution)
                .send({
                    from: accounts[0]
                });
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    }

    return (
        <Layout>
            <h3>Create a Campaign</h3>

            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label='wei'
                        labelPosition='right'
                        value={minContribution}
                        onChange={event => setMinContribution(event.target.value)} />
                </Form.Field>

                <Message error header='Oops!' content={errorMessage} />
                <Button loading={loading} primary>Create Campaign</Button>
            </Form>
        </Layout>
    );
}