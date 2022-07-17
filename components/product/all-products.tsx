import { Button, Grid, Group, Modal, Stack } from '@mantine/core';
import { useState } from 'react';
import IProduct from '../../types/IProduct';
import Product from './product';

const AllProducts: React.FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <>
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
              style={{ width: '300px' }}
            >
              <Product
                _id={singleProduct._id}
                name={singleProduct.name}
                price={singleProduct.price}
                description={singleProduct.description}
                imagePath={singleProduct.imagePath}
                isNew={singleProduct.isNew}
                isLimited={singleProduct.isLimited}
                isLocalOffer={singleProduct.isLocalOffer}
                isReducedPrice={singleProduct.isReducedPrice}
                isVerified={singleProduct.isVerified}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default AllProducts;
