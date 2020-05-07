import gql from 'graphql-tag'

export { createClient } from './client'

export const query = gql`
  query RepositoryWithIssues(
    $repo: String = "rails"
    $owner: String = "rails"
  ) {
    repository(owner: $owner, name: $repo) {
      id
      name
      description
      owner {
        id
        login
        avatarUrl
      }
      issues(last: 100, states: OPEN) {
        edges {
          node {
            id
            createdAt
            updatedAt
            title
            url
            comments {
              totalCount
            }
            participants(first: 1) {
              edges {
                node {
                  id
                  avatarUrl
                }
              }
            }
            labels(first: 5) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`
