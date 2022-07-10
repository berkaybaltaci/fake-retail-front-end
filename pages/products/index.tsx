import { GetServerSideProps } from 'next';
import { MongoClient } from 'mongodb';

import { NextPage } from 'next';
import AllProducts from '../../components/product/all-products';
import IProduct from '../../types/IProduct';
import { GetStaticProps } from 'next';
import { useState } from 'react';

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
  const uri =
    'mongodb+srv://admin:siamsiam1812@cluster0.l9dh4.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();
  const productsCollection = client
    .db('fake-retail-app')
    .collection('products');
  const allProducts = await productsCollection.find().limit(10).toArray();
  const convertedAllProducts = await JSON.parse(JSON.stringify(allProducts));

  return {
    props: {
      allProducts: convertedAllProducts,
    },
  };
};

export default AllProductsPage;
