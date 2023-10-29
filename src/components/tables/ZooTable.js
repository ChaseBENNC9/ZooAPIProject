import { useEffect, useState } from "react";
import axios from "axios";
import { Table,Button,Modal, ModalHeader, ModalBody, } from "reactstrap";
import ZooCreateForm from "../forms/Zoo/ZooCreateForm";
import ZooUpdateForm from "../forms/Zoo/ZooUpdateForm";

const ZoosTable = ({ newData }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com"; // replace with your Render application's URL

  const [data, setData] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [UpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [activeUpdateZooId, setActiveUpdateZooId] = useState(null);
  const [activeUpdateZooData, setActiveUpdateZooData] = useState(null);
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
    console.log("ELLO MATE")
    console.log(newZoo);
    console.log(...data, newZoo);
    setData([...data, newZoo]);

  };

  const handleUpdateZoo = (updatedZoo, id) => {
    setData(
      data.map((zoo) => {
        return zoo.id === id ? updatedZoo : zoo;
      })
      

    );
  };
  const displayZoosData = (
    
    data.map((d,index) => {

      let date = new Date(d.established).toDateString()
      return (
        <tr key={d.id}>
          <td>{d.id}</td>
          <td>{d.name}</td>
          <td>{d.city}</td>
          <td>{d.country}</td>
          <td>{date}</td>
          <td> <Button color="primary" onClick={() => showUpdateForm(d)}>Update</Button></td>
          <td> <Button color="danger" onClick={() => deleteZoo(d.id)}>Delete</Button></td>

        </tr>
      )
    })
  )


  const showUpdateForm = (zoo) => {
    setActiveUpdateZooId(zoo.id);
    setActiveUpdateZooData(zoo);
    setUpdateFormVisible(true);
  };

const hideUpdateForm = () => {
  setUpdateFormVisible(false);
};

    const toggleCreateForm = () => {
      setShowCreateForm(!showCreateForm);
    };


  return (
    <>
          <Modal isOpen={showCreateForm} toggle={toggleCreateForm} backdrop="static">
      <ModalHeader toggle={toggleCreateForm}>Create new Zoo</ModalHeader>
      <ModalBody>
        <ZooCreateForm onCreateZoo={handleCreateZoo} hideForm={toggleCreateForm}/>
      </ModalBody>

    </Modal>

      <Modal isOpen={UpdateFormVisible} toggle={hideUpdateForm} backdrop="static">
      <ModalHeader toggle={hideUpdateForm}>Update Zoo with ID: {activeUpdateZooId}</ModalHeader>
      <ModalBody>
      <ZooUpdateForm zooId={activeUpdateZooId} OnUpdateZoo={handleUpdateZoo} currentData={activeUpdateZooData} hideForm={hideUpdateForm}/>
      </ModalBody>

    </Modal>

   
      
    <Table>
      <thead>
        <tr>
          <th>ID</th>
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
    <Button color="success" onClick={toggleCreateForm} style={{width:"100%",height:"50px"}}>Create Zoo</Button>

    
   
    
    </>
  );
};

export default ZoosTable;