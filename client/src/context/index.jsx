import { callUserAuthApi } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const TaskManagerContext = createContext(null);

function TaskManagerProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const[currentEditedId, setCurrentEditedId] = useState(null);
  const taskFormData = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUserCookie = async () => {
      try {
        setLoading(true);
        const data = await callUserAuthApi();
        if (data?.userInfo) {
          setUser (data.userInfo);
        }
        return data?.success
          ? navigate(
              location.pathname === "/auth" || location.pathname === "/"
                ? "tasks/list"
                : `${location.pathname}`
            )
          : navigate("/auth");
      } catch (error) {
        console.error("Error verifying user:", error);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };
    verifyUserCookie();
  }, [navigate, location.pathname]);

  return (
    <TaskManagerContext.Provider
      value={{
        user,
        setUser,
        taskFormData,
        tasksList,
        setTasksList,
        loading,
        setLoading,
        currentEditedId,
        setCurrentEditedId
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerProvider;
