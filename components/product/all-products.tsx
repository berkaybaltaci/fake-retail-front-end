import { randomId } from '@mantine/hooks';
import { randomBytes } from 'crypto';
import { IProduct } from '../../types';
import Product from './product';

const AllProducts: React.FC<{ products: Array<IProduct> }> = ({ products }) => {
  return (
    <>
      <h2>ALLPRODUCTS COMPONENT</h2>
      {products.map((product) => (
        <Product
          key={Math.random() * 10000}
          name={product.name}
          description={product.description}
          imagePath={product.imagePath}
          isNew={product.isNew}
        />
      ))}
    </>
  );
};

export default AllProducts;
