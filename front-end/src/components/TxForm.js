import React, { useState } from "react";
import {Form,Col,Button} from "react-bootstrap";
import backendSettings from "../services/Backend";


function TxForm({onPlotUpdate}) {
  const [amp,setAmp] = useState(0.5);
  const [t,setT] = useState(10);
  const [samples,setSamples] = useState(100);
  const [typeOfSeq,setTypeOfSeq] = useState("ones");
  const [zadoffChuRootSeq,setZadoffChuRootSeq] = useState(0);
  const [pulsWidth,setPulsWidth] = useState(5);
  const [file,setFile] = useState({});


  const handelOnClick = (e) =>{
    e.preventDefault();
    backendSettings.post('/get_seq', {
      "type_of_seq":typeOfSeq,
        "n_samples":Number(samples),
        "amp":Number(amp),
        "period":Number(t),
        "zaddoff_chu_root":Number(zadoffChuRootSeq),
        "puls_width":Number(pulsWidth),
        "seq_samples":{"real":[],
                       "imag":[]}
    })
  .then(function (response) {
    onPlotUpdate(response.data.seq_samples);
    setFile(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
    
}
const handleChange = (e) => {
  const fileReader = new FileReader();
  fileReader.readAsText(e.target.files[0], "UTF-8");
  fileReader.onload = (e) => {
    const newFileData = JSON.parse(e.target.result);
    onPlotUpdate(newFileData.seq_samples);
  };
};

const downloadFile = async (e) => {
  e.preventDefault();

  const fileName = "file";
  const blob = new Blob([file],{type:'application/json'});
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 
    return (
        <Form>
        <Form.Group controlId="formGridState">
        <Form.Label>Type of sequence</Form.Label>
        <Form.Control as="select" defaultValue="ones" onChange={e => setTypeOfSeq(e.target.value)}>
            <option>ones</option>
            <option>cos</option>
            <option>cos^</option>
            <option>exp</option>
            <option>neg_exp</option>
            <option>rect</option>
            <option>pss</option>
        </Form.Control>
        </Form.Group>
        
        <Form.Row>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>N Samples [N]</Form.Label>
            <Form.Control placeholder="200" value={samples} onChange={e => setSamples(e.target.value)}/>
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Amplitude [A]</Form.Label>
            <Form.Control placeholder="0.5" value={amp} onChange={e => setAmp(e.target.value)} />
          </Form.Group>
          
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Period [samples/period]</Form.Label>
            <Form.Control placeholder="10" value={t} onChange={e => setT(e.target.value)} />
          </Form.Group>

          {typeOfSeq=== "pss" && 
        <Form.Group controlId="formGridState">
        <Form.Label>Zadoff Chu Root Seq Idx</Form.Label>
        <Form.Control as="select" defaultValue="0" onChange={e => setZadoffChuRootSeq(e.target.value)}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
        </Form.Control>
        </Form.Group>
        }

        {typeOfSeq === "rect" &&
            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Puls Width </Form.Label>
            <Form.Control placeholder="5" value={pulsWidth} onChange={e => setPulsWidth(e.target.value)} />
          </Form.Group>
        }

        </Form.Row>
        <Button variant="primary" type="submit" onClick={handelOnClick}>
          Submit
        </Button>
        <Button variant="primary" type="submit" onClick={downloadFile}>Save as JSON</Button>
        <Form.File id="exampleFormControlFile1" label="JSON file input" onChange={e => handleChange(e)}/>
      </Form>
    );
}
export default TxForm;