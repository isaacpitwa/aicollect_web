class ProjectsApi {
  async fetchProjects(clientId) {
    try {
      console.log('you pinged me');
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/userProjects`, {
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
