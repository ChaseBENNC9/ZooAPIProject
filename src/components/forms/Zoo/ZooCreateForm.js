/**
 * @summary Handles the Creation form for the Zoo table
 * @author Chase Bennett-Hill
 */

import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, Label, FormGroup, Input } from "reactstrap";

const ZooCreateForm = ({ onCreateZoo, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [established, setEstablished] = useState("");
  const [establishedDate, setEstablishedDate] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * @description Handles the Post request to the API with the specified data
   */
  const createZoo = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/zoos`, {
        name: name,
        city: city,
        country: country,
        established: established,
      });

      if (res.status === 201) {
        //When the request is successful the data is added to the table and the modal is closed
        const data = {
          name: name,
          city: city,
          country: country,
          established: established,
        };

        onCreateZoo(data);
        setName("");
        setCity("");
        setCountry("");
        setEstablished("");
        setEstablishedDate("");
        hideForm();
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      if (
        error.response.data.msg ===
        "\nInvalid `prisma.zoo.create()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)"
      ) {
        setErrorMessage("Zoo with that Name already exists");
      } else {
        setErrorMessage(error.response.data.msg);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createZoo();
  };

  return (
    <>
      {/* 
        When the form is submitted, it will call the handleSubmit 
        function above. 
      */}
      <p style={{ color: "red", fontSize: 12 }}>* required input</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Zoo Name *</Label>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            /*
              This attribute detects when the value of an input element changes
            */
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>City *</Label>
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Country *</Label>
          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="date"
            name="established"
            placeholder="Established Date"
            value={establishedDate}
            onChange={(e) => {
              setEstablishedDate(e.target.value);
              let objdate = new Date(e.target.value);
              if (!isNaN(objdate)) {
                console.log(objdate.toISOString());
                setEstablished(objdate.toISOString());
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

export default ZooCreateForm;
