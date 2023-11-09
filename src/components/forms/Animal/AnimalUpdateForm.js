/**
 * @summary Handles the Update form for the animals using a PUT request
 * @author Chase Bennett-Hill
 */

import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { format } from "date-fns";

const AnimalUpdateForm = ({ onUpdateAnimal, currentData, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState(currentData.name);
  const [enclosureId, setEnclosureId] = useState(currentData.enclosureId);
  const [species, setSpecies] = useState(currentData.species);
  const [sex, setSex] = useState(currentData.sex);
  const [birth, setBirth] = useState(currentData.birthDate); //The string of the animals birth date
  const [birthDate, setBirthDate] = useState(
    format(new Date(currentData.birthDate), "yyyy-MM-dd"),
  ); //The Date object of the animals birth date

  const [death, setDeath] = useState(currentData.deathDate); //The string of the animals death date
  const [deathDate, setDeathDate] = useState(
    death != null
      ? format(new Date(currentData.deathDate), "yyyy-MM-dd")
      : null,
  ); //The Date object of the animals death date

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateAnimal = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/v1/animals/${currentData.id}`,
        {
          enclosureId: enclosureId,
          name: name,
          species: species,
          sex: sex,
          birthDate: birth,
          deathDate: death,
        },
      );

      if (res.status === 200) {
        const data = res.data.data;
        onUpdateAnimal(data);
        console.log("2)", data);
        setName("");
        setSpecies("");
        setSex("");
        setBirthDate("");
        setDeathDate("");

        hideForm();
      }
    } catch (error) {
      console.log(error);

      setIsError(true);

      if (
        error.response.data.msg ===
        "\nInvalid `prisma.animal.update()` invocation:\n\n\nForeign key constraint failed on the field: `Animal_enclosureId_fkey (index)`"
      ) {
        setErrorMessage("Enclosure ID does not exist");
      } else setErrorMessage(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAnimal();
  };

  return (
    <>
      <p style={{ color: "red", fontSize: 12 }}>* input</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Enclosure ID </Label>
          <Input
            type="text"
            name="enclosureid"
            placeholder="Enter Enclosure ID"
            value={enclosureId}
            onChange={(e) => setEnclosureId(Number(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Animal Name </Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Species </Label>
          <Input
            type="text"
            name="species"
            placeholder="Enter Species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Sex </Label>
          <Input
            type="select"
            name="sex"
            onChange={(e) => {
              setSex(e.target.value);
            }}
          >
            <option>MALE</option>
            <option>FEMALE</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Birth Date </Label>
          <Input
            type="date"
            name="birth"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
              let objdate = new Date(e.target.value);
              if (!isNaN(objdate)) {
                console.log(objdate.toISOString());
                setBirth(objdate.toISOString());
              }
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Death Date</Label>
          <Input
            type="date"
            name="death"
            value={deathDate}
            onChange={(e) => {
              setDeathDate(e.target.value);
              let objdate = new Date(e.target.value);
              if (!isNaN(objdate)) {
                console.log(objdate.toISOString());
                setDeath(objdate.toISOString());
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

export default AnimalUpdateForm;
