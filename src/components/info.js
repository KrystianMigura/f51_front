import { Query } from "./../query/query";

const info = (async function() {
    const info = await Query.get('/isadmin').then(response => { return response.json();});
    return info.size;
})()

export default info