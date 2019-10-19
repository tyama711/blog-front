import axios from 'axios'
import urlJoin from 'url-join'
import Article from '../models/interfaces/article'
import User from '../models/interfaces/user'
import Constants from '../constants'

export interface FetchArticlesResponse {
  total: number
  articles: Array<Article>
}

export async function fetchArticles(page = 1): Promise<FetchArticlesResponse> {
  const response = await axios.get<FetchArticlesResponse>(
    Constants.ARTICLE_API_URL,
    {
      params: { page },
    }
  )

  response.data.articles = response.data.articles.map((article: Article) => {
    const retArticle = article
    retArticle.createDate = new Date(article.createDate)
    if (article.updateDate !== undefined) {
      retArticle.updateDate = new Date(article.updateDate)
    }
    return retArticle
  })

  return response.data
}

export async function fetchArticle(id: string): Promise<Article> {
  const response = await axios.get(urlJoin(Constants.ARTICLE_API_URL, id))
  return response.data
}

export async function postArticle(
  title: string,
  body: string,
  abstract?: string
) {
  await axios.post(
    Constants.ARTICLE_API_URL,
    {
      title,
      content: {
        type: 'markdown',
        body,
      },
      abstract,
    },
    { withCredentials: true }
  )
}

export async function updateArticle(
  id: string,
  title: string,
  body: string,
  abstract?: string
) {
  await axios.put(
    `${Constants.ARTICLE_API_URL}/${id}`,
    {
      title,
      content: {
        type: 'markdown',
        body,
      },
      abstract,
    },
    { withCredentials: true }
  )
}

export async function loginUser(username: string, password: string) {
  const response = await axios.post<User>(Constants.LOGIN_API_URL, undefined, {
    params: { username, password },
    withCredentials: true,
  })
  return response.data
}

export async function logoutUser() {
  await axios.get(Constants.LOGOUT_API_URL, { withCredentials: true })
}
