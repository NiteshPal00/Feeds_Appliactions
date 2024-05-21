import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controllers";

const postRouter = express.Router();

postRouter.post(`/addPost`, addPost);
postRouter.get(`/getPosts`, getPosts);
postRouter.get(`/getPost/:userid`, getPost);
postRouter.put(`/updatePost/:post_id`, updatePost);
postRouter.delete(`/deletePost/:post_id`, deletePost);

export default postRouter;
