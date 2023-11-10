import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
const WorkerCreateForm = ({ onCreateWorker, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zooId, setZooId] = useState("");
  const [hireDate, setHireDate] = useState(""); //The Date object of the workers hire date
  const [hire, setHire] = useState(""); //The string of the workers hire date
  const [terminationDate, setTerminationDate] = useState(""); //The Date object of the workers termination date
  const [termination, setTermination] = useState(null); //The string of the workers termination date
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createWorker = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/workers`, {
        zooId: zooId,
        firstName: firstName,
        lastName: lastName,
        hireDate: hire,
        terminationDate: termination,
      });

      if (res.status === 201) {
        const data = {
          zooId: zooId,
          firstName: firstName,
          lastName: lastName,
          hireDate: hire,
          terminationDate: termination,
        };

        onCreateWorker(data);
        setFirstName("");
        setLastName("");
        setHireDate("");
        setTerminationDate("");
        hideForm();
      }
    } catch (error) {

      setIsError(true);

      if (
        error.response.data.msg ===
        "\nInvalid `prisma.worker.create()` invocation:\n\n\nForeign key constraint failed on the field: `Worker_zooId_fkey (index)`"
      ) {
        setErrorMessage("Zoo ID does not exist");
      } else setErrorMessage(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createWorker();
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
          <Label>Worker Name *</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Last Name *</Label>
          <Input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Hire Date *</Label>
          <Input
            type="date"
            name="hire"
            value={hireDate}
            required
            onChange={(e) => {
              setHireDate(e.target.value);
              let hireDateObj = new Date(e.target.value);
              if (!isNaN(hireDateObj)) {
                setHire(hireDateObj.toISOString());
              }
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Termination Date</Label>
          <Input
            type="date"
            name="termination"
            value={terminationDate}
            onChange={(e) => {
              setTerminationDate(e.target.value);
              let terminationDateObj = new Date(e.target.value);
              if (!isNaN(terminationDateObj)) {
                setTermination(terminationDateObj.toISOString());
              }
            }}
          />
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

export default WorkerCreateForm;
