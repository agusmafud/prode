import axios from 'axios';
import { useState, useEffect } from 'react';

const useTime = () => {
  const [initialTime, setInitialTime] = useState();
  const [minutesCounter, setMinutesCounter] = useState(0);

  useEffect(() => {
    const getTime = async () => {
      try {
        // const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
        // another possible solution
        const response = await axios.get('https://worldtimeapi.org/api/ip');

        setInitialTime(response.data.unixtime);
      } catch (error) {
        // TODO: Catch errors
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    if (!initialTime) getTime();
  }, [initialTime]);

  useEffect(() => {
    setTimeout(
      () => initialTime && setMinutesCounter((previousState) => previousState + 1),
      60000,
    );
  }, [initialTime, minutesCounter]);

  const time = initialTime
    ? initialTime + (minutesCounter * 60)
    : 0;

  return time;
};

export default useTime;
