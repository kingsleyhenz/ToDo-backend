import Reg from "../models/regmodel.js";
import Task from "../models/todomodel.js";


export const addTask = async (req, res) => {
  const {head, item, category, status, startDate, endDate} = req.body;
  try{
      const foundTask = await Task.findOne({item})
      if(!foundTask){
          const task = await Task.create({
            head,
            item,
            category,
            status,
            startDate,
            endDate,
            user: req.userAuth
          })
          res.json({
              status: "success",
              data: task
          })
      }else{
          res.json({
              status: "error",
              message: "Task Already exists"
          })
        }
  }catch(error){
    console.log(error);
      res.json({
          status: error,
          message: "An error occured"
      })
  }
} 


export const allTasks = async (req, res) => {
  try {
    console.log(req.userAuth)
    const tasks = await Task.find({user: req.userAuth});
    res.json({
      status: "success",
      data: tasks
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "An error occured while retrieving tasks"
    });
  }
};


export const updateTask = async(req, res) => {
  try{
      await Task.findByIdAndUpdate(req.params.id, {
          $set: {
              head: req.body.head,
              item: req.body.item,
              status:req.body.status,
              endDate: req.body.endDate
          }
      },{
          new: true
      })

      res.json({
          status: "success",
          data: "Updated Successfully"
      })
  }catch(error){
      res.json({
          status: "error",
          message: "An error occured"
      })
  }
}

export const completeTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.json({
        status: "error",
        message: "Task not found",
      });
    }
    if (task.status === "Completed") {
      return res.json({
        status: "error",
        message: "Task is already completed",
      });
    }
    task.status = "Completed";
    await task.save();
    return res.json({
      status: "success",
      message: "Task completed successfully",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};


export const deleteTask = async(req, res) => {
  try{
     await Task.findByIdAndDelete(req.params.id)
     res.json({
         status: "success",
         message: "Deleted Successfully"
     })
  }catch(error){
     res.json({
         status: "error",
         message: "An error occured"
     })
  }
}