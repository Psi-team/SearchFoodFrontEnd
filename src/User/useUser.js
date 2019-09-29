import { useUserContext } from '../components/utils/UserContext';

import { apiLogin, apiSignup } from '../components/apis';
import useApiCall from '../components/utils/useApiCall';

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

  const register = ({ email, passwd1, birthYear, sex }) => {
    const data = {
      username: email,
      passwd: passwd1,
      birthyear: birthYear.toString(),
      sex: Number(sex)
    };

    apiSignup(data)
      .then(res => {
        console.log(res);
        setUser(email.split('@')[0]);
        history.push('/');
      });
  };

  const logout = () => {
    history.push('/');
  };

  return { fetchState, login, register, logout };
}

export default useUser;