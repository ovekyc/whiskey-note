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
  const { datum, clicked, color } = props;
  const text = [ `${datum.xName}`, `${Math.round(datum._y1)}` ];
  const baseStyle = { fill: color.highlight, textAnchor: "middle" };
  const style = [
    { ...baseStyle, fontSize: 18, fontWeight: "bold" },
    { ...baseStyle, fontSize: 12 }
  ];

  return clicked
    ? (<VictoryLabel text={text} style={style} x={175} y={175} renderInPortal/>)
    : null;
}

export default function CircleChart(props) {
  const flavors = props.data;
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
          onClick: (evt) => {
            return [
              { target: "labels", mutation: () => ({ clicked: true }) },
              { target: "data", mutation: () => ({ clicked: true }) }
            ]
          }
        }
      }]}
    >
      <VictoryPolarAxis dependentAxis labelPlacement="vertical" style={{ axis: { stroke: "none" } }} tickFormat={() => ""} />
      <VictoryPolarAxis labelPlacement="parallel" tickValues={Object.keys(angles).map((k) => +k)} tickFormat={Object.values(angles)} />
      <VictoryStack>
        {
          getInnerScoreBars().map((_, i) => {
            const data = convertFlavorsToStackChartData(flavors);

            return (
              <VictoryBar
                style={{ data: {
                  fill: (d, a) => d._y1 <= flavors.score ? red.highlight : red.base,
                  width: 40
                } }}
                data={data}
                x="label"
                y={(d) => {
                  const label = d.xName;
                  return i < flavors[label] ? 1 : 0;
                }}
                labels={() => ""}
                labelComponent={<CenterLabel color={red}/>}
              />);
          })
        }
      </VictoryStack>
      <CompassCenter/>
    </VictoryChart>
  );
}

function convertFlavorsToStackChartData(flavors) {
  return Object.keys(flavors)
      .map((label) => ({ label, score: flavors[label] }));
}

function getAngles(flavors) {
  const angleOffset = 360 / (Object.keys(flavors).length);
  const angles = {};
  Object.keys(flavors).map((label, i) => angles[i * angleOffset] = label);
  return angles;
}

function getInnerScoreBars() {
  const arr = [];
  arr.length = 5;
  arr.fill(1);
  return arr
}