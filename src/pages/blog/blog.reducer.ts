import { createAction, createReducer } from "@reduxjs/toolkit";
import { Post } from "../../types/blog.type";
import { initalPostList } from "../../constants/blog";

interface BlogState {
  postList: Post[];
  editingPost: Post | undefined;
}

const initalState: BlogState = {
  postList: initalPostList,
  editingPost: undefined,
};

export const addPost = createAction<Post>("blog/addPost");
export const deletePost = createAction<string>("blog/deletePost");
export const startEditingPost = createAction<string>("blog/startEditingPost");
export const cancelEditingPost = createAction("blog/cancelEditingPost");
export const finishEditingPost = createAction<Post>("blog/finishEditingPost");

const blogReducer = createReducer(initalState, (builder) => {
  builder
    .addCase(addPost /*action creator*/, (state, action) /* reducer */ => {
      const post = action.payload;
      state.postList.push(post);
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload;
      const foundPostIndex = state.postList.findIndex(
        (post) => post.id === postId
      );
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1);
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload;
      const foundPost = state.postList.find((post) => post.id === postId);
      state.editingPost = foundPost;
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = undefined;
    })
    .addCase(finishEditingPost, (state, action) => {
      const postId = action.payload.id;
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload;
          state.editingPost = undefined;
          return true;
        }
        return false;
      });
    });
}); //builder callback dùng để xử lý action và cập nhật state

export default blogReducer;
