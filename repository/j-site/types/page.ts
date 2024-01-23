export interface IPageData {
  title: string
  status: string
  sections: unknown[]
  category: string
  page_token?: string
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

export interface IPageDetailResponse {
  data?: IPageDataExtended
  meta?: IMetaData
}

export interface IPagePreviewResponse {
  preview_link: string
  data: {
    _id: string
    page_token: string
    created_at: string
    expired: string
    sections: unknown[]
    setting_id: string
    status: string
    title: string
    updated_at: string
    id: string
  }
  message: string
}
