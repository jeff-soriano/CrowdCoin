import React, { useState } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

export default function ContributeForm({ address }) {
    const [value, setValue] = useState('');

    async function onSubmit(event) {
        event.preventDefault();

        try {
            const campaign = await Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    label='ether'
                    labelPosition='right'
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button primary>
                    Contribute!
                </Button>
            </Form.Field>
        </Form>
    );
}