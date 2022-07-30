import { Grid, Stack } from '@mantine/core';
import IProduct from '../../types/IProduct';
import Product from './product';
import CustomNotification from '../ui/custom-notification';
import useShowNotification from '../../hooks/use-show-notification';

const AllProducts: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const { displayNotification, isShowingNotification } = useShowNotification(
    [],
    2000
  );

  const addItemToCartHandler = () => {
    displayNotification();
  };

  return (
    <>
      {isShowingNotification && (
        <CustomNotification
          title="Notification"
          message="Item added to cart!"
        />
      )}
      <Stack>
        <Grid
          justify="center"
          columns={60}
          style={{ height: '100%', marginLeft: '2%', marginRight: '2%' }}
        >
          {products.map((singleProduct) => (
            <Grid.Col
              span={60}
              xs={30}
              md={20}
              lg={15}
              xl={12}
              key={singleProduct._id}
            >
              <Product
                {...singleProduct}
                addItemToCartHandler={addItemToCartHandler}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default AllProducts;
