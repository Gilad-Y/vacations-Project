//import
import mysql from "mysql";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config";
import ErrorHandler from "./MiddleWare/route-not-found";
import userRouter from "./Routes/userRouter";
import vacationRouter from "./Routes/vacationRouter";
//create server
const server = express();

//cors = cross origin resource sharing...
server.use(cors());
//OUR MIDDLE WARE

//how we send the data back (JSON,XML,RAW,string)
server.use(express.json());

//where i  will save my files from upload
server.use(express.static("upload"));
server.use("/upload", express.static("upload"));
//enable file uploading, and create a path for the files if it not exists
server.use(fileUpload({ createParentPath: true }));

//using routes => localhost:4000/api/v1/test/checkOK
server.use("/api/v1/user", userRouter);
server.use("/api/v1/vacation", vacationRouter);
//handle errors(Route Not Found);
server.use("*", ErrorHandler);

//start the server
server.listen(config.webPort, () => {
  console.log(`listing on http://localhost:${config.webPort}`);
  console.log(
    `for testing use the path http://localhost:${config.webPort}/api/v1/test/checkOK`
  );
  console.log(
    `for testing use the path http://localhost:${config.webPort}/api/v1/test/checkBad`
  );
});
