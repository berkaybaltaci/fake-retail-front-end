import { NextPage } from 'next';
import Product from '../../components/product/product';

const ProductDetail: NextPage = () => {
  return (
    <Product
      product="Bag of Chips"
      description="Delicious bag of chips by lays"
      imagePath="/images/chips.jpg"
      price={90}
      _id="123"
    />
  );
};

export default ProductDetail;
