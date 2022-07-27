import { useState } from 'react';

let timer: string | number | NodeJS.Timeout | undefined;

const useShowNotification = (callbacks: Array<() => void> = []) => {
  const [isShowingNotification, setIsShowingNotification] =
    useState<boolean>(false);

  const displayNotification = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setIsShowingNotification(true);
    timer = setTimeout(() => {
      setIsShowingNotification(false);
      for (const callback of callbacks) {
        callback();
      }
    }, 2000);
  };

  return { isShowingNotification, displayNotification };
};

export default useShowNotification;
