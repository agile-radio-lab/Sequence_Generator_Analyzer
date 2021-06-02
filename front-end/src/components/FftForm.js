import React, { useState } from "react";
import {Button,Form,Row,Col} from "react-bootstrap";
import backendSettings from "../services/Backend";
import "./styles.scss";
import axios from "axios";


async function getBase64(url) {
    const response = await axios
      .get(url, {
        responseType: 'arraybuffer'
      });
    return Buffer.from(response.data, 'binary').toString('base64');
}

const FftForm =  ({onFfTPlotUpdate,I,Q,onGetWaterFallImg})=> {

    const [fftSize,setFftSize] = useState(50);
    const [errorMessage,setErrorMessage] = useState();


    const handelOnClickGet= (e) =>{
    e.preventDefault();
    getBase64("http://192.168.11.61:8000/get_waterfall").then (base64 => {
        onGetWaterFallImg("data:;base64," + base64);
    })
  }

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
      onFfTPlotUpdate(response.data.fft_samples);
      setErrorMessage();
  })
  .catch(function (error) {
    setErrorMessage("please set FFT size to be smaller than N_Samples !!!");
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
                    {errorMessage &&
                    <p className="error"> {errorMessage}</p>
                    }
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="primary" type="submit" onClick={handelOnClick}>
                    Calculate FFT
                    </Button>
                    <Button variant="primary" type="submit" onClick={handelOnClickGet} >
                    Get Waterfall
                    </Button>
                </Col>
            </Row>
      </Form>

    );
}
export default FftForm;