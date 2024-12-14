import Layout from "@/components/layout";
import { getSortedList } from "@/lib/data";
import Link from "next/link";

// Define a getStaticProps() function for fetching data
export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: { allData },
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
      {/* Navigation Links to new pages */}
      <div className="list-group">
        <h2 style={{ marginLeft: '10px' }}>Explore Categories</h2>
        <Link href="/main-characters" className="list-group-item list-group-item-action" style={{ backgroundColor: '#d1a7f0'}}>
          Main Characters
        </Link>
        <Link href="/yokai" className="list-group-item list-group-item-action" style={{ backgroundColor: '#f8a1a1'}}>
          Yokai
        </Link>
        <Link href="/alians" className="list-group-item list-group-item-action" style={{ backgroundColor: '#4fd8d5'}}>
          Alians
        </Link>
      </div>
    </Layout>
  );
}


// ORIGINAL INDEX.JS

// import Layout from "@/components/layout";
// import { getSortedList } from "@/lib/data";
// import Link from "next/link";

// // define a getStaticProps() function
// export async function getStaticProps() {
//   const allData = await getSortedList();
//   return {
//     props: { allData }
//   };
// }

// // exports our homepage
// export default function Home({ allData }) {
//   return (
//     <Layout home>
//       <h1 style={{ marginLeft: '10px' }}>Dandadan! - Returned from WPDB</h1>
//       <img 
//         src="/media/dandadance.gif" 
//         alt="Dandadan GIF" 
//         className="img-fluid mt-3 mb-3"
//       />
//       {/* Display list of Main Characters */}
//       <div className="list-group" >
//         <h2 style={{ marginLeft: '10px' }}>Main Characters</h2>
//         {allData.special.map(({ id, name }) => (
//           <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action" style={{ backgroundColor: '#d1a7f0'}}>
//             {name}
//           </Link>
//         ))}
//       </div>

//       {/* Display list of Yokai */}
//       <div className="list-group mt-4">
//         <h2 style={{ marginLeft: '10px' }}>Yokai</h2>
//         {allData.yokai.map(({ id, name }) => (
//           <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action" style={{ backgroundColor: '#f8a1a1'}}>
//             {name}
//           </Link>
//         ))}
//       </div>

//       {/* Display list of Alians */}
//       <div className="list-group mt-4">
//         <h2 style={{ marginLeft: '10px' }}>Alians</h2>
//         {allData.alian.map(({ id, name }) => (
//           <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action" style={{ backgroundColor: '#4fd8d5'}}>
//             {name}
//           </Link>
//         ))}
//       </div>
//     </Layout>
//   );
// }
