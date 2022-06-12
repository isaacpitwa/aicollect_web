import { AccountBillingSettings } from '../../../components/dashboard/account/account-billing-settings';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import {useAuth} from '../../../hooks/use-auth'; 
import { Container } from '@mui/material';
function AccountBilling(props) {
    const { user } = useAuth();
    return <Container sx={{
      flexGrow: 1,
      py: 4,
      px: 3
    }}><AccountBillingSettings user={user} /></Container>;
  }
  AccountBilling.getLayout = (page) => (
    <AuthGuard>
      <DashboardLayout>
        {page}
      </DashboardLayout>
    </AuthGuard>
  );
export default AccountBilling