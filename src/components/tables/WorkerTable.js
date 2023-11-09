import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Table, Button } from "reactstrap";
import WorkerCreateForm from "../forms/Worker/WorkerCreateForm";
import WorkerUpdateForm from "../forms/Worker/WorkerUpdateForm";
import {
  deleteRow,
  getTableData,
  handleCreateData,
  handleUpdateData,
} from "./GenericTable";

const WorkersTable = () => {
  const [data, setData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [UpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [activeUpdateData, setActiveUpdateData] = useState(null);
  const [activeUpdateId, setActiveUpdateId] = useState(null);

  useEffect(() => {
    getTableData("workers").then((res) => setData(res));
  }, []);

  const displayWorkersData = data.map((d, index) => {
    let hireDate = new Date(d.hireDate).toDateString();
    let terminationDate =
      d.terminationDate != null
        ? new Date(d.terminationDate).toDateString()
        : "N/A";
    return (
      <tr key={index}>
        <td>{d.firstName}</td>
        <td>{d.lastName}</td>
        <td>{hireDate}</td>
        <td>{terminationDate}</td>
        <td>
          <Button color="primary" onClick={() => showUpdateForm(d)}>
            Update
          </Button>
        </td>
        <td>
          <Button
            color="danger"
            onClick={() => setData(deleteRow(d.id, data, "workers"))}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });
  const handleCreateWorker = (newWorker) => {
    setData(handleCreateData(data, newWorker));
    getTableData("workers").then((res) => setData(res));
  };

  const handleUpdateWorker = (updatedWorker) => {
    setData(handleUpdateData(updatedWorker, data));
  };
  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const showUpdateForm = (worker) => {
    setActiveUpdateData(worker);
    console.log(worker);
    setActiveUpdateId(worker.id);
    setUpdateFormVisible(true);
  };

  const hideUpdateForm = () => {
    setUpdateFormVisible(false);
  };
  return (
    <>
      <Modal
        isOpen={showCreateForm}
        toggle={toggleCreateForm}
        backdrop="static"
      >
        <ModalHeader toggle={toggleCreateForm}>Create new Worker</ModalHeader>
        <ModalBody>
          <WorkerCreateForm
            onCreateWorker={handleCreateWorker}
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
          Update Worker with ID: {activeUpdateId}
        </ModalHeader>
        <ModalBody>
          <WorkerUpdateForm
            onUpdateWorker={handleUpdateWorker}
            currentData={activeUpdateData}
            hideForm={hideUpdateForm}
          />
        </ModalBody>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Hire Date</th>
            <th>Termination Date</th>
          </tr>
        </thead>
        <tbody>{displayWorkersData}</tbody>
      </Table>
      <Button color="success" onClick={toggleCreateForm}>
        Create Worker
      </Button>
    </>
  );
};
export default WorkersTable;
