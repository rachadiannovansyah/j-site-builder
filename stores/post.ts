type IForm = {
  title: string
  image: string
  content: string
  author: string
  category: string
  tags: null | string[]
  status: null | IFormStatus
}

type IFormStatus = 'DRAFT' | 'PUBLISHED'

export const usePostStore = defineStore('post', {
  state: () => ({
    form: {
      title: '',
      image: '',
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
  },
})
