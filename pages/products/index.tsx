import { GetServerSideProps } from 'next';
import { MongoClient } from 'mongodb';

import { NextPage } from 'next';
import AllProducts from '../../components/product/all-products';
import { IProduct } from '../../types';
import { GetStaticProps } from 'next';

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
    'mongodb+srv://admin:123123123@cluster0.md7gjss.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  await client.connect();
  const productsCollection = client.db('test').collection('products');
  const allProducts = await productsCollection.find().toArray();
  const convertedAllProducts = await JSON.parse(JSON.stringify(allProducts));

  const allProductsWithoutId: IProduct[] = convertedAllProducts.map(
    (product: any) => ({
      name: product.name,
      imagePath: product.imagePath,
      isNew: product.isNew,
      description: product.description,
    })
  );

  return {
    props: {
      allProducts: allProductsWithoutId,
    },
  };
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   client.close();
  // });
};

export default AllProductsPage;
