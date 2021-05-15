import axios, { AxiosResponse } from 'axios';
import { PaginatedResult } from './models/pagination';
import { IPost, PostFormValues } from './models/post';
import { IUser, IUserForm } from './models/user';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Posts = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<IPost[]>>('/posts', {params}).then(responseBody),
  create: (post: PostFormValues) => requests.post<void>('/posts', post),
}

const Account = {
  current: () => requests.get<IUser>('/account'),
  login: (user: IUserForm) => requests.post<IUser>('/account/login', user),
}

const agent = {
  Posts,
  Account
}

export default agent;