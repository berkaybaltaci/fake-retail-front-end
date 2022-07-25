import { createStyles } from '@mantine/core';

export const useAllProductsStyles = createStyles(() => ({
  alertContainer: {
    color: 'white',
    // opacity: 1,
    bottom: '2%',
    right: '2%',
    position: 'fixed',
    zIndex: 99999999,
  },

  alert: {
    position: 'relative',
  },
}));
