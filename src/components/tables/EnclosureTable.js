import { useEffect, useState } from "react";
import {Modal, ModalHeader, ModalBody, Table,Button } from "reactstrap";
import EnclosureCreateForm from "../forms/Enclosure/EnclosureCreateForm";
import { deleteRow ,GetTableData} from "./GenericTable";
const EnclosuresTable = () => {

  const [data, setData] = useState([])
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    GetTableData("enclosures").then((res) => setData(res))
  }, [])



  const handleCreateEnclosure = (newEnclosure) => {
    setData([...data, newEnclosure]);
  };
  const displayEnclosuresData = (
    data.map((d) => {
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.type}</td>
          <td>{(d.temporary) ? "True" : "False"}</td>
          <td> <Button color="primary" >Update</Button></td>
          <td> <Button color="danger" onClick={() => setData(deleteRow(d.id,data,"enclosures"))}>Delete</Button></td>

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

      </tbody>
    </Table>
    <Button color="success" onClick={toggleForm}>Create Enclosure</Button>

    </>
  );
};

export default EnclosuresTable;