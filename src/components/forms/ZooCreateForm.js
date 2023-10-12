import axios from "axios";
import { useState ,forceUpdate} from "react";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import { Navigate } from "react-router-dom";

const ZooCreateForm = (props) => {
    const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [established,setEstablished] = useState("");
  const [establishedDate,setEstablishedDate] = useState("");
  const [isError, setIsError] = useState(false);
 

  const createZoo = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/zoos`, {
        name: name,
        city: city,
        country: country,
        established: established
      });

      if (res.status === 201) {
        // handle 
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createZoo();
  };

  return (
    <>
      <h1 style={{ marginTop: "10px" }}>Create Zoo</h1>
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
            required
          />
        </FormGroup>
        <FormGroup>
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
          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </FormGroup>
        <h4>Established</h4>
        <FormGroup>
            <Input
                type="date"
                name="established"
                placeholder="Established Date"
                value={establishedDate}
                onChange={(e) => 
                  {
                    setEstablishedDate(e.target.value);
                    let objdate = new Date(e.target.value);
                    if(!isNaN(objdate)){
                      console.log(objdate.toISOString());
                      setEstablished(objdate.toISOString());
                    }
                  }
                  }
            />


            
        </FormGroup>

        {/* 
          Display an alert message if there is an error
        */}
        {isError ? (
          <Alert color="danger">
            Something went wrong. Please try again.
          </Alert>
        ) : null}
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default ZooCreateForm;