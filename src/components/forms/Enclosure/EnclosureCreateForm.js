import axios from "axios";
import { useState} from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";

const EnclosureCreateForm = ({onCreateEnclosure, hideForm}) => {
    const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

  const [name, setName] = useState("");
  const [zooId, setZooId] = useState("");
  const [type, setType] = useState("");
  const [temporary,setTemporary] = useState(false);
  const [visitorCapacity,setVisitorCapacity] = useState(undefined);
  const [isError, setIsError] = useState(false);
 const [isOpen, setIsOpen] = useState(false);

  const createZoo = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/enclosures`, {
        name: name,
        type: type,
        temporary: temporary,     
        visitorCapacity: visitorCapacity,
        zooId: zooId 
      });

      if (res.status === 201) {
        const data =  res.data.data[res.data.data.length - 1]
        console.log("2)",data);
  

        onCreateEnclosure(data);
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


  return (
    <>
      <h1 style={{ marginTop: "10px" }}>Create Enclosure</h1>
      {/* 
        When the form is submitted, it will call the handleSubmit 
        function above. You do not need to worry about specifying
        a method and action as you would typically do when dealing 
        with forms
      */}

      <p style={{color:"red", fontSize:12}}>* required input</p>
      <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Zoo ID *</Label>
          <Input 
            type="text"
            name="ZooId"
            placeholder="Enter Zoo ID"
            value={zooId}
            onChange={(e) => setZooId(Number(e.target.value))}
            required
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
            required
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
            required
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
          onChange={(e) => {setTemporary((e.target.value === "true") ); console.log(temporary)}}
          required>
            <option>false</option>
            <option>true</option>
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

export default EnclosureCreateForm;