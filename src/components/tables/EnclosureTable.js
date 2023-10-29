import { useEffect, useState } from "react";
import axios from "axios";
import {Modal, ModalHeader, ModalBody, Table,Button } from "reactstrap";
import EnclosureCreateForm from "../forms/Enclosure/EnclosureCreateForm";

const EnclosuresTable = ({ newData }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com"; // replace with your Render application's URL

  const [data, setData] = useState([])
  const [showForm, setShowForm] = useState(false);


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
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.type}</td>
          <td>{(d.temporary) ? "True" : "False"}</td>
          <td> <Button color="primary" >Update</Button></td>
          <td> <Button color="danger" onClick={() => deleteZoo(d.id)}>Delete</Button></td>

        </tr>
      )
    })
  )

  const toggleForm = () => setShowForm(!showForm);
  return (
    <>
    <Modal isOpen={showForm} toggle={toggleForm} backdrop="static">
      <ModalHeader toggle={toggleForm}></ModalHeader>
      <ModalBody>
        <EnclosureCreateForm onCreateEnclosure={handleCreateEnclosure} hideForm={toggleForm} />
      </ModalBody>

    </Modal>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Temporary</th>
        </tr>
      </thead>
      <tbody>
        {displayEnclosuresData}
        <Button color="success" onClick={toggleForm}>Create Zoo</Button>

      </tbody>
    </Table>
    </>
  );
};

export default EnclosuresTable;