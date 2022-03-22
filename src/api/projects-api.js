class ProjectsApi {
  async fetchProjects() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/projectService/projects`);
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
};

export const projectsApi = new ProjectsApi();
