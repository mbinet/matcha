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
        console.warn('Mous sommes bien dans le component will mount')
    }

    handleUpdateInput = (searchText) => {
        this.setState({
            searchText: searchText,
        });
    };

    handleNewRequest = (chosenRequest) => {
        this.state.tags.push(chosenRequest);
        this.props.func();
        console.log(this.state.tags);
        this.setState({
            searchText: '',
        });
    };
    
    submitForm(callback) {
        var url = "http://54.93.182.167:3000/api/tags";
        Request.post(url)
            .set('Content-Type', 'application/json')
            .send({ tags: this.state.tags })
            .end(function (err, res) {
                if(err) { console.log('There was an unexpected error.') }
                else {
                    console.log('C\'est dans la boite ;)')
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