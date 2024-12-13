
import got from 'got';

// hello git?

// WP URLs
const dataURL = 
"https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/special";

const dataURL_yokai = 
"https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/yokai";

const dataURL_alian = 
"https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/alian"

// const dataURLs = [
//     {mainCharacterURL: "https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/special"},
//     {yokiaURL: "https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/yokai"},
//     {alianURL: "https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/alian"}
// ]

// const jsonObjSpecial = await getJSON(dataURLs.mainCharacterURL);
// const jsonObjYokai = await getJSON(dataURLs.yokaiURL);
// const jsonObjAlian = await getJSON(dataURLs.alianURL);


async function getJSON(url) {
    let jsonString;
    try {
        // next line uses got synchronouosly to retrive via https our json from wp site
        jsonString = await got(url);
        const jsonObj = JSON.parse(jsonString.body);
        // console.log("Parsed JSON:", jsonObj);
        return jsonObj;
    } catch(error) {
        console.log(error);
        return []
    }  
}

async function makeJSONobject(){
    const jsonObjSpecial = await getJSON(dataURL);
    const jsonObjYokai = await getJSON(dataURL_yokai);
    const jsonObjAlian = await getJSON(dataURL_alian);
    return [...jsonObjSpecial, ...jsonObjYokai, ...jsonObjAlian];
}



export async function getAllIds() {
    const jsonObj = await makeJSONobject();
    //use map() or array to extract just id + name properties into new array of object values
    return jsonObj.map(
        function(item) {
            return {
                params: {
                    id: item.ID.toString()
                }
            };
        }
    );
}




export async function getSortedList(){
    const jsonObjSpecial = await getJSON(dataURL);
    const jsonObjYokai = await getJSON(dataURL_yokai);
    const jsonObjAlian = await getJSON(dataURL_alian);

    //sort json array by name property
    const sortedSpecial = jsonObjSpecial.sort( function(a,b) {
            return a.post_title.localeCompare(b.post_title);
        }
    );

    const sortedYokai = jsonObjYokai.sort(function(a,b) {
            return a.post_title.localeCompare(b.post_title);
        }
    );

    const sortedAlian = jsonObjAlian.sort(function(a,b) {
            return a.post_title.localeCompare(b.post_title);
        }
    );

    return {
        special: sortedSpecial.map(item => ({
            id: item.ID.toString(),
            name: item.post_title
        })),
        yokai: sortedYokai.map(item => ({
            id: item.ID.toString(),
            name: item.post_title
        })),
        alian: sortedAlian.map(item => ({
            id: item.ID.toString(),
            name: item.post_title
        }))
    };
}



export async function getData(idRequested) {
    const jsonObj = await makeJSONobject();
    const objMatch = jsonObj.filter(obj => obj.ID.toString() === idRequested);

    // extract object value in filtered array if any
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    } else {
        objReturned = {};
    }

    return objReturned;
}
