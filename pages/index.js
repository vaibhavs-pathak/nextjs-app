import path from 'path';
import fs from 'fs';
import Link from 'next/link';

const HomePage = (props) => {
  const { products } = props;
  return (
    <ul>
      {products && products.map(product => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  if (!data) {
    return {
      redirect: {
        destination: '/no-data-found' // redirect props used if you want to redirect into some one else route in specific condition. Here, if data not available will redirect to another no data found page.
      }
    }
  }
  return {
    props: {
      products: data.products
    },
    revalidate: 10, //Since revalidate is mostly useful in production where after every 10 seconds page get re-generated. But for development it re-generating at every request.
    notFound: data.products.length <= 0 ? true : false //If data not available you can show 404 page.
  };
}

export default HomePage;
