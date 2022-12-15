import { useState, useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// for pagination

// import { Stack, Pagination } from "@mui/material";

// provider

// import { useUserProvider } from "../context/userprovider";

export default function Bookspage() {
  // const { book } = useUserProvider();
  // console.log(book);

  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  // const [page, setPage] = useState(1);

  async function getdata() {
    // default url
    const url = process.env.REACT_APP_API_LINK + "/getbooks";

    // pagination url
    // const url = `http://localhost:8000/getbooks?_page=${page}`;
    const token = localStorage.getItem("x-access-token");

    const res = await axios.get(url, { headers: { "x-access-token": token } });
    setBooks(res.data);
  }

  useEffect(() => {
    getdata();
  }, []);

  // modal data
  const [show, setShow] = useState(false);
  const [modaltitle, setmodaltitle] = useState("");
  const handleClose = () => setShow(false);

  // delet funtion

  const handledelet = (_id) => {
    // const url = `http://localhost:8000/books/${_id}`;

    const url = process.env.REACT_APP_API_LINK + `/books/${_id}`;

    const token = localStorage.getItem("x-access-token");
    axios
      .delete(url, { headers: { "x-access-token": token } })
      .then(function (res) {
        if (res.data.success) {
          toast.success(res.data.message, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setShow(false);
          setTimeout(() => {
            getdata();
          }, 800);
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

  const searchhendle = async (event) => {
    const typedata = event.target.value;
    const url = process.env.REACT_APP_API_LINK + `/sherch/book/${typedata}`;

    if (typedata) {
      const res = await axios.get(url);
      if (res.data.success) {
        setBooks(res.data.info);
      } else {
        getdata();
      }
    } else {
      getdata();
    }
  };

  return (
    <div className="slider-data mt-5">
      <div>
        {books.length !== 0 ? (
          <div className="row w-100 mt-4">
            <h2 className="text-center mt-3" style={{ color: "#39bda7" }}>
              Your Books
            </h2>
            <button
              className="button"
              onClick={() => navigate("/create_books")}
            >
              Add New Book
            </button>

            <div>
              <input
                type="text"
                placeholder="Search Books...."
                className="mt-3 form-control"
                onChange={searchhendle}
              />
            </div>

            {books.map((curElm, _id) => {
              return (
                <div key={curElm._id} className="col-lg-3 col-sm-5">
                  <Card className="shadow-lg mt-3 " style={{ width: "18rem" }}>
                    <Card.Img
                      className="card-img-top"
                      src={curElm.bookpath}
                      width="200"
                      height="200"
                    />
                    <Card.Body>
                      <Card.Title> Book Name : {curElm.name} </Card.Title>
                      <Card.Text> About Book : {curElm.desc} </Card.Text>
                      <Card.Text> Book quantity : {curElm.quantity} </Card.Text>
                      <Card.Text> Price : {curElm.price} </Card.Text>
                      <div className="d-flex" style={{ gap: "0.5rem" }}>
                        <button
                          className="button"
                          onClick={() => navigate(`/books_edit/${curElm._id}`)}
                        >
                          Edit
                        </button>
                        <div>
                          <button
                            className="button"
                            onClick={() => {
                              setmodaltitle(curElm.name);
                              setShow(true);
                            }}
                          >
                            Delete
                          </button>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>{modaltitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete Book ?
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
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div
              className="align-items-center "
              style={{
                marginTop: "12rem",
                paddingLeft: "12rem",
              }}
            >
              <h1>No Books are Available</h1>
              <h2>Place Create Book First</h2>
              <div className="d-grid">
                <button
                  className="button"
                  onClick={() => navigate("/create_books")}
                >
                  Add Books
                </button>
              </div>
            </div>
          </>
        )}

        {/* 
      <div style={{ float: "right" }}>
        <Stack spacing={1}>
          <Pagination
            count={3}
            // page={page}
            showFirstButton={true}
            color={"primary"}
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </Stack>
      </div> */}
      </div>
    </div>
  );
}
