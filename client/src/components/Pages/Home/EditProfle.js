import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function EditProfle() {
  const _id = useParams();

  const naviget = useNavigate();

  const [Profile, setProfile] = useState([]);

  const ProfileData = async () => {
    const url = process.env.REACT_APP_API_LINK + "/profile";
    const token = localStorage.getItem("x-access-token");

    const res = await axios.get(url, { headers: { "x-access-token": token } });
    setProfile(res.data.User);
  };

  useEffect(() => {
    ProfileData();
  }, []);

  const hendleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfile((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const hendlesubmit = (e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_API_LINK + `/profile/edit/${_id}`;
    const token = localStorage.getItem("x-access-token");

    axios
      .put(url, Profile, { headers: { "x-access-token": token } })
      .then((res) => {
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
          setTimeout(() => {
            naviget("/");
          }, 2000);
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
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const downkey = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "+",
    "-",
    "=",
    ".",
    ",",
    "/",
  ];

  return (
    <div className="slider-data mt-5">
      <div className="row mt-5">
        <h2 className="text-center mt-5"> Update Profile</h2>

        <div className="col-md-5 mt-4">
          <Form onSubmit={hendlesubmit}>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <input
                onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
                type="text"
                placeholder="Enter Your Name"
                className="form-control"
                id="name"
                name="name"
                maxLength="25"
                value={Profile.name}
                onChange={hendleInput}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">User Number</Form.Label>
              <input
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
                onInput={(e) => (e.target.value = e.target.value.slice(0, 12))}
                type="number"
                placeholder="Enter Your Number"
                className="form-control"
                name="number"
                id="number"
                value={Profile.number}
                onChange={hendleInput}
              />
            </Form.Group>
            <div>
              <button
                className="mt-3 button"
                size="lg"
                variant="success"
                type="submit"
              >
                Update Profile
              </button>

              <ToastContainer
                theme="colored"
                position="bottom-left"
                autoClose={3000}
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
        <div className="col-md-6">
          <img src="/assets/profile.svg" alt="" width="100%" />
        </div>
      </div>
    </div>
  );
}
