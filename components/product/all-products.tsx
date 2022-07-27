import { Grid, Stack } from '@mantine/core';
import IProduct from '../../types/IProduct';
import Product from './product';
import { useState } from 'react';
import CustomNotification from '../ui/custom-notification';

let timer: string | number | NodeJS.Timeout | undefined | null;

const AllProducts: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const [showItemAddedToCartNotification, setShowItemAddedToCartNotification] =
    useState<boolean>(false);

  const addItemToCartHandler = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setShowItemAddedToCartNotification(true);
    timer = setTimeout(() => {
      setShowItemAddedToCartNotification(false);
    }, 2000);
  };

  return (
    <>
      {showItemAddedToCartNotification && (
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
