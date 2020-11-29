const express=require('express');
const cors = require("cors");
const mongoose=require('mongoose');
const bodyparser=require("body-parser");
const compression=require('compression');
const dotenv=require('dotenv');
const helmet=require('helmet');
const path=require('path');
const port= process.env.PORT || 4000;
dotenv.config({path:"./config.env"});
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

app.use(compression());
app.use(express.static(process.cwd() + "/ems/dist/ems"));
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", "https:", "http:", "data:", "ws:"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", "https:", "http:", "data:"],
        scriptSrc: ["'self'", "https:", "http:", "blob:"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
      },
    })
);
app.use(cors());
app.use(bodyparser.json());  
app.use("/employees", EmployeeRoute);
app.use('/user',UserRoute);

app.get("*", (req, res) => { 
  res.sendFile(path.resolve(process.cwd() + "/ems/dist/ems/index.html"));
});

app.listen(port, () => console.log("Running on port 4000"));