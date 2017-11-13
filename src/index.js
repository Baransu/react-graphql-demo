// @flow

import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import './index.css';
import App from './App';

const { NODE_ENV, REACT_APP_GITHUB_TOKEN } = process.env;

// default link, URI only
const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' });

// auth link, responsible for passing auth token
const authLink = setContext(() => ({
  headers: {
    // $FlowFixMe
    authorization: `Bearer ${REACT_APP_GITHUB_TOKEN}`
  }
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: NODE_ENV === 'development'
});

render(
  <ApolloProvider client={client}>
    <App login="wende" name="elchemy" />
  </ApolloProvider>,
  // $FlowFixMe
  document.getElementById('root')
);
