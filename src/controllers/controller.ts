import Joi, { string } from 'joi';
import { Request, Response } from "express";
import store from "../storage/storage";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import sendResponse from '../utils/response'
import STATUS_CODES from '../utils/status_code'




//PostStudentDetails...

let newStudent = async function (req: Request, res: Response) {

    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        tech: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    const parmas = schema.validate(req.body, { abortEarly: false });
    if (parmas.error) {
        res.status(403).send(parmas.error)
        return
    }
    let userInput = req.body;
    userInput.password = await bcrypt.hash(userInput.password, 10);
    const student = new store({
        name: userInput.name,
        age: userInput.age,
        tech: userInput.tech,
        email: userInput.email,
        password: userInput.password,

    })

    student.save()
    res.status(200).send({ messege: "user created", id: student._id });
}

//GetByName...

let StudentByName = async (req: Request, res: Response) => {
    try {
        const student = await store.findOne({ name: req.params.name })
        if (!req.params.name) {
            return res.send()

        }
        // student.save()
        res.status(200).send({ data: student });
    } catch (e) {
        res.status(404).send(e)

    }

}

//GetAllStudentDetails...

let allStudentDetails = async (req: Request, res: Response) => {
    const students = await store.find({})
    // console.log(students)
    res.status(200).send({ Data: students });

}

//GetStudentDetailsById...

let StudentDetailsById = async (req: Request, res: Response) => {
    try {
        const studentsById = await store.findById(req.params.id)
        if (!req.params.id) {
            return res.status(404).send();
        }

        res.send(studentsById);


    } catch (e) {
        res.status(404).send(e)
    }
}

//deleteStudentDetails...

let deleteStudentDetails = async (req: Request, res: Response) => {
    try {
        const deleteStudent = await store.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            return res.status(404).send();
        }
        res.send(deleteStudent);
    } catch (e) {
        res.status(400).send(e);
    }

}

//updateStudentDetails...


let updateStudentDetails = async (req: Request, res: Response) => {
    try {
        const UpdateStudent = await store.findByIdAndUpdate(req.params.id, req.body)

        res.send(UpdateStudent);
    } catch (e) {
        res.status(400).send(e);
    }

}

let loginUser = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const studentlogin:any= await store.findOne({ email: email})
        // res.send(studentlogin)
        const comparePassword = await bcrypt.compare(password,studentlogin.password)
        if (comparePassword === true) {
            const token = jwt.sign({_id:"6278e7be7dc36e5be56dcffd" },"qwertyuioplkjhgfdaszxcvghbnjhyui")

            return sendResponse(res,{msg:"login succes",token:token},STATUS_CODES.OK)



        }
        else {
            return sendResponse(res,{msg:"invalid Credentials",},STATUS_CODES.UN_AUTHORIZED)
        
        }
    } catch (e) {
        return sendResponse(res,{msg:"User not found",},STATUS_CODES.NOT_FOUND)

        res.status(400).send(e)
    }
}


export const UserController = {
    newStudent,
    StudentByName,
    allStudentDetails,
    StudentDetailsById,
    deleteStudentDetails,
    updateStudentDetails,
    loginUser,
    


}
function async(password: any) {
    throw new Error('Function not implemented.');
}



