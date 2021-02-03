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

    return (
        <Layout>
            <h1>Create a Request</h1>
            <Form>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={event => setDescription(event.target.description)}
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

                <Button primary>Create request!</Button>
            </Form>
        </Layout>
    );
}

RequestNew.getInitialProps = async (ctx) => {
    const address = ctx.query.address;

    return { address };
}