import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Table, Button } from "reactstrap";
import { deleteRow, GetTableData } from "./GenericTable";
import { de } from "date-fns/locale";

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
            onClick={() => setData(deleteRow(d.id, data, "enclosures"))}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Sex</th>
            <th>Birth Date</th>
            <th>Death Date</th>
          </tr>
        </thead>
        <tbody>{displayAnimalsData}</tbody>
      </Table>
      <Button color="success">Create Animal</Button>
    </>
  );
};
export default AnimalsTable;
