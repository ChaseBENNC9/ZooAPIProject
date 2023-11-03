import axios from "axios";
import { da } from "date-fns/locale";
const BASE_URL = "https://id607001-bennc9-bit.onrender.com";
const deleteRow =  (id,data,type) => {
    if(window.confirm("Are you Sure? \n If you Delete this row it will be lost forever!"))
    {
        axios.delete(`${BASE_URL}/api/v1/${type}/${id}`)
        data = data.filter((data) => {
            return data.id !== id;
        })
    }
      return data

};


const GetTableData = async (type) =>{
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/${type}`)
        return res.data.data
      } catch (error) {
        console.log(error)
      }

    
    
}

export {deleteRow,GetTableData}