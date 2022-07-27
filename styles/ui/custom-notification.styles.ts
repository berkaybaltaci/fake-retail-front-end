import { createStyles } from '@mantine/core';

export const useCustomNotificationStyles = createStyles(() => ({
  alertContainer: {
    color: 'white',
    bottom: '2%',
    left: '2%',
    position: 'fixed',
    zIndex: 99999999,
  },

  alert: {
    position: 'relative',
  },
}));
