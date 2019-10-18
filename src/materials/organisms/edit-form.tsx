import React, { Component } from "react";
import FetchStatus from "../../helpers/enums";

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
    const { postArticleFunc } = this.props;
    const { title, body, fetchStatus } = this.state;

    if (fetchStatus === FetchStatus.FETCHING) return;

    try {
      this.setState({ fetchStatus: FetchStatus.FETCHING });
      await postArticleFunc(title, body);
    } catch (err) {
      this.setState({ fetchStatus: FetchStatus.FAILED, error: err });
    }
  }

  render() {
    const { editType } = this.props;
    const { title, body, error } = this.state;

    return (
      <>
        <header className="page-header">
          <h3>{editType === "new" ? "New Article" : "Edit Article"}</h3>
        </header>
        <main className="site-main">
          <div className="form-group">
            <label htmlFor="articleTitle">Title</label>
            <input
              className="form-control"
              id="articleTitle"
              onChange={this.handleChangeTitle}
              value={title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="articleText">Text</label>
            <textarea
              className="form-control"
              id="articleText"
              rows={3}
              onChange={this.handleChangeText}
              value={body}
            />
          </div>
          {error && (
            <p className="text-danger">
              `{error.name} : {error.message}`
            </p>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={async () => this.handleClickButton()}
          >
            {editType === "new" ? "Post!!" : "Update!!"}
          </button>
        </main>
      </>
    );
  }
}
