import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteToken } from '../actions'

import '../assets/css/Header.css'
import { LogoLight } from '../assets/icons/brandIcons'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <Link to="/" className="home">
                    <LogoLight />
                </Link>
                <Link to="/user" className="profile">
                    {this.props.username}
                </Link>
                <button onClick={this.props.deleteToken}>Sign Out</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    username: state.auth.username
})

const mapDispatchToProps = dispatch => ({
    deleteToken: () => dispatch(deleteToken())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
