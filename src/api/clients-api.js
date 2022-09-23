class ClientApi {
    /**
     * Completes Organisation information on INvite
     * @param {Object} organisationDetails 
     * @returns {string} User token
     */

    async register(details) {
        console.log(details);
      try {
        const response = await fetch(`http://localhost:5000/clients/register`, {
          method: 'POST',
          'headers': {
            'Content-Type': 'Application/json',
          },
          body: JSON.stringify(details)
        });
        const data = await response.json();
        if (data.status === 201) {
          return data.data
        }
      } catch (error) {
        console.log(error);
      }
    }
  
  

  }
  
  export const clientsApi = new ClientApi();
  