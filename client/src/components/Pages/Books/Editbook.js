import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Editbook() {
  const { _id } = useParams();
  //   console.log(_id);
  const naviget = useNavigate();

  const [previewimg, setPreviewimg] = useState("");

  const [img, setimg] = useState("");

  const [BookData, setBookData] = useState([]);
  //   console.log("this is book", BookData);

  useEffect(() => {
    getdata();
  }, []);

  function getdata() {
    const url = process.env.REACT_APP_API_LINK + `/books/${_id}`;
    const token = localStorage.getItem("x-access-token");

    axios
      .get(url, { headers: { "x-access-token": token } })
      .then(function (res) {
        setBookData(res.data);
      });
  }

  const hendleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBookData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    // send  data to api img and form data using apppend
    var filedata = new FormData();

    filedata.append("book", img);
    filedata.append("name", BookData.name);
    filedata.append("price", BookData.price);
    filedata.append("desc", BookData.desc);
    filedata.append("quantity", BookData.quantity);

    const token = localStorage.getItem("x-access-token");
    const url = process.env.REACT_APP_API_LINK + `/books/${_id}`;

    axios
      .put(url, filedata, {
        headers: { "x-access-token": token },
      })
      .then(function (res) {
        if (res.data.success) {
          // tost notificationss....
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
            naviget("/books");
          }, 1000);
        } else {
          // tost notificationss....

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
    "-",
    "/",
    "+",
    "=",
  ];

  return (
    <div className="slider-data mt-5">
      <div className="row mt-5">
        <div className="col-lg-6">
          <h2 className="mb-3" style={{ color: "#39bda7" }}>
            Update Book Here
          </h2>
          <Form onSubmit={handlesubmit}>
            <Form.Group>
              <Form.Label> Product Name </Form.Label>
              <input
                onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
                type="text"
                name="name"
                className="form-control"
                maxLength="25"
                placeholder="Enter Product Name"
                value={BookData.name}
                onChange={hendleInput}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Product Price </Form.Label>
              <Form.Control
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
                onInput={(e) => (e.target.value = e.target.value.slice(0, 5))}
                type="number"
                name="price"
                placeholder="Enter Product Price"
                value={BookData.price}
                onChange={hendleInput}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Product Quantity </Form.Label>
              <Form.Control
                onInput={(e) => (e.target.value = e.target.value.slice(0, 5))}
                type="number"
                name="quantity"
                placeholder="Enter Product Quantity"
                value={BookData.quantity}
                onChange={hendleInput}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Description</Form.Label>
              <textarea
                placeholder="Write Some Data About Your Book"
                name="desc"
                className="form-control"
                id="desc"
                cols="30"
                rows="3"
                value={BookData.desc}
                onChange={hendleInput}
              />
            </Form.Group>
            <div className="d-flex">
              <Form.Group className="mt-2">
                <Form.Label>Product Img</Form.Label>
                Hitesh
                <input
                  name="book"
                  accept="image/*"
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    let reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setimg(e.target.files[0]);
                        setPreviewimg(reader.result);
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }}
                />
              </Form.Group>
            </div>
            <div>
              <button type="submit" className="button mt-3">
                Update Book
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
        </div>
        <div className="col-lg-6">
          <img
            className="mt-3"
            src={previewimg ? previewimg : BookData.bookpath}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}
