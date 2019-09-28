import { useState } from 'react';

const useApiCall = () => {
  const [fetchState, setFetchState] = useState({ loading: false, error: '' });

  return { fetchState, setFetchState };
}

export default useApiCall;