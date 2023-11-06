import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Table, Button } from "reactstrap";
import { deleteRow, GetTableData } from "./GenericTable";
import AnimalCreateForm from "../forms/Animal/AnimalCreateForm";
import AnimalUpdateForm from "../forms/Animal/AnimalUpdateForm";
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
          <Button color="primary" onClick={() => showUpdateForm(d)}>Update</Button>
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

  const handleUpdateAnimal = (updatedAnimal) => {
    setData(
      data.map((animal) => {
        return animal.id === updatedAnimal.id ? updatedAnimal : animal;
      }),
    );
  };
  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const showUpdateForm = (animal) => {
    setActiveUpdateAnimalData(animal);
    setActiveUpdateAnimalId(animal.id);
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

      <Modal
        isOpen={UpdateFormVisible}
        toggle={hideUpdateForm}
        backdrop="static"
      >
        <ModalHeader toggle={hideUpdateForm}>
          Update Zoo with ID: {activeUpdateAnimalId}
        </ModalHeader>
        <ModalBody>
          <AnimalUpdateForm
            OnUpdateZoo={handleUpdateAnimal}
            currentData={activeUpdateAnimalData}
            hideForm={hideUpdateForm}
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
