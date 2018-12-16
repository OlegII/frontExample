/*import React from "react";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { getAllUserData } from "../store/userDate/userData.selector";
import { allUserQuery } from "../query/allUsers";
import { addAllUser } from "../store/userDate/userData.action";
import { TextHide } from "../firstPage/FirsPageTrial";

class Query extends React.PureComponent {
  static mapStateToProps = state => ({
    allUserData: getAllUserData(state)
  });

  componentDidMount() {
    this.props.client
      .query({
        query: allUserQuery,
        variables: {
          count: 10
        }
      })
      .then(data => {
        this.props.dispatch(addAllUser(data));
      });
  }

  render() {
    return (
      <div>
        <TextHide />
        {JSON.stringify(this.props.allUserData)}

      </div>
    );
  }
}

export default withApollo(connect(Query.mapStateToProps)(Query));*/
// /------------------------------------------------------------------------------------------------------------------/

import React from "react";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { getAllUserData } from "../store/userDate/userData.selector";
import { allUserQuery } from "../query/allUsers";
import { addAllUser } from "../store/userDate/userData.action";
import { MenuHide } from "../firstPage/FirsPageTrial";
import {renderField} from "./renderfield";

import {Field} from "redux-form";

class Query extends React.PureComponent {
  static mapStateToProps = state => ({
    allUserData: getAllUserData(state),

  });

  componentDidMount() {
    this.props.client
      .query({
        query: allUserQuery,
        variables: {
          count: 1
        }
      })
      .then(data => {
        this.props.dispatch(addAllUser(data));
      });
  }


  render() {
    return (
      <div>
        <MenuHide />
        {JSON.stringify(this.props.allUserData)};
        <p>
          {this.props.allUserData && this.props.allUserData.data.allUsers[0].id}
        </p>
        <p>
          {this.props.allUserData &&
            this.props.allUserData.data.allUsers[0].firstName}
        </p>
          <form>
          <Field name="firstName" component={renderField} type="text" placeholder="First Name"/>
          </form>

      </div>
    );
  }
}

export default withApollo(connect(Query.mapStateToProps)(Query));
