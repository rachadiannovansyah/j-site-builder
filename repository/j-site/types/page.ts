export interface IPageData {
  title: string
  status: string
  sections: []
}

export interface IPageResponse {
  data?: IPageData
  status?: number
  message?: string
}
