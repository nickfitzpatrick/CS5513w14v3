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
  return {
    paths,
    fallback: false
  };
}



export default function Entry({ itemData }) {
  const formatScfFields = (fields) => {
    // split up the three fields into key-value pairs
    const pairs = fields.split(','); 
    const values = pairs
    // get rid of contact_gif 
    .filter(pair => !pair.startsWith('contact_gif:'))
    // get the first and last name values
    .map(pair => pair.split(':')[1].trim());
    // join together wiht for a complete name with a space
  return values.join(' '); 
};

  const formattedFields = formatScfFields(itemData.scf_fields);

  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title" style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{formattedFields}</h5>
          <img
              src={`https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-content/uploads/${itemData.gif_path}`}
              alt="Dandadan GIF"
              className="img-fluid mt-3"
           />
        </div>
      </article>
    </Layout>
  );
}
