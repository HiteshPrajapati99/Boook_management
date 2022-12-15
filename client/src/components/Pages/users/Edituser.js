import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edituser() {
  const { _id } = useParams();
  //   console.log(_id);
  const naviget = useNavigate();

  const [Userdata, setUserData] = useState([]);
  // console.log(Userdata);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const url = process.env.REACT_APP_API_LINK + `/getuser/${_id}`;
    const token = localStorage.getItem("x-access-token");

    const res = await axios.get(url, { headers: { "x-access-token": token } });
    setUserData(res.data);
  };

  const hendleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("x-access-token");
    const url = process.env.REACT_APP_API_LINK + `/edit/user/${_id}`;

    axios
      .put(url, Userdata, {
        headers: { "x-access-token": token },
      })
      .then(function (res) {
        if (res.data.success) {
          toast.success(res.data.message, {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            naviget("/users");
          }, 1500);
        } else {
          toast.error(res.data.message, {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  const downkey = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "-"];

  return (
    <div className="slider-data mt-5">
      <div className="container">
        <div className="row" style={{ marginTop: "3rem" }}>
          <div className="col-md-6">
            <h2 className="text-center" style={{ color: "#39bda7" }}>
              Edit User
            </h2>
            <Form onSubmit={handlesubmit}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <input
                  onKeyDown={(e) =>
                    downkey.includes(e.key) && e.preventDefault()
                  }
                  type="text"
                  placeholder="Enter Your First Name"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  maxLength="10"
                  value={Userdata.firstname}
                  onChange={hendleInput}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-2">Last Name</Form.Label>
                <input
                  onKeyDown={(e) =>
                    downkey.includes(e.key) && e.preventDefault()
                  }
                  type="text"
                  placeholder="Enter Your Last Name"
                  className="form-control"
                  name="lastname"
                  id="lastname"
                  maxLength="10"
                  value={Userdata.lastname}
                  onChange={hendleInput}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="mt-3">Gender</Form.Label>
                <select
                  name="gender"
                  id="gender"
                  className="form-control"
                  value={Userdata.gender}
                  onChange={hendleInput}
                >
                  <optgroup label="Place Select Gender" />
                  <option value="Male">Male</option>
                  <option value="FeMale">FeMale</option>
                </select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label> Age</Form.Label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter Your Age"
                  name="age"
                  id="age"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                  value={Userdata.age}
                  onChange={hendleInput}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label> Address</Form.Label>
                <textarea
                  className="form-control"
                  name="address"
                  placeholder="Place Enter Your Address"
                  id="address"
                  cols="30"
                  rows="2"
                  maxLength="150"
                  value={Userdata.address}
                  onChange={hendleInput}
                ></textarea>
              </Form.Group>
              <div>
                <button className="mt-1 button" size="lg" type="submit">
                  Update User
                </button>
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
            </Form>
          </div>
          <div className="col-md-6 my-auto">
            <img
              className="img-fluid w-100"
              src="/assets/rocket.png"
              alt="user"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
