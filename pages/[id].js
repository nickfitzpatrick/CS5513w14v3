import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';

// define a getStaticProps() function to have next.js retrieve data to use for the dynamic page
export async function getStaticProps( { params } ) {
  const itemData = await getData(params.id);
  return {
    props: {
      itemData
    },
    revalidate: 60
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
  console.log("Item Data: ", itemData);

  const obj = itemData.scf_fields;
  console.log("DATA IN OBJ: ", obj);
  
  // Use replace to format the string into JSON format
  let formatString = '{"' + obj.replace(/,/g, '","').replace(/:/g, '":"') + '"}';
  
  // Parse the formatted string into a JSON object
  let parsedObj = JSON.parse(formatString);
  console.log("OBJ PARSED: ", parsedObj);


  const mediaPath = itemData.gif_path || itemData.img_path;
  return (
    <Layout>
      <article className="card col-12">
        <div className="card-body col-12">
          <h5 className="card-title" style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{itemData.post_title}</h5>
          <h4>{parsedObj.alian_description || parsedObj.character_description || parsedObj.yokai_description}</h4>
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