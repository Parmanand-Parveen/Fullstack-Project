import axios from "axios"

const Backend_url =  import.meta.env.VITE_BACKEND_URL

const apiHandler =async (method,url,data,headers,params) => {

    try {
        const response = await axios({
            method : method,
            url : `${Backend_url}${url}`,
            data: data ,
            headers : headers,
            params: params
        })
        return response
        
    } catch (error) {
        console.log(error)
    }    
}

export default apiHandler