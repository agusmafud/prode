import axios from 'axios';
import { useState, useEffect } from 'react';

const useTime = () => {
  const [time, setTime] = useState();

  const getTime = async () => {
    try {
      // another possible solution
      // const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
      const response = await axios.get('https://worldtimeapi.org/api/ip');
      const apiTime = response.data.unixtime;

      setTime(apiTime);
      // eslint-disable-next-line no-debugger
      debugger;
    } catch (error) {
      // TODO: Catch errors
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    setTimeout(
      () => getTime(),
      30000,
    );
  }, [time]);

  return time;
};

export default useTime;
