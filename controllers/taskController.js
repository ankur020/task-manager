import Task from "../models/taskModel.js";

//Add Task
export const addTask = async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    return res.status(400).send("All fields are required");
  }
  try {
    const newTask = new Task({
      title,
      description,
      status,
    });
    await newTask.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//Get All tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send({
      success: true,
      totalCount: tasks.length,
      message: "All Products!",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error while fetching all products",
      error,
    });
  }
};

//Get Tasks by id
export const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//Update Task
export const editTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
      },
      { new: true }
    );
    await task.save();
    res.status(200).send({
      success: true,
      message: "Task Updated Successfully!!",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//Delete Task
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Unable to delete Product",
      error,
    });
  }
};
