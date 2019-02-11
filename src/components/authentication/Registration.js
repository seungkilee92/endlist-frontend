import React, { Component } from 'react'
import { connect } from "react-redux"
import { addToast, 
    createUser,
    fetchToken, 
    fetchOwnedPlaylists, 
    fetchJoinedPlaylists, 
    fetchInvites, } from "../../actions"

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            confirm: "",
            formErrors: {
                email: false,
                password: false,
                passLength: false,
                emptyField: true
            }
        }
    }

    loadApplication = async user => {
        // Checks for user in localstorage
        await this.props.fetchToken({ username: user.username, password: user.password })
        // If the token is invalid, get rid of it
        if (this.props.status === 401)
          this.props.deleteToken()
        else {
          this.props.fetchOwnedPlaylists(this.props.auth.username)
          this.props.fetchJoinedPlaylists(this.props.auth.username)
          this.props.fetchInvites(this.props.auth.id)
        }
    }

    handleChange = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value }, () => {
            this.validateField(name, value)
        })
    }

    handleSubmit = event => {
        // Checks all the conditions for a valid request
        // and sends snackbars if anything is wrong
        if (
            this.state.formErrors.emptyField ||
            this.state.formErrors.password ||
            this.state.formErrors.passLength ||
            this.state.formErrors.email
        ) {
            if (this.state.formErrors.emptyField)
                this.props.addToast("All fields must be filled out")
            else if (this.state.formErrors.password && this.state.formErrors.email)
                this.props.addToast("Passwords do not match and email is invalid")
            else if (this.state.formErrors.password)
                this.props.addToast("Passwords do not match")
            else if (this.state.formErrors.passLength)
                this.props.addToast("Password must be at least 6 characters")    
            else {
                this.props.addToast("Invalid email")
            }

            event.preventDefault()
            return
        }

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        // Sends the request to register a new user
        // Snackbars are created to inform the user if anything
        // went wrong, otherwise the user is then logged in
        this.props.createUser(user).then(() => {
            if (this.props.status === 401)
                this.props.addToast("Username or email already taken")
            else if (this.props.status === 500)
                this.props.addToast("Request failed. Please try again")
            else this.loadApplication(user)
        })

        this.resetPage()
        event.preventDefault() // Prevents page from reloading on submit
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors

        fieldValidationErrors.emptyField =
            this.state.username === "" ||
            this.state.password === "" ||
            this.state.confirm === "" ||
            this.state.email === ""

        switch (fieldName) {
            case "email":
                fieldValidationErrors.email = !value.match(
                    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                )
                break
            case "confirm" || "password":
                fieldValidationErrors.passLength =
                    this.state.password.length < 6
                fieldValidationErrors.password =
                    this.state.confirm !== this.state.password
                break
            default:
                break
        }

        this.setState({
            formErrors: fieldValidationErrors
        })
    }

    resetPage = () => {
        this.setState({
            username: "",
            password: "",
            email: "",
            confirm: "",
            formErrors: {
                email: false,
                password: false,
                emptyFieldLogin: true,
                emptyField: true
            }
        })
    }

    render() {
        return (
            <div className="auth-form">
                <h4>Register</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form">
                        <div className="labels">
                            <label>Username: </label>
                            <label>Password: </label>
                            <label>Confirm Password: </label>
                            <label>Email: </label>
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
                            <input
                                type="password"
                                name="confirm"
                                value={this.state.confirm}
                                onChange={this.handleChange}
                            />
                            <input
                                // Using "email" creates ugly form validation
                                type="text"
                                name="email"
                                value={this.state.email}
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
    status: state.auth.status
})

const mapDispatchToProps = dispatch => ({
    addToast: (text, action) => dispatch(addToast(text, action)),
    createUser: user => dispatch(createUser(user)),
    fetchToken: credentials => dispatch(fetchToken(credentials)),
    fetchOwnedPlaylists: username => dispatch(fetchOwnedPlaylists(username)),
    fetchJoinedPlaylists: username => dispatch(fetchJoinedPlaylists(username)),
    fetchInvites: id => dispatch(fetchInvites(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)