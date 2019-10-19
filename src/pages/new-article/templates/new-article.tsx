import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import * as Api from '../../../helpers/api'
import EditForm from '../../../materials/organisms/edit-form'

export default class NewArticle extends Component<RouteComponentProps<{}>> {
  postArticle = async (title: string, body: string) => {
    const { history } = this.props
    await Api.postArticle(title, body)
    history.push('/')
  }

  render() {
    return <EditForm editType="new" postArticleFunc={this.postArticle} />
  }
}
