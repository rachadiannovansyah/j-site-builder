export interface IUser {
  id: string
  name: string
  email?: string
  unit?: {
    id?: number
    name?: string
    chief?: string
    address?: string
    website?: string
    ppid?: string
    logo?: string
    phone?: string
  }
  role: {
    id: number
    name: string
  }
  permissions: string[]
  exp: string
  iss: string
}
