/**
 * @summary Handles the Creation form for the Animal Table 
 * @author Chase Bennett-Hill
 */
import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
const AnimalCreateForm = ({ onCreateAnimal, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState("");
  const [enclosureId, setEnclosureId] = useState("");
  const [species, setSpecies] = useState("");
  const [sex, setSex] = useState("MALE");
  const [birthDate, setBirthDate] = useState(""); //The Date object of the animals birth date
  const [birth, setBirth] = useState(""); //The string of the animals birth date

  const [deathDate, setDeathDate] = useState(""); //The Date object of the animals death date
  const [death, setDeath] = useState(null); //The string of the animals death date

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); //The string of the error message, will change to something readable and display at the bottom of the form modal

  /**
   * @description Handles a Post request to the API with the specified data
   */
  const createAnimal = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/animals`, {
        enclosureId: enclosureId,
        name: name,
        species: species,
        sex: sex,
        birthDate: birth,
        deathDate: death,
      });

      if (res.status === 201) {
        const data = {
          enclosureId: enclosureId,
          name: name,
          species: species,
          sex: sex,
          birthDate: birth,
          deathDate: death,
        };
        console.log("2)", data);

        onCreateAnimal(data);
        setName(""); //Clears the form only if the submission was successful
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
        "\nInvalid `prisma.animal.create()` invocation:\n\n\nForeign key constraint failed on the field: `Animal_enclosureId_fkey (index)`" //This is the error message for an enclosure id
      ) {
        setErrorMessage("Enclosure ID does not exist"); //Here i have formatted it into something easy to understand
      } else setErrorMessage(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnimal();
  };

  return ( //Form that has all the fields needed for posting, required fields are marked with a *
    <>
      <p style={{ color: "red", fontSize: 12 }}>* required input</p>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Enclosure ID *</Label>
          <Input
            type="text"
            name="enclosureid"
            placeholder="Enter Enclosure ID"
            value={enclosureId}
            onChange={(e) => setEnclosureId(Number(e.target.value))}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Animal Name *</Label>
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
          <Label>Species *</Label>
          <Input
            type="text"
            name="species"
            placeholder="Enter Species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Sex *</Label>
          <Input
            type="select"
            name="sex"
            onChange={(e) => {
              setSex(e.target.value);
            }}
            required
          >
            <option>MALE</option>
            <option>FEMALE</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Birth Date *</Label>
          <Input
            type="date"
            name="birth"
            value={birthDate}
            required
            onChange={(e) => { //Sets the birth date to the date object provided by the input
              setBirthDate(e.target.value);
              let objdate = new Date(e.target.value);
              if (!isNaN(objdate)) {
                console.log(objdate.toISOString()); 
                setBirth(objdate.toISOString()); //Sets the Birth to the date converted to a string for posting
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

export default AnimalCreateForm;
