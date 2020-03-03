import React, {Component} from 'react';
import "./search-panel.css"

export default class SearchPanel extends Component{

    state ={
        term: ""
    }

    onSearchChange = (event)=>{
        const term = event.target.value;
        this.setState({ term });
        this.props.onSearchChange(term);
    };



    render() {
        return (
            <input type="text" placeholder="Search" className="form-control search-input"
                onChange = {this.onSearchChange}
                   value={this.state.term}/>
        )
    }
};
