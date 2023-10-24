import Cookies from 'js-cookie'

export const setCookie = (
  name: string,
  value: string,
  config?: object,
): string | undefined => Cookies.set(name, value, { ...config })

export const getCookie = (key: string): string | undefined => Cookies.get(key)

export const getAllCookies = (): object => Cookies.get()

export const removeAllCookies = (): void => {
  Object.keys(Cookies.get()).forEach((key) => {
    Cookies.remove(key)
  })
}

export const removeCookie = (key: string): void => {
  Cookies.remove(key)
}
