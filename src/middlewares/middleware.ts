import jwt from 'jsonwebtoken'
import sendResponse from '../utils/response'
import STATUS_CODES from '../utils/status_code'




const auth = async (req, res, next) => {
    try {
        const tokenString = req.headers.authorization
        
        let token = tokenString.replace('Bearer ', "") 
        // console.log(token)
        let secretkey = process.env.SECRET_KEY
        // console.log('secret',secretkey)
        const verifyUser: any = jwt.verify(token,secretkey)
        console.log(verifyUser)
        if(verifyUser){
            req.userId = verifyUser._id

            return sendResponse(res, { msg: "User Authorized", verifyUser: verifyUser }, STATUS_CODES.OK)
        }else{
            return sendResponse(res, { msg: "User Unauthorized" }, STATUS_CODES.UN_AUTHORIZED)
        }
        next();
      
    } catch (e) {
        return sendResponse(res, { msg: "User Unauthorized" }, STATUS_CODES.UN_AUTHORIZED)
    }
}
export default auth;

