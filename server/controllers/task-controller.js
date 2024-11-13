const Joi = require("joi");
const Task = require("../models/task");

// Validation Schemas
const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("todo", "inProgress", "review", "blocked", "done"),
  userId: Joi.string().required(),
  priority: Joi.string().valid("low", "medium", "high"),
});

// Add a new task
const addNewTask = async (req, res) => {
  const { title, description, status, userId, priority } = req.body;

  // Validate input
  const { error } = taskSchema.validate({
    title,
    description,
    status,
    userId,
    priority,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const newlyCreatedTask = await Task.create({
      title,
      description,
      status,
      userId,
      priority,
    });

    if (newlyCreatedTask) {
      return res.status(201).json({
        success: true,
        message: "Task Added Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occurred! Try again",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again ",
    });
  }
};

const getAllTasks = async (req, res) => {
  const { id } = req.params;
  console.log("Request parameters:", req.params);

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "User  ID is required",
    });
  }

  try {
    console.log("User  ID:", id); // Log the user ID for debugging
    const extractAllTasksByUserId = await Task.find({ userId: id });

    console.log("Tasks:", extractAllTasksByUserId); // Log the tasks for debugging

    if (extractAllTasksByUserId.length > 0) {
      return res.status(200).json({
        success: true,
        tasksList: extractAllTasksByUserId,
      });
    } else {
      return res.status(200).json({
        success: true,
        tasksList: [], // Return an empty array if no tasks found
        message: `No tasks found for user ID: ${id}`,
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  // Use the id from req.params directly
  const { title, description, status, priority, userId, _id } =  req.body;
  console.log("Request Body:", req.body);
  console.log("Request Params:", req.params);
  // Validate input
  const { error } = taskSchema.validate({
    title,
    description,
    status,
    priority,
    userId,
  });
  if (error) {
    console.log("Validation Error:", error.details);

    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  if(!_id){
    return res.status(400).json({
      success:false,
      message: "Task Id is required."
    })
  }

  try {
    const updateTask = await Task.findByIdAndUpdate(
      _id , // Pass the id directly here
      {
        title,
        description,
        status,
        priority,
        userId,
      },
      { new: true } // Return the updated document
    );

    if (updateTask) {
      return res.status(200).json({
        success: true,
        message: "Task Updated Successfully",
        task: updateTask, // Optionally include the updated task in the response
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task id is required ",
      });
    }
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (deletedTask) {
          return res.status(200).json({
            success: true,
            message: "Task Deleted Successfully",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Task not found!",
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the task. Please try again.",
        });
      }
};

module.exports = { addNewTask, getAllTasks, updateTask, deleteTask };
