import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Table, Button } from "reactstrap";
import { deleteRow, GetTableData } from "./GenericTable";
import AnimalCreateForm from "../forms/Animal/AnimalCreateForm";

const AnimalsTable = () => {
  const [data, setData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [UpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [activeUpdateAnimalData, setActiveUpdateAnimalData] = useState(null);
  const [activeUpdateAnimalId, setActiveUpdateAnimalId] = useState(null);

  useEffect(() => {
    GetTableData("animals").then((res) => setData(res));
  }, []);

  const displayAnimalsData = data.map((d) => {
    let birthDate = new Date(d.birthDate).toDateString();
    let deathDate =
      d.deathDate != null ? new Date(d.deathDate).toDateString() : "N/A";



    return (
      <tr key={d.id}>
        <td>{d.id}</td>
        <td>{d.name}</td>
        <td>{d.species}</td>
        <td>{d.sex}</td>
        <td>{birthDate}</td>
        <td>{deathDate}</td>
        <td>
          {" "}
          <Button color="primary">Update</Button>
        </td>
        <td>
          {" "}
          <Button
            color="danger"
            onClick={() => setData(deleteRow(d.id, data, "animals"))}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });
  const handleCreateAnimal = (newAnimal) => {
    setData([...data, newAnimal]);
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
        <ModalHeader toggle={toggleCreateForm}>
          Create new Enclosure
        </ModalHeader>
        <ModalBody>
          <AnimalCreateForm
            onCreateAnimal={handleCreateAnimal}
            hideForm={toggleCreateForm}
          />
        </ModalBody>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Species</th>
            <th>Sex</th>
            <th>Birth Date</th>
            <th>Death Date</th>
          </tr>
        </thead>
        <tbody>{displayAnimalsData}</tbody>
      </Table>
      <Button color="success" onClick={toggleCreateForm}>Create Animal</Button>
    </>
  );
};
export default AnimalsTable;
