import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export const ViewPostComp = () => {
  const back = useNavigate();
  const [seePost, setSeePost] = useState([]);
  const { id } = useParams();
  const onBackHandler = () => {
    back(`/feedComp`);
  };

  const dataId = localStorage.getItem("user");
  console.log(dataId);

  useEffect(() => {
    axios
      .get(`http://localhost:8005/getPost/${dataId}`)
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
      <Container fluid className="h-auto p-5 bg-black">
        <Container className=" bg-black h-auto pt-3 flex justify-center items-center align-middle">
          <Row className=" border-5 w-100 gap-3 p-4 h-auto justify-center  rounded-lg border-double flex items-center ">
            <h3 className="text-yellow-500 text-center text-wrap">
              Welcome to see Post !!!
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
                      <NavLink to={`/updateFeed/${elem._id}`}>
                        <button className="bg-yellow-300 mt-3 font-semibold text-white hover:bg-yellow-500 px-3 py-2 rounded-lg">
                          Updated
                        </button>
                      </NavLink>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
        <div className="text-white flex justify-end ">
          <button
            onClick={onBackHandler}
            className="hover:text-white text-black font-bold px-4 py-1 mt-3 bg-green-500 rounded-md  border-2 "
          >
            Back
          </button>
        </div>
      </Container>
    </>
  );
};
