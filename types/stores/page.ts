export interface IPageWidget {
  grid_span: number
  name: string
}

export interface IPageSection {
  grid_column: number
  widgets: IPageWidget[]
}

export interface IPageStructure {
  id?: number
  name?: string
  methode?: string
  type?: string
  updated_at?: string
  sections?: IPageSection[]
}
