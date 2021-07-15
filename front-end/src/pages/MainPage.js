
import React, { useState } from "react";
import { Container,Row, Col } from "react-bootstrap";
import "./MainPage.scss";
import TxForm from "../components/TxForm";
import FftForm from "../components/FftForm";
import LinePlot from "../components/LinePlot";
import ScatterPlot from "../components/ScatterPlot";
import WaterFallPlot from "../components/WaterFallPlot";

function MainPage() {
  const [iqData,setIqData] = useState({real:[],imag:[],yLim:[]}) 
  const [fftData,setFftData] = useState([]);
  const [img,setImg] = useState("");


  const plotUpdate = (data) => {
    setIqData(data);  
  }
  const plotFftUpdate = (fftdata) => {
    setFftData(fftdata);
  }
  const plotWaterFall = (waterfall) =>{
    setImg(waterfall);
  }


    return (
      <div className="page">
    <Container fluid>
    <Row>
      <Col xs={7}>
      <h2 >Sequence Generator</h2>
      <TxForm onPlotUpdate={plotUpdate}></TxForm>
      <Row>
        <Col>
      <ScatterPlot x={iqData.real} y={iqData.imag} metricName="IQ PLOT"  xlabel="Real" ylabel="Imaginary" height="40rem" width="40rem"></ScatterPlot>
      </Col>
      <Col>
      <LinePlot  y={iqData.real} metricName="Real" xlabel="Samples" ylabel="I"></LinePlot>
      <LinePlot  y={iqData.imag} metricName="Imaginary" xlabel="Samples" ylabel="Q"></LinePlot>
      </Col>
      </Row>
      </Col>
      
      <Col >
      <h2 >Sequence Analyser</h2>
      <FftForm I={iqData.real} Q={iqData.imag} onFfTPlotUpdate={plotFftUpdate} onGetWaterFallImg={plotWaterFall}></FftForm>
      <ScatterPlot x={-1} y={fftData} metricName="FFT PLOT"  xlabel="Frequency [bins]" ylabel="Magnitude" height="30rem" width="60rem"></ScatterPlot>
      <WaterFallPlot waterFallImg={img} ></WaterFallPlot>
      </Col>
      </Row>
  </Container>
  </div>
    );

}

export default MainPage;