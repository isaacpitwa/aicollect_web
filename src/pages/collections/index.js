import { AccountBillingSettings } from '../../components/dashboard/account/account-billing-settings'; 
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { AuthGuard } from '../../components/authentication/auth-guard';
import {useAuth} from '../../hooks/use-auth'; 
function AccountBilling(props) {
    const { user } = useAuth();
    return <AccountBillingSettings user={user} />;
  }
  AccountBilling.getLayout = (page) => (
    <AuthGuard>
      <DashboardLayout>
        {page}
      </DashboardLayout>
    </AuthGuard>
  );
export default AccountBilling