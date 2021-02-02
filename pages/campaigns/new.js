import React from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input } from 'semantic-ui-react';

export default function CampaignNew() {
    return (
        <Layout>
            <h3>Create a Campaign</h3>

            <Form>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input label='wei' labelPosition='right' />
                </Form.Field>
                <Button primary>Create Campaign</Button>
            </Form>
        </Layout>
    );
}