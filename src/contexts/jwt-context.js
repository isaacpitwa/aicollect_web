import { createContext, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { authApi } from '../__fake-api__/auth-api';
import { authenticationApi } from '../api/auth-api';
import {IndexRedirect} from '../components/authentication/auth-guard';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state);

export const AuthContext = createContext({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
          const user = await authenticationApi.userProfile(accessToken);
          console.log('User DATA: \n', user);
          if (user.firstname) {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user
              }
            });
            router.push(IndexRedirect[user.roles]);
          } else {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: false,
                user: null
              }
            });
          }
          
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const accessToken = await authenticationApi.login({ email, password });
    const user = await authenticationApi.userProfile(accessToken);
    localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
    // const returnUrl = router.query.returnUrl || IndexRedirect[user.roles];
    // router.push(returnUrl);
    return user;
  };


  const logout = async () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email, name, password) => {
    const accessToken = await authApi.register({ email, name, password });
    const user = await authApi.me(accessToken);

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const authenticateAfterEmailVerify = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const user = await authenticationApi.userProfile(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });

  };

  const completeUserProfile = async (userDetails) => {
    // console.log(userDetails);
    const accessToken = await authenticationApi.completeUserProfileAfterEmailInvitation(userDetails);
    // const user = authenticationApi.userProfile;
    if (accessToken) {
      // localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: 'COMPLETE_PROFILE',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        logout,
        register,
        authenticateAfterEmailVerify,
        completeUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
