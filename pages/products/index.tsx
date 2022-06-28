import { GetServerSideProps } from 'next';
import { MongoClient } from 'mongodb';

import { NextPage } from 'next';
import AllProducts from '../../components/product/all-products';
import { IProduct } from '../../types';

const AllProductsPage: NextPage<{ allProducts: IProduct[] }> = ({
  allProducts,
}) => {
  return <AllProducts products={allProducts} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uri =
    'mongodb+srv://admin:123123123@cluster0.md7gjss.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();
  const productsCollection = client.db('test').collection('products');
  const allProducts = await productsCollection.find().toArray();

  const convertedAllProducts = JSON.stringify(allProducts);
  console.log(convertedAllProducts);

  return {
    props: {
      allProducts: convertedAllProducts,
    },
  };
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   client.close();
  // });
};

export default AllProductsPage;