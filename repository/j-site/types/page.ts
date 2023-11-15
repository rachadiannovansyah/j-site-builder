export interface IPageData {
  title: string
  status: string
  sections: []
}

export interface IPageResponse {
  data?: IPageData
  status?: object
  error?: object
}
