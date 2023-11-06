import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";

const EnclosureCreateForm = ({ onUpdateEnclosure, currentData, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState(currentData.name);
  const [zooid, setzooid] = useState(currentData.zooId);
  const [type, setType] = useState(currentData.type);
  const [temporary, setTemporary] = useState(currentData.temporary);
  const [visitorCapacity, setVisitorCapacity] = useState(
    currentData.visitorCapacity,
  );
  const [isError, setIsError] = useState(false);

  const updateEnclosure = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/enclosures`, {
        name: name,
        type: type,
        temporary: temporary,
        visitorCapacity: visitorCapacity,
        zooId: zooid,
      });

      if (res.status === 201) {
        const data = res.data.data[res.data.data.length - 1];
        console.log("2)", data);

        onUpdateEnclosure(data);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEnclosure();
    setName("");
    setType("");
    setTemporary("");
    setVisitorCapacity("");
    setzooid("");

    hideForm();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Zoo ID *</Label>
          <Input
            type="text"
            name="zooid"
            placeholder="Enter Zoo ID"
            value={zooid}
            onChange={(e) => setzooid(Number(e.target.value))}
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
              console.log(temporary);
            }}
          >
            <option>false</option>
            <option>true</option>
          </Input>
        </FormGroup>

        {/* 
          Display an alert message if there is an error
        */}
        {isError ? (
          <Alert color="danger">Something went wrong. Please try again.</Alert>
        ) : null}
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
