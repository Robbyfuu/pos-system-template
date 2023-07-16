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
      headers: { authorization: token ? `Bearer ${token}` : "", 'x-apollo-operation-name': '2'  },
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
      const { data, fetching, error } = result;
      return { data , fetching, error };
    }
    catch(error){
      console.log({error})
    }
}

export function useMutations(
  mutation: TypedDocumentNode<any, AnyVariables>,
  variables?: any
) {
  const [result, executeMutation] = useMutation(mutation);

  const handleMutation = async () => {
    const response = await executeMutation(variables);
    // Realiza cualquier lógica adicional necesaria con la respuesta

    return response;
  };

  return { result, handleMutation };
}
