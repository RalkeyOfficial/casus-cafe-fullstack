import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Resources
import Event from './resources/event';

export default class APIService {
  public get BaseClient(): AxiosInstance {
    return axios.create({
      baseURL: 'http://localhost:3001/api/',
    });
  }

  // Resources
  public get Event(): Event {
    return new Event(this.BaseClient);
  }
}

export const Send = (
  instance: AxiosInstance,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  payload?: JSON
): Promise<AxiosResponse> => {
  const _payload = JSON.stringify(payload);

  switch (method) {
    case 'GET':
      return instance.get(endpoint);

    case 'POST':
      return instance.post(endpoint, _payload);

    case 'PUT':
      return instance.put(endpoint, _payload);

    case 'DELETE':
      return instance.delete(endpoint);
  }
};
