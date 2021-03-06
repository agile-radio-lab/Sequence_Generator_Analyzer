import React, { useState, useEffect } from "react";
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { Card,Col} from "react-bootstrap";

const lineGraphSettings = {
    theme: {
        tooltip:{
            container:{
                background:"black",
            }
        },
        fontSize: '15px',
        textColor: "white",
        axis: {
          ticks: {
            line: {
              stroke: "black"
            },
            text: {
              fill: "white",
            }
          }
        },
        grid: {
          line: {
            stroke: "black",
            strokeWidth: 1,
          }
        }
      },
    };

const LinePlot = ({y,metricName,xlabel,ylabel} ) => {

    const [data,setData]  = useState([]);

    useEffect(() =>{
        let newData = [];
        for (let i=0;i<y.length;i+=1){
            newData.push({"x": i,"y":y[i]});
        }
        setData(newData);


            
    },[y]);

    return (
        <Col md={12} lg={4} >
        < Card style={{ height:'28rem',width:"48rem"}}>
            <Card.Header style={{fontWeight: "bolder", backgroundColor: "#blue"}} >  {metricName} </Card.Header>
        <Card.Body>
        <ResponsiveScatterPlot
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color' }}
        curve="monotoneX"
        data={ [{"id": metricName,"data":data},]}
            margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
            xScale={{ type: 'linear' ,min:0,max:y.length}}
            yScale={{ type: 'linear',min:Math.min(...y),max:Math.max(...y)}}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: xlabel,
                legendOffset: 36,
                legendPosition: 'middle',

            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 1,
                tickRotation: 0,
                legend: ylabel,
                legendOffset: -50,
                legendPosition: 'middle',

            }}

            theme={lineGraphSettings.theme}
            pointSize={3}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={false}
            animate={false}

            legends={[
                {
                    anchor: 'top-left',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: -40,
                    itemsSpacing: 90,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: "#ea0a8e",
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'black',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}

        />
        </Card.Body>
        </Card>
        </Col>)
}
export default  LinePlot;



