import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FeedsComp = () => {
  const navig = useNavigate();

  const onPostView = () => {
    navig(`/postFeed`);
  };

  const onPostAllView = () => {
    navig(`/allpostFeed`);
  };

  const userCheck = localStorage.getItem("user");
  console.log(userCheck);
  
  return (
    <>
      <Container fluid className="h-screen bg-black">
        <Container className=" bg-black h-screen flex justify-center items-center align-middle">
          <Row className=" border-5 w-96 lg:h-96  rounded-lg border-double flex items-center ">
            <Col className="text-center ">
              <div>
                <h3 className="text-red-600 mb-3">Create Post</h3>
                <Formik
                  initialValues={{ createPost: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.createPost) {
                      errors.createPost = "Required";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    const addUser = {
                      createPost: values.createPost,
                      userID: userCheck,
                    };
                    axios
                      .post("http://localhost:8005/addPost", addUser)
                      .then((res) => {
                        console.log(res);
                        setSubmitting(false);
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="mt-3 mb-3">
                        <input
                          type="text"
                          name="createPost"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.createPost}
                          className="px-2 py-2 rounded-md border-2 text-center  font-bold bg-black text-white"
                          placeholder="Enter your Post..."
                        />
                        <h6 className="text-red-600">
                          {errors.createPost &&
                            touched.createPost &&
                            errors.createPost}
                        </h6>
                      </div>
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-red-600 mt-3 font-semibold text-white hover:bg-red-700 px-3 py-2 rounded-lg"
                        >
                          Create Post
                        </button>
                        <br />
                        <button
                          onClick={onPostView}
                          type="button"
                          className="bg-red-600 mt-3 font-semibold text-white hover:bg-red-700 px-3 py-2 rounded-lg"
                        >
                          View My Post
                        </button>
                        <br />
                        <button
                          type="button"
                          onClick={onPostAllView}
                          className="bg-red-600 mt-3 font-semibold text-white hover:bg-red-700 px-3 py-2 rounded-lg"
                        >
                          View Other User Post
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
