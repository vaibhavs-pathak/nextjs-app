import { useEffect, useState } from "react";
import useSWR from 'swr';

const LastSalesPage = (props) => {
  // const [sales, setSales] = useState();
  // const [loading, setLoading] = useState(false);
  let salesInfo = props.sales;

  const fetcher = async (url) => {
    const response = await fetch(url);
    const dataFound = await response.json();
    const transformData = [];
    for (const key in dataFound) {
      transformData.push({
        id: key,
        userName: dataFound[key].userName,
        volume: dataFound[key].volume
      });
    }

    return transformData;
  }

  const { data, error } = useSWR('https://nextjs-course-de10c-default-rtdb.firebaseio.com/sales.json', fetcher);

  useEffect(() => {
    if (data) {
      salesInfo = data;
    }
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   // Firebase DB API Call: Where after com/sales -> is collection name in DB and firebase returns data in json format that's why last .json
  //   fetch('https://nextjs-course-de10c-default-rtdb.firebaseio.com/sales.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       const transformData = [];
  //       for (const key in data) {
  //         transformData.push({
  //           id: key,
  //           userName: data[key].userName,
  //           volume: data[key].volume
  //         });
  //       }
  //       setSales(transformData);
  //       setLoading(false);
  //     });
  // }, []);

  if (error) {
    return (
      <p>Failed To Load</p>
    );
  }

  if (!data && salesInfo) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <ul>
      {salesInfo.map(salesData => (
        <li key={salesData.id}>{salesData.userName} ${salesData.volume}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch('https://nextjs-course-de10c-default-rtdb.firebaseio.com/sales.json');
  const data = await response.json();
  const transformData = [];
  for (const key in data) {
    transformData.push({
      id: key,
      userName: data[key].userName,
      volume: data[key].volume
    });
  }

  return { props: { sales: transformData, revalidate: 10 } };
}

export default LastSalesPage