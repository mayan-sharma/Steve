import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";
import styles from "./login.module.css";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({ error: "" });
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ error: "" });

    if (!this.state.email || !this.state.password) {
      this.setState({ error: "Fill in all fields!" });
    }

    if (!this.state.error.length) {
      this.props.loginUser(this.state);
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <form onSubmit={this.handleSubmit} className={styles.container}>
        <h1>LOGIN</h1>
        <input
          type="text"
          name="email"
          onChange={this.handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          onChange={this.handleChange}
          placeholder="Password"
        />
        <input
          type="submit"
          className={styles.submit}
          value="LOGIN"
          disabled={this.props.isLoading}
        />
        {this.state.error.length > 0 && (
          <p className={styles.error}>{this.state.error}</p>
        )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
