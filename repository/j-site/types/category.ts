export interface ICategoryData {
  id: string
  name: string
  is_deletable: boolean
  used_by: number
  selected?: boolean
}

export interface IMetaData {
  page: number
  last_page: number
  limit: number
  from: number
  to: number
  total: number
}

export interface ICategoryResponse {
  data?: ICategoryData[]
  meta?: IMetaData
}
