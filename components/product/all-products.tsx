import { Grid, Pagination, Stack } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { randomBytes } from 'crypto';
import { MongoClient } from 'mongodb';
import { useEffect, useState } from 'react';
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
                product={singleProduct.product}
                price={singleProduct.price}
                description={singleProduct.description}
                imagePath={singleProduct.imagePath}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default AllProducts;
