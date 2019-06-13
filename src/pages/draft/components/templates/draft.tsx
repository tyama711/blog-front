import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import * as Api from "../../../../helpers/api";

interface DraftState {
  title: string;
  body: string;
  error?: Error;
}

export default class Draft extends Component<RouteComponentProps, DraftState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      title: "",
      body: ""
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.postArticle = this.postArticle.bind(this);
  }

  onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value });
  }

  onChangeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ body: e.target.value });
  }

  async postArticle(title: string, body: string) {
    try {
      await Api.postArticle(this.state.title, this.state.body);
      this.props.history.push("/");
      this.props.history.push("/");
    } catch (err) {
      this.setState({ error: err });
    }
  }

  render() {
    return (
      <>
        <header className="page-header">
          <h3>New Article</h3>
        </header>
        <main className="site-main">
          <div className="form-group">
            <label htmlFor="draftTitle">Title</label>
            <input
              className="form-control"
              id="draftTitle"
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="draftText">Text</label>
            <textarea
              className="form-control"
              id="draftText"
              rows={3}
              onChange={this.onChangeText}
            />
          </div>
          {this.state.error && (
            <p className="text-danger">
              {this.state.error.name}: {this.state.error.message}
            </p>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={async () =>
              this.postArticle(this.state.title, this.state.body)
            }
          >
            Post!!
          </button>
        </main>
      </>
    );
  }
}
