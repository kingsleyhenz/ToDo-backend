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

export const filterStatus = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userAuth });
    const incompleteTasks = tasks.filter(task => task.status === 'Incomplete');
    const completedTasks = tasks.filter(task => task.status === 'Completed');
    res.json({
      status: "success",
      data: {
        incompleteTasks,
        completedTasks
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "An error occurred while retrieving tasks"
    });
  }
};

export const filterCategory = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userAuth, category: { $in: ['Crucial', 'Important'] } });
    res.json({
      status: "success",
      data: tasks
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "An error occurred while retrieving tasks"
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