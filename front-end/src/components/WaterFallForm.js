import React, { useState } from "react";
import {Row,Col,Button,Card} from "react-bootstrap";
import axios from "axios";

async function getBase64(url) {
    const response = await axios
      .get(url, {
        responseType: 'arraybuffer'
      });
    return Buffer.from(response.data, 'binary').toString('base64');
}
const WaterFallForm =  ()=> {
    const [imgUrl,setImgUrl] = useState("");

  const handelOnClickGet= (e) =>{
    e.preventDefault();
    getBase64("http://localhost:8000/get_waterfall").then (base64 => {
        setImgUrl("data:;base64," + base64);
    })
  }

      return (
        <>
        <Col md={12} lg={12} >
        < Card style={{ height:'35rem',width:"60rem"}}>
        <Card.Body>
        <img width={900} hight={200} src={imgUrl} alt="waterfall"/>
        </Card.Body>
        <Card.Footer>Water Fall Plot</Card.Footer>
        </Card>
        </Col>
        <Row>
          <Col>
        <Button variant="primary" type="submit" onClick={handelOnClickGet} >
        Get Waterfall
        </Button>
        </Col>
        </Row>
        </>
      );
  }
  export default WaterFallForm;