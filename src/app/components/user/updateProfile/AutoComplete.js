import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Request from "superagent";
import RaisedButton from 'material-ui/RaisedButton';

const colorslol = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Black',
    'White',
];

const colors = [
    {textKey: 'Some Text', valueKey: 'someFirstValue'},
    {textKey: 'Some Text', valueKey: 'someSecondValue'},
];


export default class AutoCompleteExampleDataSource extends Component {
    state = {
        searchText: '',
        tags: [],
        searchTags: [
        ]
    };

    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/tags/";
        Request.get(url).then((response) => {
            this.setState({
                searchTags: response.body.tags
            });
            console.log('response', response.body.tags)
            console.log('state de searchTags : ', this.state.searchTags)
        });
    }

    handleUpdateInput = (searchText) => {
        this.setState({
            searchText: searchText,
        });
    };

    handleNewRequest = (chosenRequest) => {
        this.state.tags.push(chosenRequest);
        console.log(this.state.tags);
        this.setState({
            searchText: '',
        });
    };
    
    submitForm() {
        var url = "http://54.93.182.167:3000/api/tags";
        Request.post(url)
            .set('Content-Type', 'application/json')
            .send({ tags: this.state.tags })
            .end(function (err, res) {
                if(err) { console.log('There was an unexpected error.') }
                else {
                    console.log('rate lol');
                }
            }, this)
        // console.log(this.state.tags);
        console.log("submiiiiiit");
    }

    render() {
        return (
            <div>
                <AutoComplete
                    hintText="Type 'r', case insensitive"
                    searchText={this.state.searchText}
                    onUpdateInput={this.handleUpdateInput}
                    onNewRequest={this.handleNewRequest}
                    dataSource={this.state.searchTags}
                    dataSourceConfig={{text: 'textKey', value: 'valueKey'}}
                    //filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                    filter={AutoComplete.fuzzyFilter}
                    openOnFocus={true}
                />
                <RaisedButton
                    label="Cancel"
                    onTouchTap={() => this.submitForm()} // gets data from server again
                />
            </div>
        );
    }
}