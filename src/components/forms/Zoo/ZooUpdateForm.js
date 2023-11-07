import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";

const ZooUpdateForm = ({ OnUpdateZoo, currentData, hideForm }) => {
  const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState(currentData.name);
  const [city, setCity] = useState(currentData.city);
  const [country, setCountry] = useState(currentData.country);
  const [established, setEstablished] = useState(currentData.established);
  const [establishedDate, setEstablishedDate] = useState(
    format(new Date(currentData.established), "yyyy-MM-dd"),
  );
  const [isError, setIsError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");

  const UpdateZoo = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/api/v1/zoos/${currentData.id}`, {
        name: name,
        city: city,
        country: country,
        established: established,
      });

      if (res.status === 200) {
        const data = res.data.data;
        OnUpdateZoo(data);
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
        "\nInvalid `prisma.zoo.update()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)"
      ) {
        setErrorMessage("Zoo with that Name already exists");
      } else {
        setErrorMessage(error.response.data.msg);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateZoo();

  };
  return (
    <>
      {/* 
        When the form is submitted, it will call the handleSubmit 
        function above. You do not need to worry about specifying
        a method and action as you would typically do when dealing 
        with forms
      */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            /*
              This attribute detects when the value of an input element changes
            */
            onChange={(e) => setName(e.target.value)}
            /*
              You can fetch validation messages from the request. There are plenty 
              of online resources that show you how to do this 
            */
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>
        <h4>Established</h4>
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
        {isError ? (
          <Alert color="danger">{errorMessage}</Alert>
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

export default ZooUpdateForm;
