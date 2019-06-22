import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import * as Api from "../../../../helpers/api";
import EditForm from "../../../../materials/organisms/edit-form";
import { FetchStatus } from "../../../../helpers/enums";

interface PathParams {
  id: string;
}

interface UpdateArticleState {
  fetchStatus: FetchStatus;
  title: string;
  body: string;
  error?: Error;
}

export default class UpdateArticle extends Component<
  RouteComponentProps<PathParams>,
  UpdateArticleState
> {
  constructor(props: RouteComponentProps<PathParams>) {
    super(props);

    this.state = { fetchStatus: FetchStatus.NOT_YET, title: "", body: "" };

    this.updateArticle = this.updateArticle.bind(this);
    this.fetchArticle = this.fetchArticle.bind(this);
  }

  componentDidMount() {
    this.fetchArticle();
  }

  async updateArticle(title: string, body: string) {
    const id = this.props.match.params.id;
    await Api.updateArticle(id, title, body);
    this.props.history.push("../" + id);
  }

  async fetchArticle() {
    try {
      this.setState({ fetchStatus: FetchStatus.FETCHING });
      const article = await Api.fetchArticle(this.props.match.params.id);
      this.setState({
        fetchStatus: FetchStatus.SUCCEEDED,
        title: article.title,
        body: article.content.body
      });
    } catch (err) {
      this.setState({ fetchStatus: FetchStatus.FAILED, error: err });
    }
  }

  render() {
    switch (this.state.fetchStatus) {
      case FetchStatus.SUCCEEDED:
        return (
          <EditForm
            editType="update"
            postArticleFunc={this.updateArticle}
            initTitle={this.state.title}
            initBody={this.state.body}
          />
        );
      case FetchStatus.FAILED:
        return this.state.error || "Something Wrong !!!";
      default:
        return "Loading...";
    }
  }
}
