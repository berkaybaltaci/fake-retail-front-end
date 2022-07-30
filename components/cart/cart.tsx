import { List } from '@mantine/core';
import { useCartContext } from '../../lib/context-store';
import { CircleMinus } from 'tabler-icons-react';
import { useCartStyles } from '../../styles/cart/cart.styles';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const CustomListItem = React.forwardRef((props: any, ref: any) => (
  <List.Item itemRef={ref} key={props.key} icon={props.icon}>
    {props.children}
  </List.Item>
));
CustomListItem.displayName = 'MotionListItem';

const MotionListItem = motion(CustomListItem, { forwardMotionProps: true });

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Cart: React.FC = () => {
  const { products, removeProductFromCart } = useCartContext();

  const { classes } = useCartStyles();

  return (
    <List>
      <AnimatePresence>
        {products.map((item) => (
          <MotionListItem
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key={item._id}
            icon={
              <CircleMinus
                onClick={() => removeProductFromCart(item)}
                className={classes.minusIcon}
              />
            }
          >
            {item.name}
          </MotionListItem>
        ))}
      </AnimatePresence>
    </List>
  );
};

export default Cart;
