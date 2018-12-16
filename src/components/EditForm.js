import { Field, formValueSelector } from "redux-form";
import React from "react";
import { getUserData } from "../store/userDate/userData.selector";
import { addUserData } from "../store/userDate/userData.action";
import Form from "./Form";
import { renderField } from "./renderfield";
import { validate } from "../utilities/validate";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { allUserQuery } from "../query/allUsers";

import { updateUserMutate } from "../mutation/update";
import { MenuHide } from "../firstPage/FirsPageTrial";
const formName = "EditForm";
const selector = formValueSelector(formName);

class EditForm extends React.PureComponent {
  static mapStateToProps = state => ({
    formValues: selector(state, "firstName", "lastName", "email", "avatar"),
    addUserData: getUserData(state)
  });

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.client.mutate({
      mutation: updateUserMutate,
      variables: {
        ...values
      }
    });
  }
  componentDidMount() {
    this.props.client
      .query({
        query: allUserQuery,
        variables: {
          count: 1
        }
      })
      .then(data => {
        this.props.dispatch(addUserData(data));
      });
  }

  render() {
    if (!this.props.addUserData.data) {
      return "loading...";
    }
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          form={formName}
          initialValues={this.props.addUserData.data.allUsers[0]}
          enableReinitialize
          validate={validate}
        >
          <MenuHide />
          <img
            name="avatar"
            src={this.props.addUserData.data.allUsers[0].avatar}
            alt=""
          />
          <Field
            name="firstName"
            component={renderField}
            type="text"
            label="Имя"
          />

          <Field
            name="lastName"
            component={renderField}
            type="text"
            label="Фамилия"
          />
          <Field
            name="email"
            component={renderField}
            type="text"
            label="Электронная почта"
          />

          <button type="submit">Отправить</button>
        </Form>
      </div>
    );
  }
}
export default withApollo(connect(EditForm.mapStateToProps)(EditForm));
