import { Response } from "express";
const sendResponse =(res:Response,data:any={msg:"invalid request"},status=40)=>{
    res.status(status).json({data});
}



export default sendResponse;