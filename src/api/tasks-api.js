class TasksApi {
  async createTask(taskObject) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/tasks/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(taskObject)
      });

      const data = await response.json();
      if (data && data.status === 201) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProjectTasks(projectId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/tasks/project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({projectId})
      });
      const data = await response.json();
      if (data && data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(data);
    }
  }

  async getTaskDetails(taskId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/tasks/${taskId}`, {
        headers: {
          'Content-Type': 'Application/json'
        }
      });
      const data = await response.json();
      if (data && data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(data);
    }
  }
};

export const tasksApi = new TasksApi();
