import { IFormStatus, IPostResponse } from '~/repository/j-site/types/post'

type IForm = {
  title: string
  image: {
    id: string
    uri: string
    filename: string
  }
  content: string
  author: string
  category: string
  tags: null | string[]
  status: null | IFormStatus
}

export const usePostStore = defineStore('post', {
  state: () => ({
    form: {
      title: '',
      image: {
        id: '',
        uri: '',
        filename: '',
      },
      content: '',
      author: '',
      category: '',
      tags: [],
      status: null,
    } as IForm,
  }),
  actions: {
    setTitle(title: string) {
      this.form.title = title
    },
    setContent(content: string) {
      this.form.content = content
    },
    setAuthor(author: string) {
      this.form.author = author
    },
    setCategory(category: string) {
      this.form.category = category
    },
    setImage({
      id,
      uri,
      filename,
    }: {
      id: string
      uri: string
      filename: string
    }) {
      this.form.image.id = id
      this.form.image.uri = uri
      this.form.image.filename = filename
    },
    pushTag(tag: string) {
      this.form.tags?.push(tag)
    },
    removeTag(tag: string) {
      if (this.form.tags?.includes(tag)) {
        this.form.tags = this.form.tags?.filter((item) => item !== tag)
      }
    },
    setStatus(status: IFormStatus) {
      this.form.status = status
    },
    generateFormData({ status }: { status: IFormStatus }) {
      this.setStatus(status)

      return {
        title: this.form.title,
        image: this.form.image.uri,
        content: this.form.content,
        author: this.form.author,
        category: this.form.category ? this.form.category : null,
        tags: this.form.tags ? [...this.form.tags] : [],
        status: this.form.status,
      }
    },
    setInitialData(postData: IPostResponse) {
      this.form.title = postData.data.title
      this.form.image.uri = postData.data.image?.uri ?? ''
      this.form.image.id = postData.data.image?.id ?? ''
      this.form.image.filename = postData.data.image?.originalname ?? ''
      this.form.content = postData.data.content
      this.form.author = postData.data.author
      this.form.category = postData.data.category?.id ?? ''
      this.form.tags = postData.data.tags
      this.form.status = postData.data.status
    },
  },
})
