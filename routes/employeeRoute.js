const express=require('express');

const EmployeeRoute = express.Router();

const employee = require('../model/employee');

EmployeeRoute.route("/:userid").get((req,res)=>{
    employee.find({userid:req.params.userid},(err,emp)=>{
        if (err) console.log(err);
        else {
        res.json(emp);
        }
    })
})

EmployeeRoute.route("/employee/:id").get((req,res)=>{
  employee.findById(req.params.id,(err,emp)=>{
        if (err) console.log(err);
        else {
        res.json(emp);
        }
  })
})

EmployeeRoute.route("/add").post((req, res) => {
    let emp = new employee(req.body);
    employee.find({id:emp.id},(err,e)=>{
      if(e.length!=0){
        return res.status(409).send('Already Employee Exists');
      }
      else if(err){
        console.log(err);
      }
      else{
        emp
          .save()
          .then((data) => {
            return res.status(200).json(data);
          })
          .catch((err) => {
            return res.status(400).send("Failed to Create");
          });
      }
    })
});

EmployeeRoute.route("/edit/:id").patch((req, res) => {
    employee.findById(req.params.id,(err,data)=>{
        if (err) console.log(err);
        else {
        data.userid=req.body.userid;
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



EmployeeRoute.route("/delete/:id").delete((req, res) => {
    employee.findByIdAndRemove({ _id: req.params.id }, (err, emp) => {
      if (err) res.json(err);
      else {
        res.json("Removed Successfully");
      }
    });
});


module.exports=EmployeeRoute;