import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import * as Api from '../../../helpers/api'
import EditForm from '../../../materials/organisms/edit-form'

export default class NewArticle extends Component<RouteComponentProps<{}>> {
  constructor(props: RouteComponentProps<{}>) {
    super(props)

    this.postArticle = this.postArticle.bind(this)
  }

  async postArticle(title: string, body: string) {
    const { history } = this.props
    await Api.postArticle(title, body)
    history.push('/')
  }

  render() {
    return <EditForm editType="new" postArticleFunc={this.postArticle} />
  }
}
