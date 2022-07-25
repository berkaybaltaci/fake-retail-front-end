import { GetServerSideProps, NextPage } from 'next';
import { ProductDetail } from '../../components/product/product-detail';
import { createStyles } from '@mantine/core';
import { gql } from '@apollo/client';
import apolloClient from '../../lib/apollo';
import IProduct from '../../types/IProduct';

const ProductDetailPage: NextPage<{ product: IProduct }> = ({ product }) => {
  const useStyles = createStyles(() => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: '90vh',
    },
  }));

  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <ProductDetail
        _id={product._id}
        description={product.description}
        discount={35}
        imagePath={product.imagePath}
        price={product.price}
        name={product.name}
        isNew={product.isNew}
        isVerified={product.isVerified}
        isReducedPrice={product.isReducedPrice}
        isLocalOffer={product.isLocalOffer}
        isLimited={product.isLimited}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { productSlug } = context.params;

  const getProductByIdQuery = gql`
    query {
      productByName(input: { name: "${productSlug}" }) {
        _id
        name
        description
        price
        imagePath
        isNew
        isVerified
        isReducedPrice
        isLocalOffer
        isLimited
      }
    }
  `;

  const { data } = await apolloClient.query({
    query: getProductByIdQuery,
  });

  return {
    props: {
      product: data.productByName,
    },
  };
};

export default ProductDetailPage;
