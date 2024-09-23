import axios from "axios";


const apiHandldler = async (method, url, data,headers,params) => {
    try {
        const response = await axios({
            method:`${method}`,
            url:`${url}`,
            data:data?data:null,
            headers:headers?headers:null,
            params:params?params:null    
        })
        return response.data
    } catch (error) {
        console.log(error)  
    }
}

export default apiHandldler