import React from 'react';

import Api from '../utils/Api.jsx';
import Page from '../components/Page.jsx';

export default class BanList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        };
    }

    componentDidMount() {
        Api.json().all('banInfo').get({include: 'player'})
            .then(this.setData.bind(this)).catch(error => console.error(error));
    }

    setData(data) {
        if (data == null) {
            console.log('Api not available');
        }
        this.setState({ list: data });
    }

    getPlayerName(banData) {
        return banData.player ? banData.player.login : 'UNKNOWN PLAYER';
    }

    renderList() {
        return <ul>
                {this.state.list.map((ban) =>
                    <li key={ban.id}>
                        {this.getPlayerName(ban)} - {ban.reason}
                    </li>
                )}
               </ul>;
    }

    render() {
        return (
            <Page title="Ban List">
                {!this.state.list && 
                    'Loading ...'
                }
                {this.state.list &&
                    this.renderList()
                }
            </Page>
        );
    }
}
