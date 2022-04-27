class AuthApi {
  /**
   * Authenticates a user (login)
   * @param {string} email
   * @param {string} password 
   * @returns {string} User token
   */
  async login({ email, password }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({ email, password, deviceToken: '8ccedajs743' })
    });
    const data = await response.json();
    if (data && data.status !== 200) {
      throw new Error("Please check your email or password");
    }
    return data.data;
  }

  async userProfile(accessToken) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/check-user`, {
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const user = await response.json();
    if (user && user.status === 200) {
      return user.data;
    }
    return null;
    } catch (error) {
      console.log(error);
    }
  }

  async completeUserProfileAfterEmailInvitation(userDetails) {
    // console.log("DETAILS", userDetails);
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/complete-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({...userDetails})
      });
      const data = await response.json();
      if (data && data.status !== 201) {
        throw new Error("Something went wrong, please try again");
      }
      console.log("DATA", data);
      return data.data
  }

  async createUserProfile(profileDetails) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/profiles/create-profile`, {
        method: 'POST',
        'headers': {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(profileDetails)
      });
      const data = await response.json();
      if (data.status === 201) {
        return data.data
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createUserPassword(userDetails) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/setPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(userDetails)
      });
      const data = await response.json();
      if (data.status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async requestPasswordReset(email) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({email})
      });
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong, could not hit the endpoint');
    }
  }
}

export const authenticationApi = new AuthApi();
