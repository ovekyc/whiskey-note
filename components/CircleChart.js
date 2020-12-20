import React, { useState } from 'react';
import { VictoryChart, VictoryBar, VictoryStack, VictoryLabel, VictoryPolarAxis, VictoryTheme } from 'victory';
import { MAX_SCORE } from '../models/Note';

const orange = { base: "gold", highlight: "darkOrange" };
const red = { base: "tomato", highlight: "orangeRed" };
const innerRadius = 30;

function CompassCenter(props) {
  const circleStyle = {
    stroke: red.base, strokeWidth: 2, fill: orange.base
  };
  return (
    <g>
      <circle
        cx={props.origin.x} cy={props.origin.y} r={innerRadius} style={circleStyle}
      />
    </g>
  );
}

function CenterLabel(props) {
  const { datum, active, color } = props;
  const text = [ `${datum.xName}`, `${Math.round(datum._y1)}` ];
  const baseStyle = { fill: color.highlight, textAnchor: "middle" };
  const style = [
    { ...baseStyle, fontSize: 18, fontWeight: "bold" },
    { ...baseStyle, fontSize: 12 }
  ];

  return active
    ? (<VictoryLabel text={text} style={style} x={175} y={175} renderInPortal/>)
    : null;
}

export default function CircleChart(props) {
  const [flavors, setFlavors] = useState(props.data);
  const angles = getAngles(flavors);

  return (
    <VictoryChart
      polar
      animate={{ duration: 500, onLoad: { duration: 500 } }}
      theme={VictoryTheme.material}
      innerRadius={innerRadius}
      domainPadding={{ y: 10 }}
      events={[{
        childName: "all",
        target: "data",
        eventHandlers: {
          onMouseOver: () => [{ target: "labels", mutation: () => ({ active: true }) }],
          onMouseOut: () => [{ target: "labels", mutation: () => ({ active: false }) }],
          onClick: () => [{ target: "labels", mutation: (props) => {
              const label = props.datum.xName;
              const value = props.datum._y1;
              setFlavors({ ...flavors, [label]: value});
            }}
          ]
        }
      }]}
    >
      <VictoryPolarAxis dependentAxis labelPlacement="vertical" style={{ axis: { stroke: "none" } }} tickFormat={() => ""} />
      <VictoryPolarAxis labelPlacement="parallel" tickValues={Object.keys(angles).map((k) => +k)} tickFormat={Object.values(angles)} />
      <VictoryStack>
        <VictoryBar
          style={{ data: {
            fill: (d, a) => d._y1 <= flavors.score ? red.highlight : red.base,
            width: 40
          } }}
          data={convertFlavorsToStackChartData(flavors)}
          x="label"
          y="score"
          labels={() => ""}
          labelComponent={<CenterLabel color={red}/>}
        />
      </VictoryStack>
      <CompassCenter/>
    </VictoryChart>
  );
}

function convertFlavorsToStackChartData(flavors) {
  return Object.keys(flavors)
      .map((label) => ({ label, score: getRandomInt(0, MAX_SCORE)/*flavors[label]*/ }));
}

function getAngles(flavors) {
  const angleOffset = 360 / (Object.keys(flavors).length);
  const angles = {};
  Object.keys(flavors).map((label, i) => angles[i * angleOffset] = label);
  return angles;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
