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


export default function Home({ allData }) {
  return (
    <Layout home>
      <h1 style={{ marginLeft: '10px' }}>Dandadan! - Returned from WPDB</h1>
      <img 
        src="/media/dandadance.gif" 
        alt="Dandadan GIF" 
        className="img-fluid mt-3 mb-3"
      />
      <div className="list-group mt-4">
        <h2 style={{ marginLeft: '10px' }}>Yokai</h2>
        {allData.yokai.map(({ id, name }) => (
          <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action" style={{ backgroundColor: '#f8a1a1'}}>
            {name}
          </Link>
        ))}
      </div>
      <Link href="/" className="btn btn-info mt-3">
        Back to Home
     </Link>
    </Layout>
  );
}