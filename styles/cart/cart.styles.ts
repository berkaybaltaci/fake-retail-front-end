import { createStyles } from '@mantine/core';
import { BUTTON_COLOR } from '../../lib/constants';

export const useCartStyles = createStyles(() => ({
  minusIcon: {
    cursor: 'pointer',
    color: BUTTON_COLOR,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  'item-exit-active': {
    opacity: 0,
    transition: 'opacity 700ms ease-out',
  },
}));
