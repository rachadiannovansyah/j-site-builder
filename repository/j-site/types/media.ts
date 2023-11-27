export interface IMediaRequestBody {
  file: File
  caption: string
  category: string
  setting_id: string
}

export interface IMediaResponseData {
  created_by: string
  file: {
    path: string
    size: number
    mimetype: string
    originalname: string
    filename: string
    uri: string
  }
  caption: string
  category: string
  title?: string
  description?: string
  tags: string[]
  filetype: string
  setting_id: string
  _id: string
  created_at: string
  updated_at: string
  id: string
}

export interface IStoreMediaResponse {
  data: IMediaResponseData
  message: string
}

export interface IDeleteMediaResponse {
  message: string
}
