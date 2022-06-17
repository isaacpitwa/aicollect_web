class FieldForms {
    async getAllProjectForms(projectId, clientId) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/forms/getClientForms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
  
    async createNewFieldForm(formMeta) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/fields/create/newField`, {
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
  
    /**
     * @function getFormResponses
     * @desc Responsible for fetching  questionaire Responses
     * @arg {String} formId - Form/questionaire  Id.
     * @returns {array} data-  Returns the collection of reposnes for  the form
     * @author Isaac Pitwa <isaacpitwa256@gmail.com>
     * @version 1.0.0
     */
    async getFormResponses(formId) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_SERVICE_URL}/forms/responses/${formId}`, {
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
  }
  
  export const FieldFormsApi = new FieldForms();