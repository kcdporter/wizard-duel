import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}


export default Login;