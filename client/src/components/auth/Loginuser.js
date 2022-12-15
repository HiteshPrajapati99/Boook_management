import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { loginschema } from "./schemas";
import axios from "axios";
import styled from "styled-components";

const Loginuser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    if (token) {
      navigate("/");
    }
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginschema,
      onSubmit: (values) => {
        // const url = "http://localhost:8000/login";
        const url = process.env.REACT_APP_API_LINK + "/login";

        axios.post(url, values).then((res) => {
          if (res.data.success) {
            // token set for go to protected page

            localStorage.setItem("x-access-token", res.data.token);

            // tost notificationss....
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 1700,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate("/books");
            }, 1700);
          } else {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      },
    });

  const [show, setshow] = useState(false);

  const showpassword = () => {
    setshow(!show);
  };

  return (
    <>
      {/* <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 mt-4">
            <h2 className="text-center">Login User</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="mt-3">Email </Form.Label>
                <input
                  type="email"
                  placeholder="Enter your  Email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  <p className="err-p">
                    {errors.email && touched.email ? errors.email : null}
                  </p>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="mt-3">Password</Form.Label>

                <input
                  className="form-control"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                {
                  <p
                    style={{
                      color: "red",
                      marginBottom: "1px",
                      marginTop: "1px",
                    }}
                  >
                    {errors.password && touched.password
                      ? errors.password
                      : null}
                  </p>
                }

                <Form.Group className="mt-1" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Click Here to view Password"
                    onClick={showpassword}
                  />
                </Form.Group>
              </Form.Group>
              <div className="notify">
                <button
                  className="mt-4 button"
                  size="lg"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </button>

                <ToastContainer
                  theme="colored"
                  position="top-center"
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
            <div className="register" style={{ float: "right" }}>
              <span>
                <p> Don't have an account? </p>
                <NavLink
                  style={{ color: "rebeccapurple" }}
                  onClick={() => navigate("/register")}
                >
                  Register Here
                </NavLink>
              </span>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <img className="w-100" src="./assets/rocket.png" alt="Logo.." />
          </div>
        </div>
      </div> */}

      <Wraper>
        <div className="d-flex">
          <div className="col-lg-6">
            <div className="form-content">
              <div className="text-center">
                <h4 className="">Login</h4>
              </div>
              <form onSubmit={handleSubmit}>
                <p className="mt-1 text-center text-muted">
                  Please Login Your Account
                </p>
                <div className="form-group mb-4 mt-5">
                  <label className="form-lable"> Email </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {
                    <p className="err-p">
                      {errors.email && touched.email ? errors.email : null}
                    </p>
                  }
                </div>
                <div className="form-group  mb-4">
                  <label className="form-lable"> Password </label>
                  <input
                    className="form-control"
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    id="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  {values.password.length > 0 ? (
                    <Form.Group className="mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Click Here to view Password"
                        onClick={showpassword}
                      />
                    </Form.Group>
                  ) : (
                    ""
                  )}

                  {
                    <p
                      style={{
                        color: "red",
                      }}
                    >
                      {errors.password && touched.password
                        ? errors.password
                        : null}
                    </p>
                  }
                </div>

                <div className="text-center  mt-3 p-b1">
                  <button className="button shadow px-5" type="submit">
                    Login
                  </button>
                  <ToastContainer
                    theme="colored"
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  <NavLink className="text-muted mt-3">
                    Forgot Password ?
                  </NavLink>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-6  ">
            <div className="bg-image">
              <div className="d-flex  flex-column align-items-center  image-content">
                <h1 className="text-white mt-5 "> WELCOME! </h1>
                <h5 className="text-white">
                  Enter Your Details and start journey with us !
                </h5>
                <button
                  className="button shadow border-0"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wraper>
    </>
  );
};

export default Loginuser;

const Wraper = styled.section`
  // Login form
  .form-content {
    padding: 8rem 8rem;
  }
  // Image part
  .bg-image {
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    background-image: url("https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80");
    .image-content {
      transform: translate(-50%, -50%);
      top: 50%;
      position: relative;
      left: 50%;
    }
  }

  @media only screen and (max-width: 762px) {
    .bg-image {
      display: none;
    }
  }
`;
