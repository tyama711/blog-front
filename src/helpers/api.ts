import axios from "axios";
import urlJoin from "url-join";
import Article from "../models/interfaces/article";
import User from "../models/interfaces/user";
import Constants from "../constants";

export interface FetchArticlesResponse {
  total: number;
  articles: Array<Article>;
}

export async function fetchArticles(
  page: number = 1
): Promise<FetchArticlesResponse> {
  const response = await axios.get(Constants.ARTICLE_API_URL, {
    params: { page }
  });
  return response.data;
}

export async function fetchArticle(id: string): Promise<Article> {
  const response = await axios.get(urlJoin(Constants.ARTICLE_API_URL, id));
  return response.data;
}

export async function loginUser(username: string, password: string) {
  const response = await axios.post<User>(Constants.LOGIN_API_URL, undefined, {
    params: { username, password }
  });
  return response.data;
}

export async function logoutUser() {
  await axios.get(Constants.LOGOUT_API_URL);
}
