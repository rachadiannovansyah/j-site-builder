export interface IPageData {
  title: string
  status: string
  sections: unknown[]
}

export interface IPageResponse {
  data?: IPageData
  status?: object
  error?: object
}
export interface IPageDataExtended {
  _id: string
  created_by: string
  title: string
  sections: unknown[]
  is_active: boolean
  status: string
  created_at: string
  updated_at: string
  slug: string
}

export interface IMetaData {
  page: number
  last_page: number
  limit: number
  from: number
  to: number
  total: number
}

export interface IPagesResponse {
  data?: IPageDataExtended[]
  meta?: IMetaData
}
