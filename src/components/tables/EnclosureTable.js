import { useEffect, useState } from "react";
import axios from "axios";
import { Table,Button } from "reactstrap";

const EnclosuresTable = ({ newData }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com"; // replace with your Render application's URL

  const [data, setData] = useState([])

  useEffect(() => {
    const getZoosData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/enclosures`)
        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }   
    }
    getZoosData()
  }, [])


  const deleteZoo =  (id) => {
   
      axios.delete(`${BASE_URL}/api/v1/enclosures/${id}`)
      setData(
        data.filter((data) => {
          return data.id !== id;
        })
      );
  };
  const handleCreateEnclosure = (newZoo) => {
    setData([...data, newZoo]);
  };
  const displayEnclosuresData = (
    data.map((d) => {
      let temp = d.temporary.toString()
      console.log(d)
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.type}</td>
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
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {displayEnclosuresData}
      </tbody>
    </Table>

    </>
  );
};

export default EnclosuresTable;