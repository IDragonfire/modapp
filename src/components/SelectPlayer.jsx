import React from 'react';
import Autosuggest from 'react-autosuggest';

import Api from '../utils/Api.jsx';

export default class SelectPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            isLoading: false
        };
        this.loadSuggestions = this.loadSuggestions.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onChange = this.onChange.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
    }

    loadSuggestions(valueObject) {
        const value = valueObject.value;
        this.setState({
            isLoading: true
        });

        let pagesize = 50;
        // to decrease server load and get result faster
        if (value.length <= 3) {
            pagesize = 10;
        } else if (value.length <= 5) {
            pagesize = 20;
        }
        // TODO: tune this
        this.setState({ value, loading: true, disabled: true });
        Api.json().findAll('player', {
            filter: `lowerCaseLogin==${value}*`,
            page: { size: pagesize },
            sort: 'lowerCaseLogin'
        })
            .then(function (data) {
                console.log(data);
                this.setState({ isLoading: false, suggestions: data });
            }.bind(this)).catch(error => console.error(error));
    }

    onSuggestionsFetchRequested(value) {
        this.loadSuggestions(value);
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }

    onChange(event, data) {
        this.setState({ value: data.newValue });
    }

    renderSuggestion(suggestion) {
        return <span>{suggestion.login}</span>;
    }

    getSuggestionValue(suggestion) {
        this.setState({
            player: suggestion
        });
        return suggestion.login;
    }

    render() {
        return <div>
            <div>
                <p>
                    <strong>ID:</strong> {this.state.player && this.state.player.id}
                </p>
                <p>
                    <strong>Name:</strong> {this.state.player && this.state.player.login}
                </p>
            </div>
            <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={{
                    placeholder: 'Search Player',
                    value: this.state.value,
                    onChange: this.onChange
                }} />
        </div>;
    }
}
