import { useEffect, useState } from "react";
import axios from "axios";
import { Table,Button } from "reactstrap";
import ZooCreateForm from "../forms/ZooCreateForm";

const ZoosTable = ({ newData }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com"; // replace with your Render application's URL

  const [data, setData] = useState([])

  useEffect(() => {
    const getZoosData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/zoos`)
        setData(res.data.data)
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
  };
  const displayZoosData = (
    data.map((d) => {
      let date = new Date(d.established).toDateString()
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.city}</td>
          <td>{d.country}</td>
          <td>{date}</td>
          <td> <Button color="primary" >Update</Button></td>
          <td> <Button color="danger" onClick={() => deleteZoo(d.id)}>Delete</Button></td>

        </tr>
      )
    })
  )

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
    <ZooCreateForm onCreateZoo={handleCreateZoo} />
    </>
  );
};

export default ZoosTable;