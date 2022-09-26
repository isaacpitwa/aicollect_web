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
  
        /**
     * Decodes Token of  Organisation from  Invite
     * @param {Object} token  
     * @returns {Object}  Organisation Email/more Details
     */

    async getClient(token) {
        try {
          const response = await fetch(`http://localhost:5000/clients/decodeToken`, {
            method: 'POST',
            'headers': {
              'Content-Type': 'Application/json',
            },
            body: JSON.stringify({token})
          });
          const data = await response.json();
          if (data.status === 200) {
            console.log("Token Decoded",data.data);
            return data.data
          }
        } catch (error) {
          console.log(error);
        }
      }
  

  }
  
  export const clientsApi = new ClientApi();
  