class ClientApi {
    /**
     * Completes Organisation information on INvite
     * @param {Object} organisationDetails 
     * @returns {string} User token
     */

    async register(details) {
        console.log(details);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/clients/register`, {
          method: 'POST',
          'headers': {
            'Content-Type': 'Application/json',
          },
          body: JSON.stringify(details)
        });
        const data = await response.json();
        return data 
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
          const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/clients/decodeToken`, {
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
  