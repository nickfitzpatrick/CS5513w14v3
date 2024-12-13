
import got from 'got';

const dataURL = 
"https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/special";

async function getJSON(url) {
    let jsonString;
    try {
        // next line uses got synchronouosly to retrive via https our json from wp site
        jsonString = await got(url);
        const jsonObj = JSON.parse(jsonString.body);
        console.log("Parsed JSON:", jsonObj);
        return jsonObj;
    } catch(error) {
        console.log(error);
        return []
    }  
}



export async function getAllIds() {
    const jsonObj = await getJSON(dataURL);

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
    const jsonObj = await getJSON(dataURL);

    //sort json array by name property
    jsonObj.sort(function(a,b) {
            return a.post_title.localeCompare(b.post_title);
        }
    );

    //use map() or array to extract just id + name properties into new array of object values
    return jsonObj.map(
        function(item) {
            return {
                id: item.ID.toString(),
                name: item.post_title
            };
        }
    );
}



export async function getData(idRequested) {
    const jsonObj = await getJSON(dataURL);

    const objMatch = jsonObj.filter(obj => {
        return obj.ID.toString() === idRequested;
    });
    
    // extract object value in filtered array if any
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    } else {
        objReturned = {};
    }

    return objReturned;
}