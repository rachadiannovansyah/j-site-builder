import { z } from 'zod'
import { getImageDimensions } from '@/common/helpers/image'
import { getFileSize } from '@/common/helpers/currency'

interface IValidateImageConfig {
  maxSize: number
  maxWidth: number
  maxHeight: number
  accepted?: string[]
}

export async function validateImage(
  file: File,
  { maxSize, maxWidth, maxHeight, accepted }: IValidateImageConfig,
) {
  const MAX_FILE_SIZE = maxSize ?? 2000000 // default maxSize 1MB
  const MAX_WIDTH = maxWidth ?? 1024 // default maxWidth 1024 pixel
  const MAX_HEIGHT = maxHeight ?? 576 // default maxHeight 576 pixel
  const ACCEPTED_IMAGE_TYPES =
    accepted && accepted.length > 0
      ? accepted
      : ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const { width, height } = await getImageDimensions(file)

  const ImageSchema = z
    .instanceof(File)
    .refine((file) => file.length !== 0, {
      message: 'Gambar tidak boleh kosong!',
    })
    .refine(
      (file) => {
        const fileType = file.type || ''
        return ACCEPTED_IMAGE_TYPES.includes(fileType)
      },
      {
        message: `
        Format gambar yang diperbolehkan adalah 
        ${ACCEPTED_IMAGE_TYPES.join(', ')}`,
      },
    )
    .refine(
      (file) => {
        const fileSize = file.size || 0
        return fileSize <= MAX_FILE_SIZE
      },
      {
        message: `Ukuran gambar boleh melebihi ${getFileSize(MAX_FILE_SIZE)}!`,
      },
    )
    .refine(
      () => {
        return width <= MAX_WIDTH && height <= MAX_HEIGHT
      },
      {
        message: `Dimensi gambar tidak boleh melebihi ${MAX_WIDTH} x ${MAX_HEIGHT} pixel`,
      },
    )

  return ImageSchema.parse(file)
}
