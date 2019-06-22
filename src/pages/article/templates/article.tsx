import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import MarkdownRenderer from "@nteract/markdown";
import ArticleModel from "../../../models/interfaces/article";
import ArticleMetaInfo from "../../../materials/atoms/article-meta-info";
import ArticleTitle from "../../../materials/atoms/article-title";
import { fetchArticle } from "../../../helpers/api";
import { FetchStatus } from "../../../helpers/enums";
import User from "../../../models/interfaces/user";

interface PathParams {
  id: string;
}

interface ArticleProps {
  user?: User;
}

interface ArticleState {
  fetchStatus: FetchStatus;
  article?: ArticleModel;
}

interface ContentProps {
  article: ArticleModel;
}

export default class Article extends Component<
  RouteComponentProps<PathParams> & ArticleProps,
  ArticleState
> {
  constructor(props: RouteComponentProps<PathParams> & ArticleProps) {
    super(props);
    this.state = {
      fetchStatus: FetchStatus.NOT_YET
    };
  }

  componentDidMount() {
    this.setState({
      fetchStatus: FetchStatus.FETCHING
    });

    fetchArticle(this.props.match.params.id)
      .then(article => {
        this.setState({
          fetchStatus: FetchStatus.SUCCEEDED,
          article
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.setState({
            fetchStatus: FetchStatus.NOT_FOUND
          });
        } else {
          this.setState({
            fetchStatus: FetchStatus.FAILED
          });
        }
      });
  }

  render() {
    const { fetchStatus, article } = this.state;

    switch (fetchStatus) {
      case FetchStatus.NOT_YET:
      case FetchStatus.FETCHING:
        return <>Loading ...</>;
      case FetchStatus.NOT_FOUND:
        return <>Resource Not Found !!!</>;
      case FetchStatus.FAILED:
        return <>Something Wrong !!!</>;
      case FetchStatus.SUCCEEDED:
        return (
          article && (
            <>
              <header>
                <ArticleMetaInfo
                  createDate={article.createDate}
                  updateDate={article.updateDate}
                />
                {this.props.user && (
                  <Link
                    to={`/article/${this.props.match.params.id}/edit`}
                    className="btn btn-primary edit-button"
                  >
                    Edit
                  </Link>
                )}
                <ArticleTitle title={article.title} />
              </header>
              <this.Content article={article} />
            </>
          )
        );
    }
  }

  Content = (props: ContentProps) => {
    const { article } = props;
    switch (article.content.type) {
      case "plain":
        return <>{article.content.body}</>;
      case "markdown":
        return <MarkdownRenderer source={article.content.body} />;
      default:
        return <>Wrong ContentType !!!</>;
    }
  };
}
