/**
 * Created by nancyli on 12/8/17.
 */
import React, { Component } from 'react';
import axios from 'axios';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            endpoint: '',
            jobid: ''
        };
        this.handleEndpointChange = this.handleEndpointChange.bind(this);
        this.handleJobidChange = this.handleJobidChange.bind(this);
        this.handleEndpointSubmit = this.handleEndpointSubmit.bind(this);
        this.handleJobidSubmit = this.handleJobidSubmit.bind(this);
    }
    handleEndpointChange(e){
        this.setState({ endpoint: e.target.value });
    }
    handleJobidChange(e){
        this.setState({ jobid: e.target.value });
    }
    handleEndpointSubmit(e){
        e.preventDefault();
        axios.post(this.props.url + 'app/jobs', {
            url: this.state.endpoint
            })
            .then(res => {
                alert('job has been posted with id: ' + res.data);
            });
    }
    handleJobidSubmit(e){
        e.preventDefault();
        var queryString = this.props.url + 'app/status/' + this.state.jobid;
        axios.get(queryString, {})
            .then(res => {
                alert(res.data);
            });
    }
    render(){
        return(
        <div>
            <form onSubmit={this.handleEndpointSubmit}>
                <input
                    onChange= {this.handleEndpointChange}
                    value = {this.state.endpoint}
                    type = "text"
                    placeholder = "enter endpoint" />
                <input
                    type="submit"
                    value="submit"/>
            </form>
            <form onSubmit={this.handleJobidSubmit}>
                <input
                    onChange= {this.handleJobidChange}
                    value = {this.state.jobid}
                    type = "text"
                    placeholder = "enter job id" />
                <input
                    type="submit"
                    value="submit"/>
            </form>
        </div>
        )
    }
}

export default App;