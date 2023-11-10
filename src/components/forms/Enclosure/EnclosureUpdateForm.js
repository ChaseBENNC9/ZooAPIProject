import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";

const EnclosureUpdateForm = ({ onUpdateEnclosure, currentData, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState(currentData.name);
  const [zooId, setZooId] = useState(currentData.zooId);
  const [type, setType] = useState(currentData.type);
  const [temporary, setTemporary] = useState(currentData.temporary);
  const [visitorCapacity, setVisitorCapacity] = useState(
    currentData.visitorCapacity,
  );
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateEnclosure = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/v1/enclosures/${currentData.id}`,
        {
          name: name,
          type: type,
          temporary: temporary,
          visitorCapacity: visitorCapacity,
          zooId: zooId,
        },
      );

      if (res.status === 200) {
        const data = res.data.data;

        onUpdateEnclosure(data);
        setName("");
        setType("");
        setTemporary("");
        setVisitorCapacity("");
        setZooId("");
        hideForm();
      }
    } catch (error) {
      console.log(error);

      setIsError(true);
      if (
        error.response.data.msg ===
        "\nInvalid `prisma.enclosure.update()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)"
      ) {
        setErrorMessage("Enclosure with that Name already exists");
      } else if (
        error.response.data.msg ===
        "\nInvalid `prisma.enclosure.update()` invocation:\n\n\nForeign key constraint failed on the field: `Enclosure_zooId_fkey (index)`"
      ) {
        setErrorMessage("Zoo ID does not exist");
      } else setErrorMessage(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEnclosure();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Zoo ID</Label>
          <Input
            type="text"
            name="zooid"
            placeholder="Enter Zoo ID"
            value={zooId}
            onChange={(e) => setZooId(Number(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Enclosure Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Enclosure Type</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Visitor Capacity</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter Visitor Capacity"
            value={visitorCapacity}
            onChange={(e) => setVisitorCapacity(Number(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Temporary Enclosure</Label>
          <Input
            type="select"
            name="temporary"
            onChange={(e) => {
              setTemporary(e.target.value === "true");
            }}
          >
            <option>false</option>
            <option>true</option>
          </Input>
        </FormGroup>

        {/* 
          Display an alert message if there is an error
        */}
        {isError ? <Alert color="danger">{errorMessage}</Alert> : null}
        <Button>Submit</Button>
        <Button
          color="danger"
          onClick={hideForm}
          style={{
            marginLeft: "15px",
          }}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default EnclosureUpdateForm;
