class Forms {
  async createNewForm(formMeta) {
    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/forms/create`, {
      const response = await fetch(`http://localhost:4000/api/v1/forms/create/newForm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(formMeta)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getFormDetails(formId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROJECTS_URL}/api/v1/forms/${formId}`, {
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const FormsApi = new Forms();