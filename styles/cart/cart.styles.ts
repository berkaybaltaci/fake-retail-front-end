import { createStyles } from '@mantine/core';
import {
  BUTTON_COLOR,
  CART_ITEM_DECREASE_DELAY_SEC,
  CART_ITEM_REMOVE_DELAY_SEC,
} from '../../lib/constants';

export const useCartStyles = createStyles(() => ({
  minusIcon: {
    cursor: 'pointer',
    color: 'red',
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    verticalAlign: 'bottom',
  },

  plusIcon: {
    cursor: 'pointer',
    color: 'green',
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    verticalAlign: 'bottom',
  },

  removing: {
    cursor: 'pointer',
    color: BUTTON_COLOR,
    transition: `all ${CART_ITEM_REMOVE_DELAY_SEC} ease-in-out`,
    // transform: 'scale(0)',
    opacity: 0,
    transform: 'translateX(100px)',
  },

  decreasing: {
    cursor: 'pointer',
    color: BUTTON_COLOR,
    transition: `all ${CART_ITEM_DECREASE_DELAY_SEC} ease-in-out`,
    // transform: 'scale(0.5) scale(1.5)',
    // opacity: 0,
    transform: 'translateY(10px)',
  },

  increasing: {
    cursor: 'pointer',
    color: BUTTON_COLOR,
    transition: `all ${CART_ITEM_DECREASE_DELAY_SEC} ease-in-out`,
    // transform: 'scale(0.5) scale(1.5)',
    // opacity: 0,
    transform: 'translateY(-10px)',
  },
}));
