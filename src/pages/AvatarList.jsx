import React from 'react';
import ReactTable from 'react-table';

import Api from '../utils/Api.jsx';
import Page from '../components/Page.jsx';

export default class AvatarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.columns = [{
            Header: '#',
            accessor: 'id',
            width: 60
        }, {
            id: 'img',
            Header: 'Img',
            accessor: 'url',
            Cell: props => <img src={props.row.url} alt={props.row.url} />,
            width: 50,
            hideFilter: true
        }, {
            Header: 'Tooltip',
            accessor: 'tooltip'
        }, {
            Header: 'Url',
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
                <ReactTable
                    showFilters={true}
                    defaultFilterMethod={this.filter}
                    data={this.state.list}
                    columns={this.columns}
                    loading={this.state.list.length == 0}
                />
            </Page>
        );
    }
}
