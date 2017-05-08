import React from 'react';
import ReactTable from 'react-table';

import Api from '../utils/Api.jsx';
import Page from '../components/Page.jsx';

export default class AvatarList extends React.Component {
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
            id: 'img',
            header: 'Img',
            accessor: 'url',
            render: props => <img src={props.row.url} alt={props.row.url} />,
            width: 50,
            hideFilter: true
        }, {
            header: 'Tooltip',
            accessor: 'tooltip'
        }, {
            header: 'Url',
            accessor: 'url'
        }];
    }

    componentDidMount() {
        Api.json().all('avatar').get()
            .then(this.setData.bind(this)).catch(error => console.error(error));
    }

    setData(data) {
        if (data == null) {
            console.log('Api not available');
        }
        this.setState({ list: data });
    }

    filter(filter, row) {
        const id = filter.pivotId || filter.id;
        const filterValue = filter.value.toLowerCase();
        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filterValue) : true;
    }

    render() {
        return (
            <Page title="Avatar List">
                {!this.state.list &&
                    'Loading ...'
                }
                {this.state.list &&
                    <ReactTable
                        showFilters={true}
                        defaultFilterMethod={this.filter}
                        data={this.state.list}
                        columns={this.columns}
                    />
                }
            </Page>
        );
    }
}
