class ProjectsApi {
  async createProject(project) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/projects/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(project)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('something went wrong, please contact support');
    }
  }
  async fetchProjects(clientId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/projects/userProjects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ clientId })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('something went wrong, please contact support');
    }
  }

  async fetchProjectDetails(projectId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/projects/${projectId}`);
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/projects/update`, {
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
