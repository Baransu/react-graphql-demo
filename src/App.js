// @flow

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import type { OperationComponent, QueryProps, ChildProps } from 'react-apollo';

import logo from './logo.svg';
import './App.css';

const REPOSITORY_INFO_QUERY = gql`
  query GetRepositoryInfo($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
      }
    }
  }
`;

type Repository = {
  stargazers: {
    totalCount: number
  },
  watchers: {
    totalCount: number
  }
};

type RepositoryOwner = {
  repository: Repository
};

type Response = {
  repositoryOwner: RepositoryOwner
};

type Props = Response & QueryProps;
type InputProps = { login: string, name: string };

const withInfo: OperationComponent<
  Response,
  InputProps,
  Props
> = graphql(REPOSITORY_INFO_QUERY, {
  options: ({ login, name }) => ({
    variables: {
      login: login || 'facebook',
      name: name || 'react'
    }
  }),

  props: ({ data }) => ({ ...data })
});

type State = {
  loading: boolean,
  login: string,
  name: string,
  stargazers: number,
  watchers: number
};

class App extends Component<ChildProps<InputProps, Response>, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      login: '',
      name: '',
      stargazers: 0,
      watchers: 0
    };
  }

  componentWillReceiveProps(props) {
    const {
      loading,
      variables: { login, name },
      repositoryOwner: { repository: repo }
    } = props;

    this.setState({
      loading,
      login,
      name,
      stargazers: repo.stargazers.totalCount,
      watchers: repo.watchers.totalCount
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2>
              {this.state.login}/{this.state.name}
            </h2>
            <div>stargazers: {this.state.stargazers}</div>
            <div>watchers: {this.state.watchers}</div>
          </div>
        )}
      </div>
    );
  }
}

export default withInfo(App);
