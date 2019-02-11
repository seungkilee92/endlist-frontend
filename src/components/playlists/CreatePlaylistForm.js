import React, { Component } from 'react'
import { connect } from "react-redux"
import { addToast, createPlaylist } from "../../actions"

import '../../assets/css/CreatePlaylist.css'

class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            icon: "",
            is_private: false,
            toDashboard: false,
            formErrors: {
                title: false,
                icon: false,
                emptyField: true
            }
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
        if (
            this.state.formErrors.emptyField ||
            this.state.formErrors.title
        ) {
            if (this.state.formErrors.emptyField)
                this.props.addToast("Title required")
            else if (this.state.formErrors.title)
                this.props.addToast("A Playlist must have a title")
            else
                this.props.addToast("Invalid Title")

            event.preventDefault()
            return
        }

        const playlist = {
            title: this.state.title,
            icon: this.state.icon,
            is_private: this.state.is_private
        }

        this.props.createPlaylist(playlist).then( () => {
            if (this.props.status === 401)
                this.props.addToast("Playlist cannot be created")
            else
                this.props.toggle()
        })

        this.resetPage()
        this.setRedirect()
        event.preventDefault()
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors
    
        fieldValidationErrors.emptyField =
            this.state.title === ""
    
        this.setState({
            formErrors: fieldValidationErrors
        })
    }
    
    resetPage = () => {
        this.setState({
            title: "",
            icon: "",
            is_private: false,
            formErrors: {
                title: false,
                icon: false,
                emptyField: true
            }
        })    
    }
    
    render() {
        return (
            <div className="create-playlist-form">
                <div className="close"><h1 className="close-button" onClick={this.props.toggle}>X</h1></div>
                <div className="branding-lg">
                    <h3>
                        Create a New Playlist
                    </h3>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form">
                        <div className="labels">
                            <label>Title: </label>
                            <label>Icon Link: </label>
                            <label>Private Playlist?</label>
                        </div>
                        <div className="input">
                            <input
                                type = "text"
                                name = "title"
                                value = {this.state.title}
                                onChange = {this.handleChange}
                            />
                            <input
                                type = "text"
                                name = "icon"
                                value = {this.state.icon}
                                onChange = {this.handleChange}
                            />
                            <select
                                value = {this.state.is_private}
                                onChange = {this.handleChange}
                            >
                                <option value= "Public">Public</option>
                                <option value = "Private">Private</option>
                            </select>
                        </div>
                    </div>
                    <button className="submit" type="submit">Submit</button>
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
    createPlaylist: playlist => dispatch(createPlaylist(playlist))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist)