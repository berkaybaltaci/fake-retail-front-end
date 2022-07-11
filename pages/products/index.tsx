import { MongoClient } from 'mongodb';

import { NextPage } from 'next';
import AllProducts from '../../components/product/all-products';
import IProduct from '../../types/IProduct';
import { GetStaticProps } from 'next';

import { gql } from '@apollo/client';
import apolloClient from '../../lib/apollo';

const AllProductsPage: NextPage<{ allProducts: IProduct[] }> = ({
  allProducts,
}) => {
  return (
    <>
      <h1>ALL PRODUCTS PAGE</h1>
      <AllProducts products={allProducts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allProductsQuery = gql`
    query {
      products {
        _id
        product
        description
        price
        imagePath
      }
    }
  `;

  const { data } = await apolloClient.query({
    query: allProductsQuery,
  });

  return {
    props: {
      allProducts: data.products,
    },
  };
};

export default AllProductsPage;
