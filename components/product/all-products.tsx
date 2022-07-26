import { Grid, Stack, Notification } from '@mantine/core';
import IProduct from '../../types/IProduct';
import Product from './product';
import { IconCheck } from '@tabler/icons';
import { useAllProductsStyles } from '../../styles/product/all-products.styles';
import { useState } from 'react';

let timer: string | number | NodeJS.Timeout | undefined | null;

const AllProducts: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const { classes } = useAllProductsStyles();

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
        <div className={classes.alertContainer}>
          <Notification
            icon={<IconCheck size={20} />}
            title="Notification"
            color="lime"
            className={classes.alert}
            disallowClose
          >
            Item added to cart!
          </Notification>
        </div>
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
