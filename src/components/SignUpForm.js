import React from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, hasSubmitSucceeded } from "redux-form";
import Form from "./Form";
import { validate } from "../utilities/validate";
import { renderField } from "./renderfield";
import { withApollo } from "react-apollo";
import { getAuthToken } from "../store/auth/auth.selector";
import { getErrors } from "../store/error/errors.selector";
import { registerMutate } from "../mutation/register";
import { saveToken } from "../store/auth/auth.action";
import { saveErrors } from "../store/error/error.action";
import { MenuHide } from "../firstPage/FirsPageTrial";

const selector = formValueSelector("SignUpForm");

class SignUpForm extends React.PureComponent {
  static mapStateToProps = state => ({
    email: selector(state, "email"),
    password: selector(state, "password"),
    fullName: `${selector(state, "firstName") || ""} ${selector(
      state,
      "lastName"
    ) || ""}`,
    token: getAuthToken(state),
    errors: getErrors(state),
    submitSucceeded: hasSubmitSucceeded("SignUpForm")(state)
    /*/*/
   });

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.client
      .mutate({
        mutation: registerMutate,
        variables: values
      })
      .then(response => {
        const data = response.data;
        if (data && !data.errors) {
          this.props.dispatch(
            saveToken({ token: data && data.register && data.register.token })
          );
          localStorage.setItem(
            "token",
            data && data.register && data.register.token
          );
          this.props.history.push("/SignIn");
        }
      })
      .catch(response => {
        this.props.dispatch(saveErrors({ errors: response.message }));
      });
  }
  //
  clickSub = () => {
    if (this.props.submitSucceeded) {
      alert("Submiting");
    }
  };
  render() {
    const { error, invalid } = this.props;

    return (
      <div className="redux-form">
        <Form
          form="SignUpForm"
          onSubmit={this.handleSubmit}
          validate={validate}
        >
          <MenuHide />

          {/*<div className="data">Ошибки: {JSON.stringify(this.props.errors)}</div>
                <div className="data">Токен из localStorage: {localStorage.getItem("token")}</div>
                <div className="data">Токен из store: {JSON.stringify(this.props.token)}</div>*/}
          <Field
            name="firstName"
            type="text"
            component={renderField}
            label="First Name"
            placeholder="First name"
          />
          <Field
            name="lastName"
            type="text"
            component={renderField}
            label="Last Name"
            placeholder="Last Name"
          />
          <Field
            name="email"
            type="text"
            component={renderField}
            label="Email"
            placeholder="mail"
          />
          <Field
            name="password"
            type="text"
            component={renderField}
            label="Password"
            placeholder="Password"
          />
          {error && <strong>{error}</strong>}
          <button type="submit" disabled={invalid} onClick={this.clickSub}>
            Sign Up
          </button>
        </Form>
      </div>
    );
  }
}

export default withApollo(connect(SignUpForm.mapStateToProps)(SignUpForm));
