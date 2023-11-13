export interface IMetaData {
  page: number
  last_page: number
  limit: number
  from: number
  to: number
  total: number
}
export interface ITemplateWidget {
  grid_span: number
  name: string
}
export interface ITemplateSection {
  grid_column: number
  widgets: ITemplateWidget[]
}

export interface ITemplateData {
  id: number
  name: string
  thumbnail: string
  preview: string
  sections: ITemplateSection[]
  created_at: string
  updated_at: string
}

export type ITemplateResponse = {
  data: ITemplateData[]
  meta: IMetaData
}