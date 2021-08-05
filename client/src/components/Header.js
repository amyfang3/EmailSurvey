import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return; // don't want to show anything in right sideheader
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="3" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          {/* If user exists, redirect to Dashboard. Else, return home */}
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            EmailSurvey
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

// returns authReducer's auth portion of state (defined in reducers/index.js)
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
