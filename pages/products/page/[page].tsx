import { NextPage } from 'next';
import AllProducts from '../../../components/product/all-products';
import IProduct from '../../../types/IProduct';
import { GetStaticProps } from 'next';

import { gql } from '@apollo/client';
import apolloClient from '../../../lib/apollo-client';
import { Pagination, Space, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { PRODUCTS_PER_PAGE, TITLE_COLOR } from '../../../lib/constants';

const AllProductsPage: NextPage<{
  allProducts: IProduct[];
  totalNumOfPages: number;
}> = ({ allProducts, totalNumOfPages }) => {
  const router = useRouter();
  const pageNum: number = +router.query['page']!;
  const handlePageChange = (page: number) => {
    router.push(`/products/page/${page}`);
  };

  return (
    <>
      <Space h="lg" />
      <Text
        align="center"
        color="blue"
        weight={800}
        style={{
          fontSize: '250%',
          fontFamily: 'Marcellus',
          color: TITLE_COLOR,
        }}
      >
        ALL PRODUCTS
      </Text>
      <AllProducts products={allProducts} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1%',
        }}
      >
        <Pagination
          page={pageNum}
          onChange={handlePageChange}
          total={totalNumOfPages}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { page } = context.params;

  // We first query all products to see the total number
  // so that we can determine the total number of pages
  const allProductsQuery = gql`
    query {
      products {
        _id
      }
    }
  `;

  const { data: node } = await apolloClient.query({
    query: allProductsQuery,
  });

  const totalNumOfProducts = node.products.length;
  const totalNumOfPages = totalNumOfProducts / PRODUCTS_PER_PAGE;

  // Now we query the products required for the current page
  const paginatedProductsQuery = gql`
    query {
      products(
        input: { numberOfProductsToGet: ${PRODUCTS_PER_PAGE}, 
                 numberOfProductsToSkip: ${PRODUCTS_PER_PAGE * (page - 1)} }
      ) {
        _id
        name
        description
        price
        imagePath
        isNew
      }
    }
  `;

  const { data } = await apolloClient.query({
    query: paginatedProductsQuery,
  });

  return {
    props: {
      allProducts: data.products,
      totalNumOfPages,
    },
    revalidate: 3600, // 1 hour
  };
};

export const getStaticPaths = async () => {
  const allProductsQuery = gql`
    query {
      products {
        _id
      }
    }
  `;

  const { data } = await apolloClient.query({
    query: allProductsQuery,
  });

  const totalNumOfProducts = data.products.length;
  const totalNumOfPages = totalNumOfProducts / PRODUCTS_PER_PAGE;

  const pathsArray = [];

  for (let i = 0; i < totalNumOfPages; i++) {
    pathsArray.push({ params: { page: `${i + 1}` } });
  }

  return {
    paths: pathsArray,
    fallback: false,
  };
};

export default AllProductsPage;
