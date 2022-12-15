import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Userlist() {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState([]);

  // console.log(curElm);

  async function getdata() {
    const token = localStorage.getItem("x-access-token");
    const url = process.env.REACT_APP_API_LINK + "/users";

    const res = await axios.get(url, { headers: { "x-access-token": token } });
    setUserData(res.data);
  }

  useEffect(() => {
    getdata();
  }, []);

  // Modal Data
  const [show, setshow] = useState(false);
  const [modaltitle, setmodaltitle] = useState("");
  const handleClose = () => setshow(false);

  function handledelet(_id) {
    const url = process.env.REACT_APP_API_LINK + `/user/${_id}`;
    const token = localStorage.getItem("x-access-token");

    axios
      .delete(url, { headers: { "x-access-token": token } })
      .then(function (res) {
        if (res.data.success) {
          toast.success(res.data.message, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setshow(false);
          setTimeout(() => {
            getdata();
          }, 1000);
        } else {
          toast.error(res.data.message, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  }

  const hendelsearch = async (event) => {
    const types = event.target.value;

    const url = process.env.REACT_APP_API_LINK + `/search/user/${types}`;

    if (types) {
      const res = await axios.get(url);
      if (res.data.success) {
        setUserData(res.data.info);
      } else {
        getdata();
      }
    } else {
      getdata();
    }
  };

  return (
    <div className="slider-data mt-3">
      <div
        className="row"
        style={{ marginLeft: "1rem", gap: "1rem", marginTop: "5rem" }}
      >
        {userdata.length !== 0 ? (
          <div className="row gap-3">
            <h2 style={{ color: "#39bda7" }}> User Details :) </h2>

            <div>
              <input
                type="text"
                placeholder="User Search..."
                className="form-control"
                onChange={hendelsearch}
              />
            </div>
            {userdata.map((curElm, _id) => {
              return (
                <Card
                  key={_id}
                  style={{ width: "25rem", border: " 1px solid #39bda7" }}
                >
                  <Card.Body>
                    <Card.Title> First Name : {curElm.firstname} </Card.Title>
                    <Card.Title> Last Name : {curElm.lastname} </Card.Title>
                    <Card.Text>Gender : {curElm.gender}</Card.Text>
                    <Card.Text> Age : {curElm.age} </Card.Text>
                    <Card.Text> Address : {curElm.address} </Card.Text>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button
                        className="button"
                        onClick={() => navigate(`/user_edit/${curElm._id}`)}
                      >
                        Edit
                      </button>
                      <div>
                        <button
                          className="button"
                          onClick={() => {
                            setmodaltitle(curElm.firstname);
                            setshow(true);
                          }}
                        >
                          Delete
                        </button>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>{modaltitle}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to delete ?
                          </Modal.Body>
                          <Modal.Footer>
                            <button className="button" onClick={handleClose}>
                              Close
                            </button>
                            <button
                              className="button"
                              onClick={() => handledelet(curElm._id)}
                            >
                              Delete
                            </button>
                          </Modal.Footer>
                        </Modal>
                        <ToastContainer
                          position="bottom-left"
                          autoClose={2000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        ) : (
          <>
            <div
              style={{
                marginTop: "8rem",
                paddingLeft: "10rem",
              }}
            >
              <h1>No User Data Is Available</h1>
              <h2>Place Create User First</h2>
              <div className="d-grid">
                <button
                  className="button"
                  onClick={() => navigate("/add_user")}
                >
                  Add New User
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
