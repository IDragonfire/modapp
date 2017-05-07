import React from 'react';

import Page from '../components/Page.jsx';

export default class Home extends React.Component {
    render() {
        return (
            <Page title="Home">
                <div className="jumbotron" id="header">
                    <center>
                        <div className="panel-transparent">
                            <h1>Mod Management</h1>
                            <h2>Forged Alliance Forever</h2>
                        </div>
                    </center>
                </div>
            </Page>
        );
    }
}
