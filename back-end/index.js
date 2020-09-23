const express=require('express');
const cors = require("cors");
const mongoose=require('mongoose');
const bodyparser=require("body-parser");

const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyparser.json());

const employee = require('./model/employee');

mongoose
  .connect("mongodb+srv://rk:190031187@first.cpozf.mongodb.net/ems?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTION SUCCESSFUL"));


router.route("/employees").get((req,res)=>{
    employee.find((err,emp)=>{
        if (err) console.log(err);
        else {
        res.json(emp);
        }
    })
})

router.route("/employees/:id").get((req,res)=>{
  employee.findById(req.params.id,(err,emp)=>{
        if (err) console.log(err);
        else {
        res.json(emp);
        }
  })
})

router.route("/employees/add").post((req, res) => {
    let emp = new employee(req.body);
    console.log(emp)
    emp
        .save()
        .then((data) => {
        res.status(200).json(data);
        })
        .catch((err) => {
        res.status(400).send("Failed to Create");
        });
});

router.route("/employees/edit/:id").patch((req, res) => {
    employee.findById(req.params.id,(err,data)=>{
        if (err) console.log(err);
        else {
        data.id=req.body.id;
        data.fname=req.body.fname;
        data.lname=req.body.lname;
        data.email=req.body.email;
        data.phone=req.body.phone;
        data.exper=req.body.exper;
        data.edu=req.body.edu;
        data.ss=req.body.ss;
        data
          .save()
          .then((data) => {
            res.json("Edit Done");
          })
          .catch((err) => res.status(400).send("failed"));
        }
  });
});



router.route("/employees/delete/:id").delete((req, res) => {
    employee.findByIdAndRemove({ _id: req.params.id }, (err, emp) => {
      if (err) res.json(err);
      else {
        res.json("Removed Successfully");
      }
    });
});

app.use("/", router);

app.listen(4000, () => console.log("Running on port 4000"));