/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import APIService from '../apiService/apiService';
import APIContext from '../apiService/apiContext';

export const useJoinBandEvent = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getAll = () =>
    useQuery<any[], Error>(['joinBandEvent'], API.JoinBandEvent.getAll, {
      onError: (error: any) => {
        console.warn(error.message);
      },
    });

  const create = () =>
    useMutation<any, Error, any>(API.JoinBandEvent.create, {
      onError: (error: any) => {
        console.warn(error.message);
      },
    });

  return { getAll, create };
};
