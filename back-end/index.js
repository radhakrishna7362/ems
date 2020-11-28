const express=require('express');
const cors = require("cors");
const mongoose=require('mongoose');
const bodyparser=require("body-parser");
const port=4000;
const app = express();

mongoose
.connect("mongodb+srv://rk:190031187@first.cpozf.mongodb.net/ems?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTION SUCCESSFUL"));

const EmployeeRoute=require('./routes/employeeRoute');
const UserRoute=require('./routes/userRoute');

app.use(cors());
app.use(bodyparser.json());  
app.use("/employees", EmployeeRoute);
app.use('/user',UserRoute);

app.listen(port, () => console.log("Running on port 4000"));