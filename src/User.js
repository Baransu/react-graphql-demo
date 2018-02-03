// @flow

import React, { Component } from "react";
import type { ChildProps } from "react-apollo";

import { withRepo } from "./queries/repo";
import type { Response, Variables } from "./queries/repo";

class User extends Component<ChildProps<Variables, Response>, {}> {
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    const { login, name, data } = this.props;
    const { repositoryOwner: { repository: repo } } = data;

    return (
      <div>
        <h2>
          {login}/{name}
        </h2>
        <div>stargazers: {repo.stargazers.totalCount}</div>
        <div>watchers: {repo.watchers.totalCount}</div>
      </div>
    );
  }
}

export default withRepo(User);
