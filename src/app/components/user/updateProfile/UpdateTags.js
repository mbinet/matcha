import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Request from "superagent";
import RaisedButton from 'material-ui/RaisedButton';
import cookie from 'react-cookie';

/**
 * Adding tags to a User and to the tag pool
 */
export default class AutoCompleteExampleDataSource extends Component {

    state = {
        searchText: '',
        tags: [],
        searchTags: [
          ]
    };

    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/tags/getAll";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
            this.setState({
                searchTags: response.body.tags,
                tags: []
            });
        });
    }

    handleUpdateInput = (searchText) => {
        this.setState({
            searchText: searchText,
        });
    };

    handleNewRequest = (chosenRequest) => {
        this.state.tags.push(chosenRequest);
        this.props.func();
        this.setState({
            searchText: '',
        });
    };
    
    submitForm(callback) {
        var url = "http://54.93.182.167:3000/api/tags";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token: cookie.load('token') })
            .send({ user: cookie.load('user') })
            .send({ tags: this.state.tags })
            .end(function (err, res) {
                if(err) { console.log('There was an unexpected error.') }
                else {
                    var response = 'ok'
                    callback(response)
                }
            });
    }

    render() {
        return (
            <AutoComplete
                hintText="#Geek"
                floatingLabelText="Tags"
                searchText={this.state.searchText}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                dataSource={this.state.searchTags}
                dataSourceConfig={{text: 'textKey', value: 'valueKey'}}
                //filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true}
            />
        );
    }
}