import { NextPage } from 'next';
import Product from '../../components/product/product';

const ProductDetail: NextPage = () => {
  return (
    <Product
      name="Bag of Chips"
      description="Delicious bag of chips by lays"
      imagePath="/images/chips.jpg"
      isNew={true}
    />
  );
};

export default ProductDetail;
