import { useState } from 'react';

let notificationTimer: string | number | NodeJS.Timeout | undefined;
let callbackTimer: string | number | NodeJS.Timeout | undefined;

const useShowNotification = (
  callbacks: Array<() => void> = [],
  delay: number
) => {
  const [isShowingNotification, setIsShowingNotification] =
    useState<boolean>(false);

  const displayNotification = () => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }
    setIsShowingNotification(true);
    notificationTimer = setTimeout(() => {
      setIsShowingNotification(false);
    }, delay);
  };

  const runCallbacks = () => {
    if (callbackTimer) {
      clearTimeout(callbackTimer);
    }
    setIsShowingNotification(true);
    notificationTimer = setTimeout(() => {
      for (const callback of callbacks) {
        callback();
      }
    }, delay);
  };

  return { isShowingNotification, displayNotification, runCallbacks };
};

export default useShowNotification;
