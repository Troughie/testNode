var express = require("express");
var customer = require("../model/customer");
var router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
      destination: (req, file, cb) => {
            cb(null, "./public/images");
      },
      filename: (req, file, cb) => {
            let math = ["image/png", "image/jpg", "image/jpeg"];
            if (math.indexOf(file.mimetype) === -1) {
                  let errmes = "error upload file";
                  return cb(errmes, null);
            }
            cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
});
var upload = multer({
      storage: storage,
});

/* GET home page. */
router.get("/", function (req, res, next) {
      customer.getCustomers((err, rows) => {
            if (err) {
                  return console.log("failure");
            }
            res.render("./customer/index", { customer: rows });
      });
});

router.get("/create", (req, res, next) => {
      res.render("./customer/create");
});

router.post("/create", upload.single("image"), (req, res, next) => {
      const file = req.file;
      req.body.image = file.filename;
      customer.createCustomer(req.body, (err, count) => {
            if (err) {
                  return console.log("fail query");
            }
            res.redirect("/customers");
      });
});

router.get("/edit/:id", (req, res, next) => {
      customer.findCustomer(req.params.id, (err, rows) => {
            if (err) {
                  return console.log("error query");
            }
            console.log({ customer: rows[0].image });
            res.render("./customer/edit", { customer: rows[0] });
      });
});

router.post("/edit/:id", (req, res, next) => {
      const file = req.file;
      req.body.image = file.filename;
      customer.updateCustomer(req.body, req.params.id, (err, rows) => {
            if (err) {
                  return console.log("error query");
            }
            res.redirect("/customers");
      });
});

router.get("/delete/:id", (req, res, next) => {
      customer.deleteCustomer(req.params.id, (err, rows) => {
            if (err) {
                  return console.log("error query");
            }
            res.redirect("/customers");
      });
});

module.exports = router;
