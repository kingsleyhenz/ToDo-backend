import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    head:{
        type:String,
        required:true
    },
    item:{
        type:String,
        required: true
    },  
    category:{
        type: String,
        required:[true,"A Task Must Have A Category"],
        enum:["Crucial","Important"]
    },
    status :{
        type: String,
        required:[true,"A Task Must Have A Status"],
        enum:["Completed", "Incomplete"]
    },
    startDate:{
        type: Date,
        required:[false,"A Task Must Have A Date"]
    },
    endDate:{
        type: Date,
        required:[false,"A Task Must Have A Date"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reg"
    }
}
)

const Task = mongoose.model("Task",TaskSchema)

export default Task