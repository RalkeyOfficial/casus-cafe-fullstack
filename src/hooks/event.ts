/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import APIService from '../apiService/apiService';
import APIContext from '../apiService/apiContext';
import { addItem } from '../services/mutateQueries';

export const useEvent = (queryClient: QueryClient) => {
  const API: APIService | null = React.useContext(APIContext);

  const getAll = () =>
    useQuery<any[], Error>(['events'], API?.Event.getAll, {
      onError: (error: any) => {
        console.warn(error.message);
      },
    });

  const getOne = (eventId: string) =>
    useQuery<any, Error>(['events', eventId], () => API?.Event.getOne(eventId), {
      initialData: () =>
        queryClient.getQueryData<any[]>(['events'])?.find((_event: any) => _event.id === eventId),
      onError: (error: any) => {
        console.warn(error.message);
      },
      enabled: !!eventId,
    });

  const create = () =>
    useMutation<any, Error, any>(API.Event.create, {
      onSuccess: async (newEvent: any) => {
        addItem(queryClient, ['events'], newEvent);
      },
      onError: (error: any) => {
        console.warn(error.message);
      },
    });

  return { getAll, getOne, create };
};
