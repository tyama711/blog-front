type ContentType = 'plain' | 'markdown'

export default interface ArticleModel {
  _id: string
  createDate: Date
  updateDate?: Date
  title: string
  abstract: string
  content: {
    type: ContentType
    body: string
  }
}
