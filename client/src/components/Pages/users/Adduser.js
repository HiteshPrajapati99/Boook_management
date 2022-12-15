import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  firstname: "",
  lastname: "",
  gender: "",
  age: "",
  address: "",
};

export default function Adduser() {
  const naviget = useNavigate();

  const token = localStorage.getItem("x-access-token");

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values, action) => {
      const url = process.env.REACT_APP_API_LINK + "/createuser";

      axios
        .post(url, values, { headers: { "x-access-token": token } })
        .then((res) => {
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
            action.resetForm();
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
    },
  });

  const downkey = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "-"];

  return (
    <div className="slider-data mt-5">
      <div className="container mt-5">
        <div className="row mt-2">
          <div className="col-lg-6 ">
            <h2 className="text-center" style={{ color: "#39bda7" }}>
              Add User
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <input
                  onKeyDown={(e) =>
                    downkey.includes(e.key) && e.preventDefault()
                  }
                  type="text"
                  placeholder="Enter Your Name"
                  className="form-control"
                  id="firstname"
                  maxLength="10"
                  name="firstname"
                  required
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="mt-2">Last Name</Form.Label>
                <input
                  type="text"
                  onKeyDown={(e) =>
                    downkey.includes(e.key) && e.preventDefault()
                  }
                  placeholder="Enter Your Last Name"
                  className="form-control"
                  name="lastname"
                  id="lastname"
                  maxLength="10"
                  required
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="mt-3">Gender</Form.Label>
                <select
                  name="gender"
                  id="Gender"
                  className="form-control"
                  placeholder="Place Select Gender"
                  required
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <optgroup label="Place Select Gender" />
                  <option value="" disabled hidden>
                    Please Select Gender...
                  </option>
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
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                  required
                  id="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label> Address</Form.Label>
                <textarea
                  className="form-control"
                  placeholder="Add Your Address"
                  name="address"
                  id="address"
                  cols="30"
                  rows="2"
                  required
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
              </Form.Group>

              <div>
                <button className="mt-1 button" size="lg" type="submit">
                  Add User
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
          <div className="col-lg-6 my-auto">
            <img
              className="img-fluid w-100"
              src="./assets/rocket.png"
              alt="user"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
