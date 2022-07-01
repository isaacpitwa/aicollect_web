class UserApi {
  async getUsers() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/clientUsers`, {
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
      console.log('CLIENTS RESPONSE ', data);
      if (data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log('GET USERS ERROR: ', error);
      throw new Error('Could not process request, try again later');
    }
  }

  async getUserDetails(userid) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users/${userid}`, {
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/update`, {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/create_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Issues', error);
    }
  }

  async inviteUserByEmail(user) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/create_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if (data) {
        return data
      }
    } catch (error) {
      console.log('user error \n', error);
    }
  }

  async deleteUser(userid) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/delete-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({id: userid})
      });
      const data = await response.json();
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
}

export const userApi = new UserApi();
