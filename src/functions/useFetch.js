import { useEffect, useState } from 'react';
import { GetDataFunc } from './crudFunc';

const useFetch = (route, refresh) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await GetDataFunc(route);

      setData(res.data.data);
      console.log(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [route, refresh]);

  return [data, error, loading];
};

export default useFetch;
