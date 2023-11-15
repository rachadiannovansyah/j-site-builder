export interface ISiteSetting {
  _id: string
  created_by: string
  name: string
  favicon: string
  color_palette?: unknown
  subdomain: string
  organization: string
  is_active: boolean
  logo: string
  navigation?: unknown
  footer?: unknown
  created_at: string
  updated_at: string
  domain: string
  id: string
}

export interface IMetaData {
  page: number
  last_page: number
  limit: number
  from: number
  to: number
  total: number
}

export interface ISettingsResponse {
  data: ISiteSetting[]
  meta?: IMetaData
}
