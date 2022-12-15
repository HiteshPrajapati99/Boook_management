import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Userprofile() {
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_API_LINK + "/profile";

    const token = localStorage.getItem("x-access-token");
    // console.log(token);
    axios
      .get(url, { headers: { "x-access-token": token } })
      .then((res) => {
        setUserData(res.data.User);
      })
      .catch((error) => {
        if (error) {
          window.location.reload(true);
          localStorage.removeItem("x-access-token");
        }
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="slider-data mt-5">
      <Card
        className="shadow row "
        style={{
          margin: "5rem",
          width: "120%",
          border: "1px solid #39bda7",
        }}
      >
        <Card.Body>
          <Card.Title>
            <b> Hello {userdata.name}.... </b>
          </Card.Title>
          <Card.Body>
            <Card.Header style={{ marginLeft: "3rem" }}>
              <Card.Text style={{ fontWeight: "600" }}>
                Here is Your Profile information.....
              </Card.Text>
              <Card.Text>Email :- {userdata.email}</Card.Text>
              <Card.Text>Number :- {userdata.number}</Card.Text>
            </Card.Header>
          </Card.Body>
          <Card.Footer>
            <Card.Text> click Here To Update Data </Card.Text>
            <div className="d-grid">
              <button
                className="button"
                size="lg"
                onClick={() => navigate(`profile/update/${userdata._id}`)}
              >
                Edit
              </button>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}
