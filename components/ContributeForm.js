import React from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';

export default function ContributForm() {
    return (
        <Form>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    label='ether'
                    labelPosition='right'
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