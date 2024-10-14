import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from './utils/db.js'
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicantionRoute from "./routes/application.route.js"
import path from "path";

dotenv.config()

const app=express();
const __dirname=path.resolve();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicantionRoute);


app.use(express.static(path.join(__dirname,"/Frontend/dist")));
app.get("*",(_,res)=>{
    res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"));
});

app.listen(process.env.PORT,()=>{
    dbConnect();
    console.log(`Server is running at port ${process.env.PORT}`);
});