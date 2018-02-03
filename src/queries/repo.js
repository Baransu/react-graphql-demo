// @flow

import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import gql from "graphql-tag";

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

export type Response = {
  repositoryOwner: {
    repository: {
      stargazers: {
        totalCount: number
      },
      watchers: {
        totalCount: number
      }
    }
  }
};

export type Variables = { login: string, name: string };

export const withRepo: OperationComponent<Response, Variables> = graphql(
  REPOSITORY_INFO_QUERY,
  {
    options: ({ login, name }) => ({ variables: { login, name } })
  }
);
