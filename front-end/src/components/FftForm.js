import React, { useState } from "react";
import {Button,Form,Row,Col} from "react-bootstrap";
import backendSettings from "../services/Backend";
import "./styles.scss";

const FftForm =  ({onFfTPlotUpdate,I,Q})=> {
const [fftSize,setFftSize] = useState(50);
  const handelOnClick = (e) =>{
    e.preventDefault();
    backendSettings.post('/calc_fft', {
        "iq_samples":{
            "real":I,
            "imag":Q
        },
        "fft_size":Number(fftSize),
        "fft_samples":[]
    })
  .then(function (response) {
      onFfTPlotUpdate(response.data.fft_samples)
  })
  .catch(function (error) {
    console.log(error);
  });
    
}
    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="formGridCity">
                    <Form.Label>FFT Size</Form.Label>
                    <Form.Control placeholder="50" value={fftSize} onChange={(e) => setFftSize(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="primary" type="submit" onClick={handelOnClick}>
                            Submit
                    </Button>
                    
                </Col>
            </Row>
      </Form>

    );
}
export default FftForm;