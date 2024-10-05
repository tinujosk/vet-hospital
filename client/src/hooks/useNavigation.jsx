import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  const redirectToDashboard = role => {
    switch (role) {
      case 'doctor':
        navigate('/');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'nurse':
        navigate('/nursing');
        break;
      case 'lab':
        navigate('/lab');
        break;
      case 'pharmacist':
        navigate('/pharmacy');
        break;
      default:
        navigate('/login');
    }
  };

  return {
    redirectToLogin,
    redirectToDashboard,
  };
};
