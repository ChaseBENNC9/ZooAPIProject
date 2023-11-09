import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Table, Button } from "reactstrap";
import EnclosureCreateForm from "../forms/Enclosure/EnclosureCreateForm";
import EnclosureUpdateForm from "../forms/Enclosure/EnclosureUpdateForm";
import {
  deleteRow,
  getTableData,
  handleCreateData,
  handleUpdateData,
} from "./GenericTable";

const EnclosuresTable = () => {
  const [data, setData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [UpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [activeUpdateData, setActiveUpdateData] = useState(null);
  const [activeUpdateId, setActiveUpdateId] = useState(null);

  useEffect(() => {
    getTableData("enclosures").then((res) => setData(res));
  }, []);

  const handleCreateEnclosure = (newEnclosure) => {
    setData(handleCreateData(data, newEnclosure));
    getTableData("enclosures").then((res) => setData(res));
  };

  const handleUpdateEnclosure = (updatedEnclosure) => {
    setData(handleUpdateData(updatedEnclosure, data));
  };
  const displayEnclosuresData = data.map((d, index) => {
    return (
      <tr key={index}>
        <td>{d.name}</td>
        <td>{d.type}</td>
        <td>{d.temporary ? "True" : "False"}</td>
        <td>{d.visitorCapacity || "N/A"}</td>
        <td>
          {" "}
          <Button color="primary" onClick={() => showUpdateForm(d)}>
            Update
          </Button>
        </td>
        <td>
          {" "}
          <Button
            color="danger"
            onClick={() => setData(deleteRow(d.id, data, "enclosures"))}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });
  const showUpdateForm = (enclosure) => {
    setActiveUpdateData(enclosure);
    setActiveUpdateId(enclosure.id);
    setUpdateFormVisible(true);
  };

  const hideUpdateForm = () => {
    setUpdateFormVisible(false);
  };
  const toggleCreateForm = () => setShowCreateForm(!showCreateForm);
  return (
    <>
      <Modal
        isOpen={showCreateForm}
        toggle={toggleCreateForm}
        backdrop="static"
      >
        <ModalHeader toggle={toggleCreateForm}>
          Create new Enclosure
        </ModalHeader>
        <ModalBody>
          <EnclosureCreateForm
            onCreateEnclosure={handleCreateEnclosure}
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
          Update Enclosure with ID: {activeUpdateId}
        </ModalHeader>
        <ModalBody>
          <EnclosureUpdateForm
            onUpdateEnclosure={handleUpdateEnclosure}
            currentData={activeUpdateData}
            hideForm={hideUpdateForm}
          />
        </ModalBody>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Temporary</th>
            <th>Visitor Capacity</th>
          </tr>
        </thead>
        <tbody>{displayEnclosuresData}</tbody>
      </Table>
      <Button color="success" onClick={toggleCreateForm}>
        Create Enclosure
      </Button>
    </>
  );
};

export default EnclosuresTable;
