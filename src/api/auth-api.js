class AuthApi {
  /**
   * Authenticates a user (login)
   * @param {string} email
   * @param {string} password 
   * @returns {string} User token
   */
  async login({ email, password }) {
    const response = await fetch('http://localhost:5000/api/v1/authService/login', {
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
    const response = await fetch('http://localhost:5000/api/v1/authService/check-user', {
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const user = await response.json();
    return user.data;
  }
}

export const authenticationApi = new AuthApi();
