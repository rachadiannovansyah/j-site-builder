export interface ICategory {
  _id: string
  id: string
  name: string
  used_by: number
  is_deletable: boolean
}

export interface IMetaData {
  page: number
  last_page: number
  limit: number
  from: number
  to: number
  total: number
}

export interface ICategoryRequestBody {
  name: string
}

export interface ICategoriesResponse {
  data: ICategory[]
  meta: IMetaData
}
