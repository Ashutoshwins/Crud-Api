
import { string } from "joi";
import mongoose, { model } from "mongoose";
import IUSER from '../interfaces/user/IUSER';


export const schema = mongoose.Schema;


const studentSchema = new schema<IUSER>({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true

    },
    tech: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})
const studentModel = model('route', studentSchema);
export default studentModel;

