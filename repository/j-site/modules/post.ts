import { AsyncDataOptions } from '#app'
import { FetchOptions } from 'ofetch'

import FetchFactory from '../../factory'
import { IPostsResponse, IPostBodyRequest, IPostResponse } from '../types/post'

class PostModules extends FetchFactory {
  private RESOURCE = '/v1/posts'

  async getPostList(
    id: string,
    fetchOptions?: FetchOptions<'json'>,
    options?: AsyncDataOptions<IPostsResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPostsResponse>(
        'GET',
        `${this.RESOURCE}/${id}`,
        undefined, // body
        fetchOptions,
      )
    }, options)
  }

  async getPostById(
    idSetting: string,
    idPost: string,
    options?: AsyncDataOptions<IPostResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPostResponse>(
        'GET',
        `${this.RESOURCE}/${idSetting}/${idPost}`,
        undefined, // body
      )
    }, options)
  }

  async createPost(
    idSetting: string,
    body: IPostBodyRequest,
    options?: AsyncDataOptions<IPostsResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPostsResponse>(
        'POST',
        `${this.RESOURCE}/${idSetting}`,
        body,
      )
    }, options)
  }

  async patchPostStatus(
    idSetting: string,
    idPost: string,
    body?: { status: string },
    options?: AsyncDataOptions<IPostsResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPostsResponse>(
        'PATCH',
        `${this.RESOURCE}/${idSetting}/${idPost}`,
        body,
      )
    }, options)
  }

  async updatePost(
    idSetting: string,
    idPost: string,
    body: IPostBodyRequest,
    options?: AsyncDataOptions<IPostsResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPostsResponse>(
        'PUT',
        `${this.RESOURCE}/${idSetting}/${idPost}`,
        body,
      )
    }, options)
  }

  async deletePost(
    idSetting: string,
    idPost: string,
    options?: AsyncDataOptions<IPostsResponse>,
  ) {
    return useAsyncData(() => {
      return this.call<IPostsResponse>(
        'DELETE',
        `${this.RESOURCE}/${idSetting}/${idPost}`,
        undefined,
      )
    }, options)
  }
}

export default PostModules
