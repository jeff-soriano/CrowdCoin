import React, { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

export default function RequestNew({ address }) {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function onSubmit(event) {
        event.preventDefault();

        setErrorMessage('');
        setLoading(true);
        try {
            const campaign = await Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, 'ether'),
                    recipientAddress
                )
                .send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${address}/requests`)
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    }

    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests`}>
                View requests
            </Link>
            <h1>Create a Request</h1>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient address</label>
                    <Input
                        value={recipientAddress}
                        onChange={event => setRecipientAddress(event.target.value)} />
                </Form.Field>

                <Message error header="Oops!" content={errorMessage} />
                <Button primary loading={loading}>Create request!</Button>
            </Form>
        </Layout>
    );
}

RequestNew.getInitialProps = async (ctx) => {
    const address = ctx.query.address;

    return { address };
}