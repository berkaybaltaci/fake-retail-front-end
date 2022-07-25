import { Alert, Grid, Stack } from '@mantine/core';
import IProduct from '../../types/IProduct';
import Product from './product';
import { IconAlertCircle } from '@tabler/icons';
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
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Notification"
            color="lime"
            className={classes.alert}
            withCloseButton
            variant="filled"
          >
            Item added to cart!
          </Alert>
        </div>
      )}
      <Stack>
        <Grid
          justify="center"
          columns={60}
          style={{ height: '100%', margin: '2%' }}
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
