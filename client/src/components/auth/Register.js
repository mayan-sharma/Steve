import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import styles from "./login.module.css";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
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

    if (!this.state.name || !this.state.email || !this.state.password) {
      this.setState({ error: "Fill in all fields!" });
    }

    if (!this.state.error.length) {
      console.log(this.state.error);
      this.props.registerUser(this.state);
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <form onSubmit={this.handleSubmit} className={styles.container}>
        <h1>REGISTER</h1>
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          placeholder="Name"
        />
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
          value="REGISTER"
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

export default connect(mapStateToProps, { registerUser })(Register);
