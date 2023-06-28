 //@ts-ignore
import { useEffect } from "react";

import {
  Client,
  cacheExchange,
  fetchExchange,
  useQuery,
  useMutation,
  TypedDocumentNode,
  AnyVariables,
} from "urql";

export const client = new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const obj = JSON.parse(localStorage.getItem("authUser") as string);
    const token = obj.accessToken;
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export function useQuerys(query: TypedDocumentNode<any, AnyVariables>, variables?: any) {
    try{
       //@ts-ignore
        const [result, reexecuteQuery] = useQuery({
        query,
        variables,
        requestPolicy: 'cache-and-network',
      });
    //   console.log('llegue')
    
    //   useEffect(() => {
    //     if (result.fetching) return;
    
    //     // Set up to refetch in one second, if the query is idle
    //     const timerId = setTimeout(() => {
    //       reexecuteQuery({ requestPolicy: 'network-only' });
    //     }, 1000);
    
    //     return () => clearTimeout(timerId);
    //   }, [result.fetching, reexecuteQuery]);
    //   console.log({result})
      const { data, fetching, error } = result;
      return { data, fetching, error };
    }
    catch(error){
      console.log({error})
    }
}

export async function useMutations(
  mutation: string,
  variables: Record<string, unknown>
) {
   //@ts-ignore
  const [updateTodoResult, updateTodo] = useMutation(mutation);

  const result = await updateTodo(variables)

  return result;
}
