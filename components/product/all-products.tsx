import { IProduct } from '../../types';
import Product from './product';

const AllProducts: React.FC<{ products: Array<IProduct> }> = ({ products }) => {
  return (
    <>
      {products.map((product) => {
        <Product
          name={product.name}
          description={product.description}
          imagePath={product.imagePath}
          isNew={product.isNew}
        />;
      })}
    </>
  );
};

export default AllProducts;
