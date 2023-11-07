import { jwtDecode } from 'jwt-decode'

export const decode = <T>(token: string) => jwtDecode<T>(token)
