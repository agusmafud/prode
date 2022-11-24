import axios from 'axios';
import { useState, useEffect } from 'react';

const useTime = () => {
  const [initialTime, setInitialTime] = useState();
  const [minutesCounter, setMinutesCounter] = useState(0);

  const getTime = async () => {
    try {
      // another possible solution
      // const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
      const response = await axios.get('https://worldtimeapi.org/api/ip');
      const time = response.data.unixtime;

      setInitialTime(time);
      setMinutesCounter(0);
      // eslint-disable-next-line no-debugger
      debugger;
    } catch (error) {
      // TODO: Catch errors
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    if (!initialTime) getTime();
  }, [initialTime]);

  useEffect(() => {
    setTimeout(
      () => () => initialTime && setMinutesCounter((previousState) => previousState + 1),
      60000,
    );
  }, [initialTime, minutesCounter]);

  /* useEffect(() => {
    setTimeout(
      () => {
        getTime();
      },
      60000 * 5,
    );
  }, [initialTime, minutesCounter]); */

  const time = initialTime
    ? initialTime + (minutesCounter * 60)
    : 0;

  return time;
};

export default useTime;
