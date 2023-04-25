/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import APIService from '../apiService/apiService';
import APIContext from '../apiService/apiContext';
import { addItem } from '../services/mutateQueries';

export const useGenre = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getAll = () =>
    useQuery<any[], Error>(['genres'], API?.Genre.getAll, {
      onError: (error: any) => {
        console.warn(error.message);
      },
    });

  const create = () =>
    useMutation<any, Error, any>(API.Genre.create, {
      onSuccess: async (newGenre: any) => {
        addItem(queryClient, ['genres'], newGenre);
      },
      onError: (error: any) => {
        console.warn(error.message);
      },
    });

  return { getAll, create };
};
