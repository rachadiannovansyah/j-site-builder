export interface IMetaData {
  page: number
  last_page: number
  limit: number
  from: number
  to: number
  total: number
}

export interface ILogosFileData {
  path: string
  uri: string
}

export interface ILogosData {
  title: string
  file: ILogosFileData
}

export type ILogosResponse = {
  data: ILogosData[]
  meta: IMetaData
}
