import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { functor } from 'fp-ts'
import { DocumentNode } from 'graphql'

interface Props {
  query: DocumentNode
}

export const Search: React.FC<Props> = ({ query }) => {
  const { loading, error, data } = useQuery<DocumentNode>(query)

  console.log('functor', functor)
  console.log('data', data)

  return loading ? <p>'search results loading'</p> : <pre>{JSON.stringify(data, null, 2)}</pre>
}
