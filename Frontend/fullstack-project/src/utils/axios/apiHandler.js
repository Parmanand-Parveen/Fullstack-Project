import axios from "axios"
const apiHandler =async (method,url,data,headers,params) => {

    try {
        const response = await axios({
            method : method,
            url : url,
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