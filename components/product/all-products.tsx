import { Grid, Stack } from '@mantine/core';
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
              <Product {...singleProduct} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default AllProducts;
