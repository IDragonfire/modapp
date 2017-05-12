import React from 'react';

import Api from '../utils/Api.jsx';
import Utils from '../utils/Utils.jsx';
import Page from '../components/Page.jsx';

export default class CreateBan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expire: null
        };
        this.expireIn = this.expireIn.bind(this);
    }

    componentDidMount() {
        Api.json().all('banInfo').get()
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

    expireIn(days) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        this.setState({ expire: result });
    }

    render() {
        return (
            <Page title="Create Ban">
                {!this.state.list &&
                    'Loading ...'
                }
                {this.state.list &&
                    <div>
                        <div>Here you can ban a player</div>
                        <h2>Duration</h2>
                        <div>
                            <label>
                                <input type="radio" name="duration" value="permanent" /> Permanent
                        </label>
                            <label>
                                <input type="radio" name="duration" value="expire" checked={true} /> Expire
                        </label>
                            <p>Expire: {(this.state.expire ? Utils.formatTimestamp(this.state.expire) : 'never')}</p>
                            <div>
                                <button onClick={() => this.expireIn(1)}>24 h</button>
                                <button onClick={() => this.expireIn(2)}>48 h</button>
                                <button onClick={() => this.expireIn(7)}>1 week</button>
                                <button onClick={() => this.expireIn(14)}>2 week</button>
                                <button onClick={() => this.expireIn(30)}>1 month</button>
                            </div>
                        </div>
                        <h2>Level</h2>
                        <select name="level">
                            <option>Chat</option>
                            <option>Global</option>
                        </select>
                        <h2>Reason</h2>
                        <textarea rows="4" cols="50"></textarea>
                        <h2>Author</h2>
                        <p>You</p>
                    </div>
                }
            </Page>
        );
    }
}
