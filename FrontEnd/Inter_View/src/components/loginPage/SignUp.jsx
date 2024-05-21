import React from "react";
import { Formik } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
  const nav = useNavigate();

  return (
    <>
      <Container fluid className="h-screen bg-blue-600">
        <Container className="bg-blue-600 h-screen flex justify-center items-center align-middle">
          <Row className="border-5 w-96 p-4 h-auto rounded-lg border-double flex items-center">
            <Col className="text-center">
              <div>
                <h1 className="text-yellow-400 mb-3">SignUp Form</h1>
                <Formik
                  initialValues={{
                    userName: "",
                    userEmail: "",
                    password: "",
                    userPhone: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.userName) {
                      errors.userName = "Required";
                    }
                    if (!values.userPhone) {
                      errors.userPhone = "Required";
                    }
                    if (!values.password) {
                      errors.password = "Required";
                    }
                    if (!values.userEmail) {
                      errors.userEmail = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.userEmail
                      )
                    ) {
                      errors.userEmail = "Invalid Email address";
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = await axios.post(
                        `http://localhost:8005/signUp`,
                        values
                      );
                      toast.success(response.data.message, {
                        position: "top-center",
                      });
                      setSubmitting(false);
                      nav(`/`);
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
                          type="text"
                          name="userName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.userName}
                          className="px-2 py-2 rounded-md border-2 text-center mt-2 font-bold bg-black text-white"
                          placeholder="Enter your name..."
                        />
                        <h6 className="text-red-600">
                          {errors.userName &&
                            touched.userName &&
                            errors.userName}
                        </h6>
                        <input
                          type="email"
                          name="userEmail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.userEmail}
                          className="px-2 py-2 rounded-md border-2 mt-2 text-center font-bold bg-black text-white"
                          placeholder="Enter your Email..."
                        />
                        <h6 className="text-red-600">
                          {errors.userEmail &&
                            touched.userEmail &&
                            errors.userEmail}
                        </h6>
                      </div>
                      <input
                        type="number"
                        name="userPhone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userPhone}
                        className="px-2 py-2 rounded-md border-2 mt-2 text-center font-bold bg-black text-white"
                        placeholder="Enter your Contact..."
                      />
                      <h6 className="text-red-600">
                        {errors.userPhone &&
                          touched.userPhone &&
                          errors.userPhone}
                      </h6>
                      <div>
                        <input
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="px-2 py-2 rounded-md border-2 text-center mt-2 font-bold bg-black text-white"
                          placeholder="Enter your Password..."
                        />
                        <h6 className="text-red-600">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </h6>
                      </div>
                      <div className="flex justify-evenly mt-3">
                        <button
                          className="mt-3 px-3 bg-green-600 py-2 rounded-md text-white font-semibold hover:bg-green-700"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          SignIn
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
