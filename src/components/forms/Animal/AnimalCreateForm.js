import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";

const AnimalCreateForm = ({ onCreateAnimal, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState("");
  const [enclosureid, setEnclosureid] = useState("");
  const [species, setSpecies] = useState("");
  const [sex, setSex] = useState("MALE");
  const [birthDate, setBirthDate] = useState(""); //The Date object of the animals birth date
  const [birth,setBirth] = useState("");  //The string of the animals birth date
  const [deathDate, setDeathDate] = useState(""); //The Date object of the animals death date
  const [death,setDeath] = useState(null);  //The string of the animals death date
  const [isError, setIsError] = useState(false);

  const createAnimal = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/animals`, {
        enclosureId: enclosureid,
        name: name,
        species: species,
        sex: sex,
        birthDate: birth,
        deathDate: death,


      });

      if (res.status === 201) {
        const data = res.data.data[res.data.data.length - 1];
        console.log("2)", data);

        onCreateAnimal(data);
      }
    } catch (error) {
      console.log(error.response.data.msg);
      setIsError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnimal();
    setName("");
    setSpecies("");
    setSex("");
    setBirthDate("");
    setDeathDate("");

    hideForm();
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
            placeholder="Enter Enclosure ID"
            value={enclosureid}
            onChange={(e) => setEnclosureid(Number(e.target.value))}
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
        <Label>Death Date *</Label>
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

export default AnimalCreateForm;
