import { createStyles } from '@mantine/core';
import { BUTTON_COLOR, CART_ITEM_REMOVE_DELAY_SEC } from '../../lib/constants';

export const useCartStyles = createStyles(() => ({
  minusIcon: {
    cursor: 'pointer',
    color: BUTTON_COLOR,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  removing: {
    cursor: 'pointer',
    color: BUTTON_COLOR,
    transition: `all ${CART_ITEM_REMOVE_DELAY_SEC} ease-in-out`,
    transform: 'scale(0)',
  },
}));
