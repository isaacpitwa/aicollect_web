class BillingPlanApi {
  async getBillingPlans() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_AUTH_URL}/billingplans`, {
        headers: {
          'Content-Type': 'Application/json'
        }
      });
      const data = await response.json();
      if (data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const billingPlanApi = new BillingPlanApi();
