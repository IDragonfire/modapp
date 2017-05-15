import React from 'react';
import ReactTable from 'react-table';

import Api from '../utils/Api.jsx';
import Page from '../components/Page.jsx';

export default class PlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: null,
            loading: true
        };
        this.columns = [{
            header: '#',
            accessor: 'id',
            width: 60
        }, {
            header: 'Login',
            accessor: 'login'
        }];
        this.fetchData = this.fetchData.bind(this);
        this.sortString = this.sortString.bind(this);
    }

    filter(filter, row) {
        const id = filter.pivotId || filter.id;
        const filterValue = filter.value.toLowerCase();
        return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filterValue) : true;
    }

    fetchData(tableState) {
        //console.log(state, instance);
        console.log(tableState);
        this.setState({ loading: true });
        Api.json().findAll('player',
            {
                page:
                {
                    size: tableState.pageSize,
                    number: tableState.page + 1,
                    totals: true
                },
                sort: this.sortString(tableState.sorting)
            })
            .then(data => {
                this.setState({ data, loading: false, pages: data.meta.page.totalPages });
            }).catch(error => console.error(error));
    }

    sortString(sortFields) {
        if (sortFields.length == 0) {
            return 'login';
        }
        console.log(sortFields);
        let sorting = '';
        sortFields.forEach((field, i) => {
            if(i > 0) {
                sorting += ',';
            }
            if (field.desc) {
                sorting += '-';
            }
            sorting += field.id;
        });
        console.log('sort=' + sorting);
        return sorting;
    }

    render() {
        return (
            <Page title="Player List">
                <ReactTable
                    //showFilters={true}
                    //defaultFilterMethod={this.filter}
                    columns={this.columns}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    defaultPageSize={10}
                    filterable
                    data={this.state.data} // Set the rows to be displayed
                    pages={this.state.pages} // Display the total number of pages
                    loading={this.state.loading} // Display the loading overlay when we need it
                    onChange={this.fetchData} // Request new data when things change
                />
            </Page>
        );
    }
}
