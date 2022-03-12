import toast from 'react-hot-toast';

/** class representing sectors API calls */
class SectorsApi {
  async getSectors() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sectors`, {
        headers: {
          'Content-Type': 'Application/json'
        }
      });
      const data = await response.json();
      if (data && data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createSector(sector) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sectors/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(sector)
      });
      const data = await response.json();
      if (data.status === 201) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getSectorDetails(id) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sectors/${id}`, {
        headers: {
          'Content-Type': 'Application/json'
        }
      });
      const data = await response.json();
      if (data && data.status === 200) {
        return data.data;
      }
    } catch (error) {
      toast.error(error);
    }
  }

  async getSectorModules(sectorId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modules/sectorModules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ sectorId })
      });
      const data = await response.json();
      if (data && data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createSectorModule(sector) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/modules/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(sector)
      });
      const data = await response.json();
      if (data && data.status === 201) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const sectorApi = new SectorsApi();
