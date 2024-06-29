import axios from "axios";
import { CMS_URL } from "../../components/const/urlConst";

export const httpList = async function(url , token){
    if(token ===  true){
        return await axios.get( CMS_URL + url ,{
            headers: { Authorization : "Bearer " + localStorage.getItem("jwt")}
          } )
    }else{
        return await axios.get( CMS_URL + url)
    }

}

export const httpGet = async function(url,token){
    if(token ===  true){
        return await axios.get( CMS_URL + url ,{
            headers: { Authorization : "Bearer " + localStorage.getItem("jwt")}
          } )
    }else{
        return await axios.get( CMS_URL + url)
    }
}