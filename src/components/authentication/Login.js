import React, { Component } from 'react'
import { connect } from "react-redux"
import { addToast, 
    fetchToken, 
    fetchOwnedPlaylists, 
    fetchJoinedPlaylists, 
    fetchInvites, } from "../../actions"

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            formErrors: {
                emptyField: true
            }
        }
    }

    loadApplication = () => {
        this.props.fetchOwnedPlaylists(this.props.auth.username)
        this.props.fetchJoinedPlaylists(this.props.auth.username)
        this.props.fetchInvites(this.props.auth.id)
    }

    handleChange = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value }, () => {
            this.validateField(name, value)
        })
    }

    handleSubmit = event => {
        if (this.state.formErrors.emptyField) {
            this.props.addToast('Username and password cannot be empty')
            event.preventDefault()
            return
        }

        const credentials = {
            username: this.state.username,
            password: this.state.password
        }

        // Sends a login request and then
        // checks for any errors and informs the user of them
        // using snackbars
        this.props.fetchToken(credentials).then(() => {
            if (this.props.status === 500)
                this.props.addToast("Request failed. Please try again")
            // Added 
            else if (this.props.status === 200)
                this.loadApplication()
            else
                this.props.addToast("Invalid credentials")
        })

        this.resetPage()
        event.preventDefault() // Prevents page from reloading on submit
    };

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors

        fieldValidationErrors.emptyField =
            this.state.username === "" || this.state.password === ""

        this.setState({
            formErrors: fieldValidationErrors
        })
    }

    resetPage = () => {
        this.setState({
            username: "",
            password: ""
        })
    }

    render() {
        return (
            <div className="auth-form">
                <h4>Login</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form">
                        <div className="labels">
                            <label>Username:</label>
                            <label>Password:</label>
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <button className="submit" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    token: state.auth.token,
    status: state.auth.status
})

const mapDispatchToProps = dispatch => ({
    addToast: (text, action) => dispatch(addToast(text, action)),
    fetchToken: credentials => dispatch(fetchToken(credentials)),
    fetchOwnedPlaylists: username => dispatch(fetchOwnedPlaylists(username)),
    fetchJoinedPlaylists: username => dispatch(fetchJoinedPlaylists(username)),
    fetchInvites: id => dispatch(fetchInvites(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)