import React, { Component } from 'react';
import './styles/login.css'
// import Setup from './Setup.js';
import { Redirect } from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: ''
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.newUser(this.state.user)
        // this.props.loadDb();
    }
    render() {
        return (
        this.props.state.currentUser ? (<Redirect to="/setup"/>) :
            <div>
                <form className='loginForm' onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={(event) => this.setState({user: event.target.value})} />
                    </label>
                    <input type="submit" value="Alohomora" placeholder='Your name'/>
                </form>
            </div>
        );
    }
}


export default Login;