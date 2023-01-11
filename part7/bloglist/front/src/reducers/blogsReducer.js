import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      state = action.payload;
      return state;
    },
    createNewBlog(state, action) {
      const blog = action.payload;
      state.push(blog);
    },
    likeBlog(state, action) {
      const id = action.payload.id;
      const blog = state.find((b) => b.id === id);
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      return state.map((b) => (b.id !== id ? b : updatedBlog));
    },
    deleteBlog(state, action) {
      const blog = action.payload;
      const index = state.indexOf(blog);
      state.splice(index, 1);
    },
    addComment(state, action) {
      const blog = action.payload;
      const blogInStore = state.find((b) => b.id === blog.id);
      const updatedBlog = {
        ...blogInStore,
        comments: [...blog.comments],
      };
      return state.map((b) => (b.id !== blog.id ? b : updatedBlog));
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addNewBlog = (newBlog) => {
  return async (dispatch) => {
    const newBlogFromBack = await blogsService.create(newBlog);
    dispatch(createNewBlog(newBlogFromBack));
  };
};

export const likeForABlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    const blogUpdatedFromBack = await blogsService.update(blog.id, updatedBlog);
    dispatch(likeBlog(blogUpdatedFromBack));
  };
};

export const deleteABlog = (blog) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(blog.id);
    dispatch(deleteBlog(blog));
  };
};

export const saveCommentInBack = (id, comment) => {
  return async (dispatch) => {
    const savedBlog = await blogsService.addComment(id, comment);
    dispatch(addComment(savedBlog));
  };
};

export const { setBlogs, createNewBlog, likeBlog, deleteBlog, addComment } =
  blogsSlice.actions;

export default blogsSlice.reducer;
