import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types'
import { setContext } from 'apollo-link-context'

import { GITHUB_TOKEN, GRAPHQL_SERVER_ENDPOINT } from 'src/constants/index'

export async function createClient() {
  const cache = new InMemoryCache()
  await persistCache({
    cache,
    storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
  })
  const http = new HttpLink({
    uri: GRAPHQL_SERVER_ENDPOINT,
  })
  const setAuthorizationLink = setContext((request, previousContext) => ({
    headers: { authorization: 'Bearer ' + GITHUB_TOKEN },
  }))
  const link = ApolloLink.from([setAuthorizationLink, http])

  // Add this line back if you decide to use Apollo for local state, for now stick
  // with React local state
  //cache.writeData({ data: { /* add any data you want initialized here */ } })

  const client = new ApolloClient({
    cache,
    link,
    connectToDevTools: true,
  })

  return client
}
