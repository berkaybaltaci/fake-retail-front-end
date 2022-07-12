import { NextPage } from 'next';
import Product from '../../components/product/product';
import { ProductDetail } from '../../components/product/product-detail';
import { createStyles, Text } from '@mantine/core';

const ProductDetailPage: NextPage = () => {
  const useStyles = createStyles((theme) => ({
    container: {
      // background: 'blue',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: '90vh',
    },
  }));

  const { classes } = useStyles();

  const dummyProductData = {
    _id: '2434',
    product: 'Pack of eggs',
    description:
      'This is the description. This is the description. This is the description. This is the description. ',
    imagePath: '/images/chips.jpg',
    price: 289,
    discount: 35,
  };

  return (
    <div className={classes.container}>
      <Text>PRODUCT DETAILS</Text>
      <ProductDetail {...dummyProductData} />
    </div>
  );
};

export default ProductDetailPage;
