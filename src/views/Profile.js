import React, { Component } from 'react'
import { connect } from 'react-redux'

import Invites from '../components/Invites'

class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <Invites />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    username: state.auth.username
})

const mapDispatchToProps = dispatch => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
