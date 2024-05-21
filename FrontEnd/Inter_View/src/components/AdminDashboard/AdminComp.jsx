import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const AdminComp = () => {
  const [seePost, setSeePost] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8005/getPosts`)
      .then((res) => {
        console.log(res.data.data);
        setSeePost(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onDeleteHandler = (id) => {
    axios
      .delete(`http://localhost:8005/deletePost/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setSeePost(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Container fluid className="h-auto p-5 bg-yellow-900">
        <Container className=" bg-yellow-900 h-auto pt-3 flex justify-center items-center align-middle">
          <Row className=" border-5 w-100 gap-3 p-4 h-auto justify-center  rounded-lg border-double flex items-center ">
            <h3 className="text-yellow-500 text-center text-wrap">
              Admin Login !!!
            </h3>
            {seePost &&
              seePost.map((elem, ind) => {
                return (
                  <Col
                    key={ind}
                    lg={4}
                    className=" mt-5 mb-5 p-3 border-2 text-center "
                  >
                    <div className="font-semibold p-3 text-white ">
                      <h5>{elem.createPost}</h5>
                      <h5>
                        Date: {new Date(elem.createdAt).toLocaleDateString()}
                      </h5>
                      <button
                        onClick={() => onDeleteHandler(elem._id)}
                        className="bg-red-600 mt-3 font-semibold text-white hover:bg-red-700 px-3 py-2 rounded-lg"
                      >
                        Deleted
                      </button>
                      <br />
                      <NavLink>
                        <button className="bg-yellow-300 mt-3 font-semibold text-white hover:bg-yellow-500 px-3 py-2 rounded-lg">
                          Approved
                        </button>
                      </NavLink>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </Container>
    </>
  );
};
