import React, { useState, useCallback, useEffect } from "react";
import toast from 'react-hot-toast';
import { useMounted } from '../hooks/use-mounted';

/**
 * @description Higher Order Function to return data to a component
 * @param {Function} utilFetchFunction Helper Function to fetch Data from API
 * @returns {React.FC} New React Functional Component with Data
 */
export const WithFetchData = (utilFetchFunction) => (OriginalComponent) => {
  const NewComponent = () => {
    const isMounted = useMounted();
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchData = useCallback(async () => {
      setLoading(true);
      try {
        const data = await utilFetchFunction();
        console.log('DEBUG --< ', data);
        if (data && isMounted()) {
          toast.success('Data has been successfully fetched');
          setState(data);
        }
      } catch (error) {
        toast.error('oops, something went wrong, please try again later', { duration: 500 });
        console.log(error);
      }
      setLoading(false);
    }, [setState, isMounted]);

    useEffect(() => {
      handleFetchData();
    }, []);

    return <OriginalComponent data={state} loading={loading} handleFetchData={handleFetchData} />;
  };
  return NewComponent;
};
