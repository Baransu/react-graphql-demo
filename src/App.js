// @flow

import React from "react";
import { ApolloProvider } from "react-apollo";

import client from "./client";

import User from "./User";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <User login="wende" name="elchemy" />
    </ApolloProvider>
  );
};

export default App;
