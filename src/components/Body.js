import Login from './Login';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Browse from './Browse';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const AuthWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in — dispatch user info and redirect to /browse ONLY if on login page
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        if (location.pathname === '/') {
          navigate('/browse');
        }
      } else {
        // User is logged out — clear user and redirect to login ONLY if NOT already there
        dispatch(removeUser());
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    });
    return () => unsubscribe();
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Outlet />;
};

const appRouter = createBrowserRouter([
  {
    element: <AuthWrapper />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/browse',
        element: <Browse />,
      },
    ],
  },
]);

const Body = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
