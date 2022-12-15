const express = require("express");
const router = express.Router();
const books = require("../schemas/orderschema");
const upload = require("../middleware/orderimg");
const fs = require("fs");

// add books

router.post("/addbook", upload.single("book"), (req, res) => {
  if (!req.file) {
    res.json({ success: false, message: "Plz Select Book Img!!!" });
  }

  let user = new books();
  user.name = req.body.name;
  user.desc = req.body.desc;
  user.price = req.body.price;
  user.quantity = req.body.quantity;
  user.book = req.file.filename;
  user.bookpath = "http://localhost:8000/" + req.file.path;

  if (
    req.body.name == null ||
    req.body.desc == null ||
    req.body.price == null ||
    req.body.quantity == null
  ) {
    res.status(401).json({ message: "All Fillds are required" });
  } else {
    user.save(function (err) {
      if (err) {
        if (err.errors != null) {
          if (err.errors.name) {
            res.json({ success: false, message: "Plz Enter Name" });
          } else if (err.errors.desc) {
            res.json({ success: false, message: "Plz Enter Description" });
          } else if (err.errors.price) {
            res.json({ success: false, message: "Plz Enter Price" });
          } else if (err.errors.quantity) {
            res.json({ success: false, message: "Plz Enter quantity" });
          }
        } else {
          res.json({ success: false, message: err });
        }
      } else {
        res
          .status(200)
          .json({ success: true, message: "Book Add successfully" });
      }
    });
  }
});

// router.post("/addbook", upload.single("book"), (req, res) => {
//   if (!req.file) {
//     res.json({ success: false, message: "plz selecte Image !!!" });
//   } else {
//     let user = new books();
//     user.name = req.body.name;
//     user.desc = req.body.desc;
//     user.price = req.body.price;
//     user.quantity = req.body.quantity;
//     user.book = req.file.filename;
//     user.bookpath = "http://localhost:8000/" + req.file.path;

//     user.save(function (err) {
//       if (err) {
//         if (err.errors != null) {
//           if (err.errors.name) {
//             res.status(401).json({ message: "Name is required" });
//           } else if (err.errors.desc) {
//             res.status(401).json({ message: "Description is required" });
//           } else if (err.errors.price) {
//             res.status(401).json({ message: "Price is required" });
//           } else if (err.errors.quantity) {
//             res.status(401).json({ massage: "Quantity is required" });
//           } else {
//             res.status(401).json({ success: false, message: err });
//           }
//         }
//       } else {
//         res
//           .status(200)
//           .json({ success: true, message: "Book Added success !!!" });
//       }
//     });
//   }
// });

// get all boks data

router.get("/getbooks", async function (req, res) {
  try {
    const userData = await books.find();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// get book by id

router.get("/books/:id", (req, res) => {
  books.findById(req.params.id, function (err, doc) {
    res.send(doc);
  });
});

// edit book

router.put("/books/:id", upload.single("book"), (req, res) => {
  books.findOne({ id: req.params._id }, function (err, data) {
    if (err) throw err;
    if (!data) {
      res.json({ success: false, message: "place fill all data" });
    }
    if (!req.file) {
      data.name = req.body.name;
      data.desc = req.body.desc;
      data.quantity = req.body.quantity;
      data.price = req.body.price;
      data.save(function (err) {
        if (err) {
          if (err.errors != null) {
            if (err.errors.name) {
              res.json({
                success: false,
                message: "Place Enter  Book Name",
              });
            } else if (err.errors.desc) {
              res.json({ success: false, message: "Place Enter  Description" });
            } else if (err.errors.quantity) {
              res.json({ success: false, message: "Place Enter  Quantity" });
            } else if (err.errors.price) {
              res.json({ success: false, message: "Place Enter Price" });
            }
          } else {
            res.json({ success: false, message: "err" + err });
          }
        } else {
          res
            .status(200)
            .json({ success: true, message: "Successfully updated !" });
        }
      });
    } else {
      fs.unlinkSync(`./uploads/${data.book}`);
      data.name = req.body.name;
      data.desc = req.body.desc;
      data.quantity = req.body.quantity;
      data.price = req.body.price;
      data.book = req.file.filename;
      data.bookpath = "http://localhost:8000/" + req.file.path;
      data.save(function (err) {
        if (err) {
          if (err.errors != null) {
            if (err.errors.name) {
              res.json({
                success: false,
                message: "Place Enter  Book Name",
              });
            } else if (err.errors.desc) {
              res.json({ success: false, message: "Place Enter  Decriprtion" });
            } else if (err.errors.quantity) {
              res.json({ success: false, message: "Place Enter  Quantity" });
            } else if (err.errors.price) {
              res.json({ success: false, message: "Place Enter Price" });
            }
          } else {
            res.json({ success: false, message: "err" + err });
          }
        } else {
          res
            .status(200)
            .json({ success: true, message: "Successfully updated !" });
        }
      });
    }
  });
});

// delet book

router.delete("/books/:id", (req, res) => {
  // console.log(req.params.id);

  books.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (err) return err;
    if (!data) {
      res.json({ success: false, message: "information not found" });
    } else {
      if (fs.existsSync(`./uploads/${data.book}`)) {
        // console.log("found");
        fs.unlinkSync(`./uploads/${data.book}`);
        res.json({ success: true, message: " Book Deleted" });
      } else {
        res.json({ success: true, message: " Book Deleted" });
      }
    }
  });
});

// sheerach api for books

router.get("sherch/book/:key", function (req, res) {
  books.find(
    {
      $and: { name: "key" },
    },
    function (err, data) {
      if (data) {
        res.json("data get success" + data);
      } else {
        res.json("data not Found");
      }
    }
  );
});

module.exports = router;
