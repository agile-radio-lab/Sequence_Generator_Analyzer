import React, { useState } from "react";
import {Form,Col,Button} from "react-bootstrap";
import backendSettings from "../services/Backend";

const SIGNALS = {"ones":"ones","cosine":"cos","consine squared":"cos^","positive exponential":"exp","negative exponential":"neg_exp","rectangular":"rect","primary synchronization signal":"pss"}
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
        "iq_samples":{"real":[],
                       "imag":[]}
    })
  .then(function (response) {
    onPlotUpdate(response.data.iq_samples);
    setFile(JSON.stringify(response.data.iq_samples));
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
    onPlotUpdate(newFileData);
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
        <Form.Control as="select" defaultValue="ones" onChange={e => setTypeOfSeq(SIGNALS[e.target.value])}>
          {Object.keys(SIGNALS).map((key) =>(
            <option key={key}>{key}</option>
          ),
          )}
        </Form.Control>
        </Form.Group>
        
        <Form.Row>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>N Samples [N]</Form.Label>
            <Form.Control placeholder="200" value={samples>10000 ? 10000:samples} onChange={e => setSamples(e.target.value)}/>
            { samples > 10000 && 
            <p>Can't set more 10000</p>
            }
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
        <Form.File id="exampleFormControlFile1" label="JSON file input" onChange={e => handleChange(e)}/>

        <Button variant="primary" type="submit" onClick={handelOnClick}>
          Generate Sequence
        </Button>
        <Button variant="primary" type="submit" onClick={downloadFile}>Save as JSON</Button>
      </Form>
    );
}
export default TxForm;