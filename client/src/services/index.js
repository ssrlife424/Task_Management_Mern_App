// import axios from "axios";

// export const callRegisterUserApi = async (formData) => {
//   const response = await axios.post(
//     "http://localhost:5000/api/user/register",
//     formData,
//     { withCredentials: true }
//   );
//   return response?.data;
// };

// export const callLoginUserApi = async (formData) => {
//   const response = await axios.post(
//     "http://localhost:5000/api/user/login",
//     formData,
//     { withCredentials: true }
//   );
//   return response?.data;
// };

// export const callUserAuthApi = async () => {
//   const response = await axios.post(
//     "http://localhost:5000/api/user/auth",
//     {},
//     { withCredentials: true }
//   );
//   console.log(response);
//   return response?.data;
  
// };

// export const callLogoutApi = async (req, res) => {
//   const response = await axios.post(
//     "http://localhost:5000/api/user/logout",
//     {},
//     { withCredentials: true }
//   );
//   return response?.data;
// };

// export const addNewTaskApi = async (formData) => {
//   const response = await axios.post(
//     "http://localhost:5000/api/task/add-new-task",
//     formData
//   );
//   return response?.data;
// };
// export const getAllTasksApi = async (getCurrentUserId) => {
//   const response = await axios.get(
//     `http://localhost:5000/api/task/get-all-tasks-by-userid/${getCurrentUserId}`
//   );

//   return response?.data;
// };
// export const updateTaskApi = async (formData) => {
//   const response = await axios.put(
//     `http://localhost:5000/api/task/update-task`,
//     formData
//   );
//   console.log(response);
//   return response?.data;
  
// };
// export const deleteTaskApi = async (getCurrentTaskId) => {
//   const response = await axios.delete(
//     `http://localhost:5000/api/task/delete-task/${getCurrentTaskId}`
//   );

//   return response?.data;
// };


import axios from "axios";

// Set the base URL for Axios
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Set this globally if needed
});

// Register User
export const callRegisterUserApi = async (formData) => {
  try {
    const response = await api.post("/user/register", formData);
    return response?.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// Login User
export const callLoginUserApi = async (formData) => {
  try {
    const response = await api.post("/user/login", formData);
    return response?.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Authenticate User
export const callUserAuthApi = async () => {
  try {
    const response = await api.post("/user/auth", {});
    return response?.data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

// Logout User
export const callLogoutApi = async () => {
  try {
    const response = await api.post("/user/logout", {});
    return response?.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

// Add New Task
export const addNewTaskApi = async (taskData) => {
  try {
    const response = await api.post("/task/add-new-task", taskData);
    return response?.data;
  } catch (error) {
    console.error("Error adding new task:", error);
    throw error;
  }
};

// Get All Tasks by User ID
export const getAllTasksApi = async (userId) => {
  try {
    const response = await api.get(`/task/get-all-tasks-by-userid/${userId}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Update Task
export const updateTaskApi = async (taskData) => {
  try {
    const response = await api.put("/task/update-task", taskData);
    return response?.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete Task
export const deleteTaskApi = async (taskId) => {
  try {
    const response = await api.delete(`/task/delete-task/${taskId}`);
    return response?.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};