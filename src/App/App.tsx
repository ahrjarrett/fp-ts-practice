import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Search } from '../Search'
import { createClient } from '../client'

const query = gql`
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

export const App: React.FC<{}> = () => {
  const [client, setClient] = useState<any>(null)

  // Our implementation persists the Apollo cache to localStorage to prevent calling the GitHub API too often.
  // Because where the client serves data from depends on whether we have data in localStorage, createClient
  // returns a Promise that resolves as soon as the store has finished persisting.
  useEffect(() => {
    createClient().then(client => setClient(client))
  }, [])

  return client === null ? (
    <div>loading...</div>
  ) : (
      <ApolloProvider client={client}>
        <Search query={query} />
      </ApolloProvider>
    )
}
