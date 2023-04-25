import { AxiosInstance } from 'axios';
import { Send } from '../apiService';

export default class Band {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getAll = async (): Promise<any> => {
    const { data } = await Send(this._instance, 'GET', 'band');

    return data;
  };

  public create = async (variables: { payload: any }): Promise<any> => {
    const { payload } = variables;

    const { data } = await Send(this._instance, 'POST', 'band', payload);
    return data;
  };
}
