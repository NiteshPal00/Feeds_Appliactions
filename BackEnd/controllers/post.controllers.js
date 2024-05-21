import postModels from "../models/post.models";

export const addPost = (req, res) => {
  try {
    const { createPost, userID } = req.body;
    const savePost = new postModels({
      createPost: createPost,
      userID: userID,
    });
    savePost.save();

    if (savePost) {
      return res.status(201).json({
        data: savePost,
        message: "Successfully Created!!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const getPost = await postModels.find({ status: 1 });
    if (getPost.length === 0) {
      return res.status(404).json({
        message: "No posts found",
      });
    }
    return res.status(200).json({
      data: getPost,
      message: "Successfully Fetched!!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const userID = req.params.userid;
    const getPost = await postModels.find({ userID: userID });
    if (getPost.length > 0) {
      return res.status(200).json({
        data: getPost,
        message: "Successfully Fetched!!!",
      });
    } else {
      return res.status(404).json({
        message: "No posts found for the given user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { createPost } = req.body;
    const postId = req.params.post_id;
    const updatePost = await postModels.updateOne(
      { _id: postId },
      {
        $set: {
          createPost: createPost,
        },
      }
    );
    if (updatePost.acknowledged) {
      return res.status(201).json({
        message: "Successfully Updated!!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.post_id;
    const deletePost = await postModels.deleteOne({ _id: postId });
    if (deletePost) {
      return res.status(200).json({
        message: "Successfully Deleted!!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
