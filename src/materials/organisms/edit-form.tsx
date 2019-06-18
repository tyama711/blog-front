import React, { Component } from "react";
import { FetchStatus } from "../../helpers/enums";

interface EditFormProps {
  editType: "new" | "update";
  postArticleFunc: (title: string, body: string) => Promise<void>;
  initTitle?: string;
  initBody?: string;
}

interface EditFormState {
  title: string;
  body: string;
  fetchStatus: FetchStatus;
  error?: Error;
}

export default class EditForm extends Component<EditFormProps, EditFormState> {
  constructor(props: EditFormProps) {
    super(props);

    this.state = {
      title: props.initTitle || "",
      body: props.initBody || "",
      fetchStatus: FetchStatus.NOT_YET
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value });
  }

  handleChangeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ body: e.target.value });
  }

  async handleClickButton() {
    if (this.state.fetchStatus === FetchStatus.FETCHING) return;

    try {
      this.setState({ fetchStatus: FetchStatus.FETCHING });
      await this.props.postArticleFunc(this.state.title, this.state.body);
    } catch (err) {
      this.setState({ fetchStatus: FetchStatus.FAILED, error: err });
    }
  }

  render() {
    const { editType } = this.props;
    return (
      <>
        <header className="page-header">
          <h3>{editType == "new" ? "New Article" : "Edit Article"}</h3>
        </header>
        <main className="site-main">
          <div className="form-group">
            <label htmlFor="articleTitle">Title</label>
            <input
              className="form-control"
              id="articleTitle"
              onChange={this.handleChangeTitle}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="articleText">Text</label>
            <textarea
              className="form-control"
              id="articleText"
              rows={3}
              onChange={this.handleChangeText}
              value={this.state.body}
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
            onClick={async () => this.handleClickButton()}
          >
            {editType == "new" ? "Post!!" : "Update!!"}
          </button>
        </main>
      </>
    );
  }
}
