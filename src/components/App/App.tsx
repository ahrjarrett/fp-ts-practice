import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import { Search } from 'src/components/Search'
import { createClient } from 'src/graphql'
import { query } from 'src/constants'


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
