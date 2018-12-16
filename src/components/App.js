import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store } from "../store/index";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import SignUpForm from "./SignUpForm";
import AllUserData from "./AllUserData";
import SignIn from "./SignIn";
import { MenuHide } from "../firstPage/FirsPageTrial";
import EditForm from "./EditForm";

const httpLink = createHttpLink({
  uri: "https://fakerql.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path="/" component={MenuHide} />
              <Route exact path="/signupform" component={SignUpForm} />
              <Route exact path="/alluserdata" component={AllUserData} />
              <div className="SignIn">
                <Route exact path="/signin" component={SignIn} />
              </div>
                <Route exact path="/editform" component={EditForm}/>
            </div>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}
