import React, { useState } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

export default function ContributeForm({ address }) {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function onSubmit(event) {
        event.preventDefault();

        setErrorMessage('');
        setLoading(true);
        try {
            const campaign = await Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });

            Router.replaceRoute(`/campaigns/${address}`);
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
        setValue('');
    }

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    label='ether'
                    labelPosition='right'
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>
                Contribute!
            </Button>
        </Form>
    );
}