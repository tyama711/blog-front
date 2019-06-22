import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import queryString from "query-string";
import Article from "../molecules/article";
import ArticleModel from "../../../models/interfaces/article";
import Pagination from "../molecules/pagination";
import * as Api from "../../../helpers/api";
import { FetchStatus } from "../../../helpers/enums";

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
    this.onUpdateQuery(this.props.location.search);
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.onUpdateQuery(this.props.location.search);
    }
  }

  onUpdateQuery(query: string) {
    const { page } = this.parseQueryParams(query);
    this.updateArticles(page);
  }

  parseQueryParams(query: string): QueryParams {
    const { page } = queryString.parse(query);
    let currentPage: number;

    if (page === undefined || page === null) {
      currentPage = 1;
    } else if (Array.isArray(page)) {
      currentPage = parseInt(page[0]);
    } else {
      currentPage = parseInt(page);
    }

    return { page: currentPage };
  }

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
            articles: articles,
            totalArticles: total,
            currentPage: page
          });
        }
      })
      .catch(error => {
        this.setState({
          fetchStatus: FetchStatus.FAILED
        });
      });
  }

  render() {
    return (
      <>
        <header className="page-header">
          <h3>Posts</h3>
        </header>
        <main className="site-main">
          <this.Content />
        </main>
        <Pagination
          totalArticles={this.state.totalArticles}
          currentPage={this.state.currentPage}
        />
      </>
    );
  }

  Content = () => {
    switch (this.state.fetchStatus) {
      case FetchStatus.NOT_YET:
      case FetchStatus.FETCHING:
        return <>Loading ...</>;
      case FetchStatus.NOT_FOUND:
        return <>Resource Not Found !!!</>;
      case FetchStatus.FAILED:
        return <>Something Wrong !!!</>;
      case FetchStatus.SUCCEEDED:
        return (
          <>
            {this.state.articles.map(article => (
              <Article key={article._id} article={article} />
            ))}
          </>
        );
    }
  };
}
