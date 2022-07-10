import { Grid, Pagination, Stack } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { randomBytes } from 'crypto';
import { MongoClient } from 'mongodb';
import { useEffect, useState } from 'react';
import IProduct from '../../types/IProduct';
import Product from './product';

const AllProducts: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const [activePage, setPage] = useState(1);

  return (
    <>
      <Stack>
        <Grid justify="center" columns={24} style={{ height: '100%' }}>
          {products.map((singleProduct) => (
            <Grid.Col
              span={12}
              xs={8}
              md={6}
              lg={4}
              key={singleProduct._id}
              style={{ width: '300px' }}
            >
              <Product
                _id={singleProduct._id}
                product={singleProduct.product}
                description={singleProduct.description}
                imagePath={singleProduct.imagePath}
              />
            </Grid.Col>
          ))}
        </Grid>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-end',
            alignSelf: 'center',
            alignItems: 'flex-end',
            justifyContent: 'center',
            margin: '1%',
          }}
        >
          <Pagination page={activePage} onChange={setPage} total={10} />
        </div>
      </Stack>
    </>
  );
};

export default AllProducts;
