import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Resources
import Event from './resources/event';
import Genre from './resources/genre';
import Band from './resources/band';

export default class APIService {
  public get BaseClient(): AxiosInstance {
    return axios.create({
      baseURL: 'http://localhost:3001/api/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }

  // Resources
  public get Event(): Event {
    return new Event(this.BaseClient);
  }

  public get Genre(): Genre {
    return new Genre(this.BaseClient);
  }

  public get Band(): Band {
    return new Band(this.BaseClient);
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
