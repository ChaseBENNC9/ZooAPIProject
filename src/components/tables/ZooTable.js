import { useEffect, useState } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import ZooCreateForm from "../forms/Zoo/ZooCreateForm";
import ZooUpdateForm from "../forms/Zoo/ZooUpdateForm";
import {
  deleteRow,
  GetTableData,
  handleCreateData,
  handleUpdateData,
} from "./GenericTable";

const ZoosTable = () => {
  const [data, setData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [UpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [activeUpdateId, setActiveUpdateId] = useState(null);
  const [activeUpdateData, setActiveUpdateData] = useState(null);
  useEffect(() => {
    GetTableData("zoos").then((res) => setData(res));
  }, []);

  const handleCreateZoo = (newZoo) => {
    setData(handleCreateData(data, newZoo));
    GetTableData("zoos").then((res) => setData(res));
  };

  const handleUpdateZoo = (updatedZoo) => {
    setData(handleUpdateData(updatedZoo, data));
  };
  const displayZoosData = data.map((d, index) => {
    let date = new Date(d.established).toDateString();
    return (
      <tr key={index}>
        <td>{d.name}</td>
        <td>{d.city}</td>
        <td>{d.country}</td>
        <td>{date}</td>
        <td>
          <Button color="primary" onClick={() => showUpdateForm(d)}>
            Update
          </Button>
        </td>
        <td>
          <Button
            color="danger"
            onClick={() => setData(deleteRow(d.id, data, "zoos"))}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  const showUpdateForm = (zoo) => {
    setActiveUpdateData(zoo);
    setActiveUpdateId(zoo.id);
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
      <Modal
        isOpen={showCreateForm}
        toggle={toggleCreateForm}
        backdrop="static"
      >
        <ModalHeader toggle={toggleCreateForm}>Create new Zoo</ModalHeader>
        <ModalBody>
          <ZooCreateForm
            onCreateZoo={handleCreateZoo}
            hideForm={toggleCreateForm}
          />
        </ModalBody>
      </Modal>

      <Modal
        isOpen={UpdateFormVisible}
        toggle={hideUpdateForm}
        backdrop="static"
      >
        <ModalHeader toggle={hideUpdateForm}>
          Update Zoo with ID: {activeUpdateId}
        </ModalHeader>
        <ModalBody>
          <ZooUpdateForm
            OnUpdateZoo={handleUpdateZoo}
            currentData={activeUpdateData}
            hideForm={hideUpdateForm}
          />
        </ModalBody>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Established</th>
          </tr>
        </thead>
        <tbody>{displayZoosData}</tbody>
      </Table>
      <Button color="success" onClick={toggleCreateForm}>
        Create Zoo
      </Button>
    </>
  );
};

export default ZoosTable;
