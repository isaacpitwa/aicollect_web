class UserApi {
  async getUsers() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/authService/clientUsers`, {
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
      throw new Error('Could not process request, try again later');
    }
  }

  async getUserDetails(userid) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/authService/users/${userid}`, {
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
      console.log(data)
      if (data.status === 200) {
        return data.data;
      }
      if (data.status === 401) {
        return "Unauthenticated";
      }
    } catch (error) {
      console.log(error)
      throw new Error('Could not process request, try again later');
    }
  }

  async updateUserDetails(userId, updateDetails) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authService/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ userId, ...updateDetails })
      });
      const data = await response.json();
      if (data.status === 401) {
        return null;
      }
      if (data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(user) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authService/create_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if (data.status === 201) {
        return data.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export const userApi = new UserApi();
