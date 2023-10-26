import { useEffect, useState } from "react";
import axios from "axios";
import { Table,Button } from "reactstrap";
import ZooCreateForm from "../forms/ZooCreateForm";
import ZooUpdateForm from "../forms/ZooUpdateForm";

const ZoosTable = ({ newData }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com"; // replace with your Render application's URL

  const [data, setData] = useState([])
  const [isUpdate,setIsUpdate] = useState([{value: false}])

  useEffect(() => {
    const getZoosData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/zoos`)
        
        setData(res.data.data)
        setIsUpdate(res.data.data.map((d) => {return {value: false}}))
      } catch (error) {
        console.log(error)
      }   
    }
    getZoosData()
  }, [])


  const deleteZoo =  (id) => {
      if(window.confirm("Are you Sure? \n If you Delete this row it will be lost forever!"))
    {
      axios.delete(`${BASE_URL}/api/v1/zoos/${id}`)
      setData(
        data.filter((data) => {
          return data.id !== id;
        })
      );
    }

  };
  const handleCreateZoo = (newZoo) => {
    setData([...data, newZoo]);
    const updatedIsUpdate =  [...isUpdate];
    updatedIsUpdate.push({value: false});
    setIsUpdate(updatedIsUpdate);

  };

  const handleUpdateZoo = (updatedZoo, id) => {
    setData(
      data.map((zoo) => {
        return zoo.id === id ? updatedZoo : zoo;
      })
      

    );
    setIsUpdate(data.map((d) => {return {value: false}}))
    console.log(isUpdate);
  };
  const displayZoosData = (
    
    data.map((d,index) => {

      let date = new Date(d.established).toDateString()
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.city}</td>
          <td>{d.country}</td>
          <td>{date}</td>
          <td> {(!isUpdate[index].value) ? <Button color="primary" onClick={() => test(index,true)}>Update</Button> :<Button color="danger" onClick={() => test(index,false)}>Cancel</Button> }</td>
          <td> <Button color="danger" onClick={() => deleteZoo(d.id)}>Delete</Button></td>

        </tr>
      )
    })
  )

    function test(i,bool)
    {
       // Create a copy of the current state
  const updatedIsUpdate =  data.map((d) => {return {value: false}});
  // Update the value of the specified index
  updatedIsUpdate[i].value = bool;
  
  // Update the state
  setIsUpdate(updatedIsUpdate);
    }
    const isAnyUpdateActive = isUpdate.some(item => item.value === true);
    let activeZooId = 0;
    let activeZoo = {}
    if(isAnyUpdateActive)
    {
      const activeUpdateIndex = isUpdate.findIndex(item => item.value === true);
       activeZooId = data[activeUpdateIndex].id;
      activeZoo = data[activeUpdateIndex];
    }

  return (
    <>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Country</th>
          <th>Established</th>
        </tr>
      </thead>
      <tbody>
        {displayZoosData}
      </tbody>
    </Table>
   {(!isAnyUpdateActive) ? <ZooCreateForm onCreateZoo={handleCreateZoo} /> :  <ZooUpdateForm zooId={activeZooId} OnUpdateZoo={handleUpdateZoo} currentData={activeZoo}/>}

    
   
    
    </>
  );
};

export default ZoosTable;