import React from 'react';

import Api from '../utils/Api.jsx';
import Page from '../components/Page.jsx';

export default class AvatarList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        };
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

    renderList() {
        return <ul>
                {this.state.list.map((avatar, i) =>
                    <li key={avatar.id}>
                        <img src={avatar.url}/>
                        {avatar.tooltip}
                    </li>
                )}
               </ul>;
    }

    render() {
        return (
            <Page title="Home">
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
