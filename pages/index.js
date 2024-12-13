import Layout from "@/components/layout";
import { getSortedList } from "@/lib/data";
import Link from "next/link";

// define a getStaticProps() function 
export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: { allData }
  };
}

// exports our homepage
export default function Home( { allData } ) {
  return (
    <Layout home>
      <h1>Returned from WPDB</h1>
      <div className="list-group">
        {allData.map(
            ({id,name}) => (
              <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action">
                {name}
              </Link>
            )
          )
        }
      </div>
    </Layout>
  );
}