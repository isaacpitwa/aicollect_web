class Forms {
  async getAllProjectForms(projectId, clientId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/forms/getClientForms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({ projectId, clientId })
      });

      const data = await response.json();
      if (data.status === 200) {
        return data.data;
      }
    } catch (err) {
      console.error(err);
    }
  }
  async getModuleForms(projectId, clientId, module) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/forms/getModuleForms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ projectId, clientId, module })
      });

      const data = await response.json();
      console.log('questionaires', data);
      if (data) {
        console.log('Data from questionaires response', data);
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async createNewForm(formMeta) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/forms/create/newForm`, {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/forms/${formId}`, {
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
      if (data && data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async addFieldsToNewForm(formData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/forms/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data && data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log('failed to get form \n', error);
    }
  }
}

export const FormsApi = new Forms();