import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import queryString from "query-string";
import Article from "../molecules/article";
import ArticleModel from "../../../models/interfaces/article";
import Pagination from "../molecules/pagination";
import * as Api from "../../../helpers/api";
import FetchStatus from "../../../helpers/enums";

interface HomeState {
  fetchStatus: FetchStatus;
  articles: Array<ArticleModel>;
  totalArticles: number;
  currentPage: number;
}

interface QueryParams {
  page: number;
}

export default class Home extends Component<RouteComponentProps, HomeState> {
  static parseQueryParams(query: string): QueryParams {
    const { page } = queryString.parse(query);
    let currentPage: number;

    if (page === undefined || page === null) {
      currentPage = 1;
    } else if (Array.isArray(page)) {
      currentPage = parseInt(page[0], 10);
    } else {
      currentPage = parseInt(page, 10);
    }

    return { page: currentPage };
  }

  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      fetchStatus: FetchStatus.NOT_YET,
      articles: [],
      totalArticles: 0,
      currentPage: 1
    };
  }

  componentDidMount() {
    const { location } = this.props;
    this.onUpdateQuery(location.search);
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    const { location } = this.props;
    if (location.search !== prevProps.location.search) {
      this.onUpdateQuery(location.search);
    }
  }

  onUpdateQuery(query: string) {
    const { page } = Home.parseQueryParams(query);
    this.updateArticles(page);
  }

  Content = () => {
    const { articles, fetchStatus } = this.state;

    switch (fetchStatus) {
      case FetchStatus.NOT_YET:
      case FetchStatus.FETCHING:
        return <>Loading ...</>;
      case FetchStatus.NOT_FOUND:
        return <>Resource Not Found !!!</>;
      case FetchStatus.SUCCEEDED:
        return (
          <>
            {articles.map(article => (
              <Article key={article._id} article={article} />
            ))}
          </>
        );
      default:
        return <>Something Wrong !!!</>;
    }
  };

  updateArticles(page: number) {
    this.setState({
      fetchStatus: FetchStatus.FETCHING
    });

    Api.fetchArticles(page)
      .then(res => {
        const { total, articles } = res;
        if (articles.length === 0) {
          this.setState({
            fetchStatus: FetchStatus.NOT_FOUND,
            articles: [],
            totalArticles: total
          });
        } else {
          this.setState({
            fetchStatus: FetchStatus.SUCCEEDED,
            articles,
            totalArticles: total,
            currentPage: page
          });
        }
      })
      .catch(() => {
        this.setState({
          fetchStatus: FetchStatus.FAILED
        });
      });
  }

  render() {
    const { totalArticles, currentPage } = this.state;
    return (
      <>
        <header className="page-header">
          <h3>Posts</h3>
        </header>
        <main className="site-main">
          <this.Content />
        </main>
        <Pagination totalArticles={totalArticles} currentPage={currentPage} />
      </>
    );
  }
}
