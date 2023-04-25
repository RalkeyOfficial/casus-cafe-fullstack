/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import APIService from '../apiService/apiService';
import APIContext from '../apiService/apiContext';
import { addItem } from '../services/mutateQueries';

export const useBand = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getAll = () =>
    useQuery<any[], Error>(['bands'], API?.Band.getAll, {
      onError: (error: any) => {
        console.warn(error.message);
      },
    });

  const create = () =>
    useMutation<any, Error, any>(API.Band.create, {
      onSuccess: async (newBand: any) => {
        addItem(queryClient, ['bands'], newBand);
      },
      onError: (error: any) => {
        console.warn(error.message);
      },
    });

  return { getAll, create };
};
