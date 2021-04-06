import React, { useState,useEffect } from "react";
import {Col,Card} from "react-bootstrap";

const WaterFallPlot =  (waterFallImg)=> {

    const [img,setImg]  = useState("");


    useEffect(() =>{
        setImg(waterFallImg.waterFallImg);
    },[waterFallImg]);

      return (
        <>
        <Col md={12} lg={12} >
        < Card style={{ height:'35rem',width:"60rem"}}>
        <Card.Body>
        <img width={900} hight={200} src={img} alt="waterfall"/>
        </Card.Body>
        <Card.Footer>Water Fall Plot</Card.Footer>
        </Card>
        </Col>
        </>
      );
  }
  export default WaterFallPlot;