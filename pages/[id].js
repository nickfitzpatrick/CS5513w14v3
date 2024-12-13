import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';

// define a getStaticProps() function to have next.js retrieve data to use for the dynamic page
export async function getStaticProps( { params } ) {
  const itemData = await getData(params.id);
  return {
    props: {
      itemData
    }
  };
}

// define a getStaticPaths() function to tell next.js all valid URLs
export async function getStaticPaths() {
  const paths = await getAllIds();
  // console.log("Paths:", paths);
  return {
    paths,
    fallback: false
  };
}


export default function Entry({ itemData }) {
  const mediaPath = itemData.gif_path || itemData.img_path;
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title" style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{itemData.post_title}</h5>
          <img
            src={`https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-content/uploads/${mediaPath}`}
            alt="Media"
            className="img-fluid mt-3"
          />
        </div>
      </article>
    </Layout>
  );
}