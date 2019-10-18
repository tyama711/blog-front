import React, { Component } from "react";
import { Link } from "react-router-dom";
import BlogTitle from "../../atoms/blog-title";
import LoginForm from "../../molecules/login-form";
import User from "../../../models/interfaces/user";
import { logoutUser } from "../../../helpers/api";

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
    const { user, onLoginSuccess, onLogoutSuccess } = this.props;
    const { loginFormIsOpen } = this.state;

    let userInfoElement;
    if (user !== undefined) {
      userInfoElement = (
        <div className="user-info">
          <div className="dropdown">
            <a
              href="#"
              id="dropdownMenuLink"
              className="btn btn-primary dropdown-toggle"
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
              <Link to="/article/new" className="dropdown-item">
                New Article
              </Link>
              <a
                href="#"
                className="dropdown-item"
                onClick={() => {
                  logoutUser();
                  onLogoutSuccess();
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
          <a
            href="#"
            className="btn btn-secondary"
            onClick={this.openLoginForm}
          >
            Sign in
          </a>
        </div>
      );
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
    );
  }
}
