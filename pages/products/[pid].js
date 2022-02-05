import path from 'path';
import fs from 'fs';
import { Fragment } from "react"

const ProductDetailsPage = (props) => {
  const { productDetails } = props;

  // If fallback: 'blocking', in getStaticPaths function, then, no need to add below Loading... condition. It will wait till fully data comes and component renders.
  if (!productDetails) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <Fragment>
      <h1>{productDetails.title}</h1>
      <p>{productDetails.description}</p>
    </Fragment>
  )
}

const getData = () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  // context is the object which holds url params information
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  // Find the product which matches the url product id i.e. pid:
  const product = data.products.find(product => product.id === productId);
  return {
    props: {
      productDetails: product
    }
  };
}

export async function getStaticPaths() {
  // getStaticPaths function required to tell getStaticProps abut for which dynamic id need to pre-generated pages.
  // i.e. like pre-generated pages, if it will be dynamic page like this example ([pid].js), we have to pre-generated dynamic id as well like pages in advanced.
  // This function pre-generated params.pid fro getStaticProps function which will loads the product details dynamic page latter.

  const data = await getData();
  const paramIds = data.products.map(product => ({ params: { pid: product.id } }));
  return {
    paths: paramIds,
    fallback: false //if fallback: 'blocking' ==> then no need to add condition for Loading... which will added above in condition. Component will take time to fully load the data.
  }
}

export default ProductDetailsPage