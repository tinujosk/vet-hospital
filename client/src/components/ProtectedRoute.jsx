import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';

// Role Based Access (RBAC)
const hasPermission = (path, role) => {
  console.log({ path }, { role });
  const permissions = {
    admin: ['/admin', '/patients'],
    doctor: ['/', '/patients'],
    nurse: ['/nursing', '/patients'],
    lab: ['/lab', '/patients'],
    pharmacist: ['/pharmacy', '/patients'],
  };
  if (role && permissions[role]) {
    return permissions[role].includes(path);
  }
  return false;
};

const checkJWTValidity = () => {};
// const dispatch = useDispatch();
// const location = useLocation();
// const navigate = useNavigate();

// useEffect(() => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000;

//       if (decodedToken.exp < currentTime) {
//         // Token is expired, log out
//         dispatch(clearUserData());
//         localStorage.removeItem('token');
//         // navigate('/login');
//       } else {
//         // Token is valid, set user data in Redux
//         dispatch(
//           setUserData({
//             userId: decodedToken.userId,
//             email: decodedToken.email,
//             role: decodedToken.role,
//           })
//         );
//       }
//     } catch (error) {
//       // Invalid token
//       dispatch(clearUserData());
//       localStorage.removeItem('token');
//       // navigate('/login');
//     }
//   }
// }, [dispatch]);

// const { role } = useSelector(state => state.auth);
// const { role } = getUserDetailsFromToken() || {};
// if (!role & (location.pathname !== '/login')) {
//   return <div>Loading..</div>;
// }

const ProtectedRoute = ({ element, path, title }) => {
  const role = useSelector(state => state.auth.role);
  if (!role) {
    return <div>Page cannot be accessed or is Loading...</div>;
  }
  return hasPermission(path, role) ? (
    <Layout title={title}>{element}</Layout>
  ) : (
    <Navigate to='/unauthorized' />
  );
};

export default ProtectedRoute;
