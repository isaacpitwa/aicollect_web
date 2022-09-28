import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/use-auth';

export const AuthGuard = (props) => {
  const { children } = props;
  const auth = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
      if (!router.isReady) {
        return;
      }
      if (!auth.isAuthenticated) {
        router.push({
          pathname: '/',
          query: { returnUrl: router.asPath }
        });
      } else {
        if(!roleRoutes[auth.user.roles].test(router.asPath)){
          console.log(`User of Roles ${auth.user.roles}: cannot access Route ${router.asPath}`);
          router.push({
            pathname: IndexRedirect[auth.user.roles],
            // query: { returnUrl: router.asPath }
          });
        }
        console.log(`User of Roles ${auth.user.roles}: cannot access Route ${router.asPath}`);
        setChecked(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};


const allRoutes = new RegExp(/^\.*/g);
const accountRoute = new RegExp(/^\/dashboard\/account\.*/g);
const createPasswordRoute = new RegExp(/^\/createPassword\.*/g);
const createProfileRoute = new RegExp(/^\/createProfile\.*/g);

const sharedRoutes = new RegExp(accountRoute.source + '|' + createPasswordRoute.source + '|' + createProfileRoute.source);
const isBillingRoute = new RegExp(/^\/dashboard\/finance\/billing\.*/g); 
const isDataRoute = new RegExp(/^\/dashboard\/projects\.*/g); 
const isstandardRoute = new RegExp(/^\/dashboard\/tasks\.*/g);
const isExternalRoute = new RegExp(/^\/dashboard\/collections\.*/g);

export const roleRoutes = {
  'system_Billing Manager': new RegExp(sharedRoutes.source + '|' + isBillingRoute.source),
  'system_Standard User' : new RegExp(sharedRoutes.source + '|' + isstandardRoute.source),
  'system_Data Manager' : new RegExp(sharedRoutes.source + '|' + isDataRoute.source),
  'system_Supervisor' :  new RegExp(sharedRoutes.source + '|' + isDataRoute.source),
  'system_Owner' : allRoutes,
  'system_Admin' :allRoutes,
  'system_External user':isExternalRoute,
}

export const IndexRedirect = {
  'system_Billing Manager': '/dashboard/finance/billing',
  'system_Standard User' : '/dashboard/tasks',
  'system_Data Manager' : '/dashboard/projects',
  'system_Supervisor' : '/dashboard/projects',
  'system_Owner' : '/dashboard',
  'system_Admin' :'/dashboard',
  'system_External user': '/collections/timeout',
}

AuthGuard.propTypes = {
  children: PropTypes.node
};
