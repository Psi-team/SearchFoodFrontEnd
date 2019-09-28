import { useContext, createContext } from 'react';

export const useUserContext = () => useContext(UserContext);
const UserContext = createContext({});

export default UserContext;