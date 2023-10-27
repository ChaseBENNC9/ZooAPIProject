import axios from "axios";
import { useState} from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";

const ZooCreateForm = ({onCreateZoo, hideForm}) => {
    const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState("");
  const [zooId, setZooId] = useState("");
  const [type, setType] = useState("");
  const [temporary,setTemporary] = useState("");
  const [visitorCapacity,setVisitorCapacity] = useState("");
  const [isError, setIsError] = useState(false);
 const [isOpen, setIsOpen] = useState(false);

  const createZoo = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/enclosures`, {
        name: name        
      });

      if (res.status === 201) {
        const data =  res.data.data[res.data.data.length - 1]
        console.log("2)",data);
  

        onCreateZoo(data);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createZoo();
    setName("");
    setType("");
    setTemporary("");
    setVisitorCapacity("");
    setZooId("");
    hideForm();
    
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <h1 style={{ marginTop: "10px" }}>Create Enclosure</h1>
      {/* 
        When the form is submitted, it will call the handleSubmit 
        function above. You do not need to worry about specifying
        a method and action as you would typically do when dealing 
        with forms
      */}

      <h style={{color:"red", fontSize:12}}>* required input</h>
      <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleSelect">Select Zoo</Label>

          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
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
        <Button color="danger" onClick={hideForm} style={{
          marginLeft: "15px"
        
        }}>Cancel</Button>
      </Form>
    </>
  );
};

export default ZooCreateForm;