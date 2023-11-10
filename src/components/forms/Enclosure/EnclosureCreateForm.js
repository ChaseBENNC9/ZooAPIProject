import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
const EnclosureCreateForm = ({ onCreateEnclosure, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState("");
  const [zooId, setZooId] = useState("");
  const [type, setType] = useState("");
  const [temporary, setTemporary] = useState(false);
  const [visitorCapacity, setVisitorCapacity] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const createEnclosure = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/enclosures`, {
        name: name,
        type: type,
        temporary: temporary,
        visitorCapacity: visitorCapacity === "" ? null : visitorCapacity,
        zooId: zooId,
      });

      if (res.status === 201) {
        const data = {
          name: name,
          type: type,
          temporary: temporary,
          visitorCapacity: visitorCapacity === "" ? null : visitorCapacity,
          zooId: zooId,
        };

        onCreateEnclosure(data);
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
        "\nInvalid `prisma.enclosure.create()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)"
      ) {
        setErrorMessage("Enclosure with that Name already exists");
      } else if (
        error.response.data.msg ===
        "\nInvalid `prisma.enclosure.create()` invocation:\n\n\nForeign key constraint failed on the field: `Enclosure_zooId_fkey (index)`"
      ) {
        setErrorMessage("Zoo ID does not exist");
      } else setErrorMessage(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEnclosure();
  };

  return (
    <>
      <p style={{ color: "red", fontSize: 12 }}>* required input</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Zoo ID *</Label>
          <Input
            type="text"
            name="zooid"
            placeholder="Enter Zoo ID"
            value={zooId}
            onChange={(e) => setZooId(Number(e.target.value))}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Enclosure Name *</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Enclosure Type *</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
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
          <Label>Temporary Enclosure *</Label>
          <Input
            type="select"
            name="temporary"
            onChange={(e) => {
              setTemporary(e.target.value === "true");
            }}
            required
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

export default EnclosureCreateForm;
