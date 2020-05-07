import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ApolloError } from 'apollo-client'
import { DocumentNode } from 'graphql'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { ReadonlyRecord } from 'fp-ts/lib/ReadonlyRecord'

interface Props {
  query: DocumentNode
}

type FetchData<Err, Data> = O.Option<E.Either<Err, Data>>

// TODO: Define data type!
type GithubData = ReadonlyRecord<string, any>

type QueryState = FetchData<ApolloError, GithubData>

const onError = (err: ApolloError) => <p>Error: {err.message}</p>
const onLoading = () => <p>search results loading</p>
const onSuccess = (data: GithubData) => <pre>{JSON.stringify(data, null, 2)}</pre>

export const Search: React.FC<Props> = ({ query }) => {
  const [queryState, setQueryState] = useState<QueryState>(O.none)
  const handlers = {
    onCompleted: (data: GithubData) => setQueryState(O.some(E.right(data))),
    onError: (e: ApolloError) => setQueryState(O.some(E.left(e))),
  }

  useQuery<DocumentNode>(query, { ...handlers })

  return (
    <div>
      Search results:
      {pipe(queryState, O.fold(onLoading, E.fold(onError, onSuccess)))}
    </div>
  )
}
