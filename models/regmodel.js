import mongoose from "mongoose";


const RegSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      username:{
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
},
{
    timestamps: true,
    toJSON: {virtuals: true}
}
)

const Reg = mongoose.model("Register",RegSchema)

export default Reg