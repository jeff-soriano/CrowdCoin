import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';

export default function RequestIndex({ address }) {
    return (
        <Layout>
            <h1>Requests</h1>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
        </Layout>
    );
};

RequestIndex.getInitialProps = async (ctx) => {
    const address = ctx.query.address;

    return { address };
}