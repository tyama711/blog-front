import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BlogTitle from '../atoms/blog-title'
import LoginForm from '../molecules/login-form'
import User from '../../models/interfaces/user'
import { logoutUser } from '../../helpers/api'

interface MastheadProps {
  user?: User
  onLoginSuccess: (user: User) => void
  onLogoutSuccess: () => void
}

interface MastheadState {
  loginFormIsOpen: boolean
}

export default class Masthead extends Component<MastheadProps, MastheadState> {
  constructor(props: MastheadProps) {
    super(props)

    this.state = { loginFormIsOpen: false }
  }

  openLoginForm = () => {
    this.setState({ loginFormIsOpen: true })
  }

  closeLoginForm = () => {
    this.setState({ loginFormIsOpen: false })
  }

  render() {
    const { user, onLoginSuccess, onLogoutSuccess } = this.props
    const { loginFormIsOpen } = this.state

    let userInfoElement
    if (user !== undefined) {
      userInfoElement = (
        <div className="user-info">
          <div className="dropdown">
            <button
              type="button"
              id="dropdownMenuLink"
              className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user.username}
            </button>
            <div
              className="dropdown-menu dropdown-menu-right pull-right"
              aria-labelledby="dropdownMenuLink"
            >
              <Link to="/article/new" className="dropdown-item">
                New Article
              </Link>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  logoutUser()
                  onLogoutSuccess()
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      userInfoElement = (
        <div className="user-info">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.openLoginForm}
          >
            Sign in
          </button>
        </div>
      )
    }

    return (
      <div className="masthead">
        <header>
          {userInfoElement}
          <BlogTitle />
          <LoginForm
            isOpen={loginFormIsOpen}
            onClose={this.closeLoginForm}
            onLoginSuccess={onLoginSuccess}
          />
        </header>
      </div>
    )
  }
}
