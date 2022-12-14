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
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/user/projects`, {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/projects/${projectId}`, {
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
      if (data?.status) {
        return data
      }
    } catch (error) {
      console.log(error);
    }
  }


  async fetchFieldFormDetails(fieldFormId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/fields/${fieldFormId}`, {
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
      if (data?.status) {
        return data
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

  async removeUser(user) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/projects/deleteUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if (data?.status) {
        return data
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const projectsApi = new ProjectsApi();
