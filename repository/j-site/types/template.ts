/* eslint-disable @typescript-eslint/no-explicit-any */
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
  widget?: string
  payload?: { [key: string]: any }
}
export interface ITemplateSection {
  grid_column: number
  widgets: ITemplateWidget[]
  title?: string
  description?: string
}

export interface ITemplateData {
  id: number
  name: string
  thumbnail: string
  preview: string
  sections: ITemplateSection[]
  created_at: string
  updated_at: string
  category: string
}

export type ITemplatesResponse = {
  data: ITemplateData[]
  meta: IMetaData
}

export type ITemplateResponse = {
  data: ITemplateData
}
