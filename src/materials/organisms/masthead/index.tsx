import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import BlogTitle from "../../atoms/blog-title";
import LoginForm from "../../molecules/login-form";
import User from "../../../models/interfaces/user";
import { logoutUser } from "../../../helpers/api";

import "./style.css";
import "./style.scss";

interface MastheadProps {
  user?: User;
  onLoginSuccess: (user: User) => void;
  onLogoutSuccess: () => void;
}

interface MastheadState {
  loginFormIsOpen: boolean;
}

export default class Masthead extends Component<MastheadProps, MastheadState> {
  constructor(props: MastheadProps) {
    super(props);

    this.state = { loginFormIsOpen: false };

    this.openLoginForm = this.openLoginForm.bind(this);
    this.closeLoginForm = this.closeLoginForm.bind(this);
  }

  openLoginForm() {
    this.setState({ loginFormIsOpen: true });
  }

  closeLoginForm() {
    this.setState({ loginFormIsOpen: false });
  }

  render() {
    const { user } = this.props;

    let userInfoElement;
    if (user !== undefined) {
      userInfoElement = (
        <div className="user-info">
          <div className="dropdown">
            <a
              href="#"
              id="dropdownMenuLink"
              className="btn btn-secondary dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user.username}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right pull-right"
              aria-labelledby="dropdownMenuLink"
            >
              <a
                href="#"
                className="dropdown-item"
                onClick={() => {
                  logoutUser();
                  this.props.onLogoutSuccess();
                }}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      userInfoElement = (
        <div className="user-info">
          <a className="btn btn-secondary" onClick={this.openLoginForm}>
            Sign in
          </a>
        </div>
      );
    }

    return (
      <>
        <div className="site-header">
          <header>
            {userInfoElement}
            <BlogTitle />
            <LoginForm
              isOpen={this.state.loginFormIsOpen}
              onClose={this.closeLoginForm}
              onLoginSuccess={this.props.onLoginSuccess}
            />
          </header>
        </div>
      </>
    );
  }
}
