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
            query: { returnUrl: router.asPath }
          });
        }
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

const isBillingRoute = new RegExp(/^\/dashboard\/finance\/.*/g); 
const isDataRoute = new RegExp(/^\/dashboard\/projects\/.*/g); 
const isstandardRoute = new RegExp(/^\/dashboard\/tasks\/.*/g);
const isExternalRoute = new RegExp(/^\/dashboard\/collections\/.*/g);
const allRoutes = new RegExp(/^\.*/g);

const roleRoutes = {
  'Billing Manager': isBillingRoute,
  'Standard User' : isstandardRoute,
  'Data Manager' : isDataRoute,
  'Supervisor' : isDataRoute,
  'Owner' : allRoutes,
  'Admin' :allRoutes,
  'External user':allRoutes,
}

const IndexRedirect = {
  'Billing Manager': '/dashboard/finance',
  'Standard User' : '/dashboard/tasks',
  'Data Manager' : '/dashboard/projects',
  'Supervisor' : '/dashboard/projects',
  'Owner' : '/',
  'Admin' :'/',
  'External user': '/collections/timeout',
}

AuthGuard.propTypes = {
  children: PropTypes.node
};
