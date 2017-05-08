import React from 'react';
import ReactTable from 'react-table';

import Api from '../utils/Api.jsx';
import Page from '../components/Page.jsx';
import SelectPlayer from '../components/SelectPlayer.jsx';
import Utils from '../utils/Utils.jsx';

export default class BanList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        };
        this.columns = [{
            header: '#',
            accessor: 'id',
            width: 60
        }, {
            id: 'player',
            header: 'Player',
            accessor: banData => banData.player ? banData.player.login : 'UNKNOWN PLAYER',
            width: 130
        }, {
            header: 'Reason',
            accessor: 'reason'
        }, {
            header: 'ExpiresAt',
            id: 'expiresAt',
            accessor: banData => Utils.formatTimestamp(banData.expiresAt),
            width: 160
        }, {
            header: 'Actions',
            accessor: 'action',
            render: props => <button alt={props.row.id}>Revoke</button>,
            width: 85,
            hideFilter: true
        }];
    }

    componentDidMount() {
        Api.json().all('banInfo').get({ include: 'player' })
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

    filter(filter, row) {
        const id = filter.pivotId || filter.id;
        const filterValue = filter.value.toLowerCase();
        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filterValue) : true;
    }

    render() {
        return (
            <Page title="Bans">
                <div>
                    <h2>Create Ban</h2>
                    <SelectPlayer/>
                </div>
                {!this.state.list &&
                    'Loading ...'
                }
                <div>
                    <h2>Ban List</h2>
                {this.state.list &&
                    <ReactTable
                        showFilters={true}
                        defaultFilterMethod={this.filter}
                        data={this.state.list}
                        columns={this.columns}
                    />
                }
                </div>
            </Page>
        );
    }
}
