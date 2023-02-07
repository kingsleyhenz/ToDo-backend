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
        required:[true,"A Task Must Have A Category"]
    },
    status :{
        type: String,
        required:[true,"A Task Must Have A Status"]
    },
    startDate:{
        type: Date,
        required:[false,"A Task Must Have A Date"]
    },
    endDate:{
        type: Date,
        required:[false,"A Task Must Have A Date"]
    }
},
{
    timestamps: true,
    toJSON: {virtuals: true}
}
)

const Task = mongoose.model("Task",TaskSchema)

export default Task