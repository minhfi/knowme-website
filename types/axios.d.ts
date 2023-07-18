import { AxiosResponse } from 'axios'

type TAxiosResponseData<T = any> = Promise<AxiosResponse<T>>
type TAxiosResponseList<T = any> = Promise<AxiosResponse<T[]>>
