import React, { useState } from "react";
import { Formik } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onClickHandler = () => {
    navigate(`/signUp`);
  };

  return (
    <>
      <Container fluid className="h-screen bg-blue-500">
        <Container className=" bg-blue-500 h-screen flex justify-center items-center align-middle">
          <Row className=" border-5 w-96 lg:h-96  rounded-lg border-double  flex items-center ">
            <Col className="text-center ">
              <div>
                <h3 className="text-yellow-400 mb-3">SignIn Form</h3>
                <Formik
                  initialValues={{ userEmail: "", password: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.userEmail) {
                      errors.userEmail = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.userEmail
                      )
                    ) {
                      errors.userEmail = "Invalid Email address";
                    }
                    if (!values.password) {
                      errors.password = "Required";
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = await axios.post(
                        `http://localhost:8005/signIn`,
                        values
                      );
                      // console.log(response.data.data._id);
                      toast.success(response.data.message, {
                        position: "top-center",
                      });
                      setSubmitting(false);
                      const { token, role } = response.data;
                      localStorage.setItem("token", token);
                      localStorage.setItem("user", response.data.data._id);
                      localStorage.setItem("role", role);
                      if (role === "admin") {
                        navigate(`/adminDashboard`);
                      } else {
                        navigate(`/feedComp`);
                      }
                    } catch (error) {
                      if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                      ) {
                        toast.error(error.response.data.message, {
                          position: "top-center",
                        });
                      } else {
                        toast.error("An error occurred", {
                          position: "top-center",
                        });
                      }
                      setSubmitting(false);
                    }
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
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="mt-3 mb-3">
                        <input
                          type="email"
                          name="userEmail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.userEmail}
                          className="px-2 py-2 rounded-md border-2 text-center  font-bold bg-black text-white"
                          placeholder="Enter your Email..."
                        />
                        <h6 className="text-red-600 text-start ps-3 mt-2 ms-5">
                          {errors.userEmail &&
                            touched.userEmail &&
                            errors.userEmail}
                        </h6>
                      </div>
                      <div>
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="px-2 py-2 rounded-md border-2 text-center font-bold bg-black text-white"
                          placeholder="Enter your Password..."
                        />
                        <h6 className="text-red-600 text-start ps-3 mt-2 ms-5">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </h6>
                      </div>
                      <div className="flex justify-evenly mt-2">
                        <button
                          className="mt-3 px-3 bg-green-600 py-2 rounded-md text-white font-semibold hover:bg-green-700"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          SignIn
                        </button>
                        <button
                          type="button"
                          className="mt-3 px-3 bg-yellow-300 py-2 rounded-md text-white font-semibold hover:bg-yellow-500"
                          onClick={onClickHandler}
                        >
                          SignUp
                        </button>
                      </div>
                      {error && <div className="text-red-600">{error}</div>}
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
