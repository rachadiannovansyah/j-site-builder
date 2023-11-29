/**
 * Get width and height dimension from a File
 * @param {file} file - image file
 * @returns {Promise<object> | object}
 */
export function getImageDimensions(
  file: File,
):
  | { width: number; height: number }
  | Promise<{ width: number; height: number }> {
  // fallback if `window` object is undefined to prevent runtime error
  if (!window) {
    return { width: 0, height: 0 }
  }

  const URL = window.URL || window.webkitURL
  const image = new Image()

  return new Promise((resolve) => {
    image.onerror = () => resolve({ width: 0, height: 0 })
    image.onload = () =>
      resolve({ width: image.naturalWidth, height: image.naturalHeight })

    image.src = URL.createObjectURL(file)
  })
}
