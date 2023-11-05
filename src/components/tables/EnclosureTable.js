import { useEffect, useState } from "react";
import {Modal, ModalHeader, ModalBody, Table,Button } from "reactstrap";
import EnclosureCreateForm from "../forms/Enclosure/EnclosureCreateForm";
import EnclosureUpdateForm from "../forms/Enclosure/EnclosureUpdateForm";
import { deleteRow ,GetTableData} from "./GenericTable";
import { set } from "date-fns";
const EnclosuresTable = () => {

  const [data, setData] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [UpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [activeUpdateEnclosureData, setActiveUpdateEnclosureData] = useState(null);
  const [activeUpdateEnclosureId, setActiveUpdateEnclosureId] = useState(null);

  useEffect(() => {
    GetTableData("enclosures").then((res) => setData(res))
  }, [])



  const handleCreateEnclosure = (newEnclosure) => {
    setData([...data, newEnclosure]);
  };

  const handleUpdateEnclosure = (updatedEnclosure) => {
    setData(
      data.map((enclosure) => {
        return enclosure.id === updatedEnclosure.id ? updatedEnclosure : enclosure;
      })
      

    );
  };
  const displayEnclosuresData = (
    data.map((d) => {
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.type}</td>
          <td>{(d.temporary) ? "True" : "False"}</td>
          <td> <Button color="primary" onClick={() => showUpdateForm(d)} >Update</Button></td>
          <td> <Button color="danger" onClick={() => setData(deleteRow(d.id,data,"enclosures"))}>Delete</Button></td>

        </tr>
      )
    })
  )
  const showUpdateForm = (enclosure) => {
    setActiveUpdateEnclosureData(enclosure);
    setActiveUpdateEnclosureId(enclosure.id);
    setUpdateFormVisible(true);
  };

const hideUpdateForm = () => {
  setUpdateFormVisible(false);
};
  const toggleCreateForm = () => setShowCreateForm(!showCreateForm);
  return (
    <>
    <Modal isOpen={showCreateForm} toggle={toggleCreateForm} backdrop="static">
      <ModalHeader toggle={toggleCreateForm}>Create new Enclosure</ModalHeader>
      <ModalBody>
        <EnclosureCreateForm onCreateEnclosure={handleCreateEnclosure} hideForm={toggleCreateForm} />
      </ModalBody>

    </Modal>
    
    <Modal isOpen={UpdateFormVisible} toggle={hideUpdateForm} backdrop="static">
      <ModalHeader toggle={hideUpdateForm}>Update Enclosure with ID: {activeUpdateEnclosureId}</ModalHeader>
      <ModalBody>
      <EnclosureUpdateForm OnUpdateZoo={handleUpdateEnclosure} currentData={activeUpdateEnclosureData} hideForm={hideUpdateForm}/>
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
    <Button color="success" onClick={toggleCreateForm}>Create Enclosure</Button>

    </>
  );
};

export default EnclosuresTable;