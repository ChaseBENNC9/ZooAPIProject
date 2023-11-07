import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { format } from "date-fns";

const WorkerupdateForm = ({ onUpdateWorker,currentData, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [firstName, setFirstName] = useState(currentData.firstName);
  const [lastName, setLastName] = useState(currentData.lastName);
  const [zooId, setZooId] = useState(currentData.zooId);

  const [hire, setHire] = useState(currentData.hireDate); //The string of the workers hire date
  const [hireDate, setHireDate] = useState(format(new Date(currentData.hireDate), "yyyy-MM-dd"),); //The Date object of the workers hire date

  const [termination, setTermination] = useState(currentData.terminationDate); //The string of the workers termination date
  const [terminationDate, setTerminationDate] = useState(
    termination != null
      ? format(new Date(currentData.terminationDate), "yyyy-MM-dd")
      : null,

  ); //The Date object of the workers termination date

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateWorker = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/api/v1/workers/${currentData.id}`, {
        zooId: zooId,
        firstName: firstName,
        lastName: lastName,
        hireDate:hire,
        terminationDate:termination,
      });

      if (res.status === 200) {
        const data = res.data.data;

        console.log("2)", data);

        onUpdateWorker(data);
        setFirstName("");
        setLastName("");
        setHireDate("");
        setTerminationDate("");
        hideForm();
      }
    } catch (error) {
      console.log(error);

      setIsError(true);

      if (
        error.response.data.msg ===
        "\nInvalid `prisma.worker.update()` invocation:\n\n\nForeign key constraint failed on the field: `Worker_zooId_fkey (index)`"
      ) {
        setErrorMessage("Zoo ID does not exist");
      } else setErrorMessage(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWorker();
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
          <Label>Worker Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            
          />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value) }
            
          />
        </FormGroup>


        <FormGroup>
          <Label>Hire Date</Label>
          <Input
            type="date"
            name="hire"
            value={hireDate}
            
            onChange={(e) => {
              setHireDate(e.target.value);
              let objdate = new Date(e.target.value);
              if (!isNaN(objdate)) {
                console.log(objdate.toISOString());
                setHire(objdate.toISOString());
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
              let objdate = new Date(e.target.value);
              if (!isNaN(objdate)) {
                console.log(objdate.toISOString());
                setTermination(objdate.toISOString());
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

export default WorkerupdateForm;
