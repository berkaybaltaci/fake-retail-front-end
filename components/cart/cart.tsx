import { List } from '@mantine/core';
import { selectCart } from '../../app/cartSlice';
import { useAppSelector } from '../../app/hooks';

const Cart: React.FC = () => {
  const cart = useAppSelector(selectCart);

  return (
    <List>
      {cart.map((item) => (
        <List.Item key={item._id}>{item.name}</List.Item>
      ))}
      {/* <List.Item>Clone or download repository from GitHub</List.Item>
      <List.Item>Install dependencies with yarn</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
      <List.Item>
        Run tests to make sure your changes do not break the build
      </List.Item>
      <List.Item>Submit a pull request once you are done</List.Item> */}
    </List>
  );
};

export default Cart;
