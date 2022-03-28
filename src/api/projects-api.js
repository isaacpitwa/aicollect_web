class ProjectsApi {
  async fetchProjects(clientId) {
    try {
      console.log('you pinged me');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/projectService/userProjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({ clientId })
      });
      const data = await response.json();
      if (data && data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchProjectDetails(projectId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/projectService/projects/${projectId}`);
      const data = await response.json();
      if (data?.status === 200) {
        return data.data
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProject(projectDetails) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/projectService/projects/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(projectDetails)
      });
      const data = await response.json();
      if (data?.status === 200) {
        return data.data
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const projectsApi = new ProjectsApi();
