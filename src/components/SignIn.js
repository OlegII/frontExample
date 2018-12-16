import React from "react";
import { Field, formValueSelector } from "redux-form";
import { validate } from "../utilities/validate";
import { renderField } from "./renderfield";
import connect from "react-redux/es/connect/connect";
import Form from "./Form";
import { getAuthToken } from "../store/auth/auth.selector";
import { saveToken } from "../store/auth/auth.action";
import { getErrors } from "../store/error/errors.selector";
import { saveErrors } from "../store/error/error.action";
import { withApollo } from "react-apollo";
import { registerMutate } from "../mutation/register";
import { MenuHide } from "../firstPage/FirsPageTrial";

const selector = formValueSelector("SignIn");

class SignIn extends React.PureComponent {
  static mapStateToProps = state => ({
    email: selector(state, "email"),
    password: selector(state, "password"),
    fullName: `${selector(state, "firstname") || ""} ${selector(
      state,
      "secondname"
    ) || ""}`,
    token: getAuthToken(state),
    errors: getErrors(state)
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
        }
      })
      .catch(response => {
        this.props.dispatch(saveErrors({ errors: response.message }));
      });
  }

  render() {
    const { error, invalid } = this.props;
    return (
      <Form form="SignIn" onSubmit={this.handleSubmit} validate={validate}>
        <MenuHide />
        <Field
          name="email"
          className="emailField"
          type="text"
          component={renderField}
        />
        <Field name="password" type="text" component={renderField} />
        {error && <strong>{error}</strong>}
        <div>
          <button className="subBut" type="submit" disabled={invalid}>
            Sign In
          </button>
          {/*<button onClick={SignUpForm} type='sign up'>Sign Up</button>*/}
        </div>
      </Form>
    );
  }
}

export default withApollo(connect(SignIn.mapStateToProps)(SignIn));
