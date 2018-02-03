// @flow

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

// default link, URI only
const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

// $FlowFixMe
const TOKEN: string = process.env.REACT_APP_GITHUB_TOKEN;

// auth link, responsible for passing auth token
const authLink = setContext(() => ({
  headers: { authorization: `Bearer ${TOKEN}` }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === "development"
});

export default client;
