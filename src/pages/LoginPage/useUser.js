import { useUserContext } from '../../components/utils/UserContext';

import { apiLogin } from '../../components/apis';
import useApiCall from '../../components/utils/useApiCall';

const useUser = (history) => {
  const { fetchState, setFetchState } = useApiCall();
  const { setUser } = useUserContext();
  const login = (email, password) => {
    setFetchState({
      ...fetchState,
      loading: true
    });
    apiLogin()
      .then(res => {
        setFetchState({
          ...fetchState,
          loading: false
        });
        setUser(email.split('@')[0]);
        console.log(res.data);
        history.push('/');
      });
  };

  const register = () => {
    history.push('/login');
  };

  return { fetchState, login, register };
}

export default useUser;