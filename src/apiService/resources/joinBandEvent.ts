import { AxiosInstance } from 'axios';
import { Send } from '../apiService';

export default class JoinTable {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getAll = async (): Promise<any> => {
    const { data } = await Send(this._instance, 'GET', 'joinTable');

    return data;
  };

  public create = async (variables: { payload: any }): Promise<any> => {
    const { payload } = variables;

    const { data } = await Send(this._instance, 'POST', 'joinTable', payload);
    return data;
  };
}
