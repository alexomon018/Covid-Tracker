import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({casesType = 'cases', ...props}) {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType = "cases", ...props) => {
    const charData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };

        charData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return charData;
  };

  useEffect(() => {
    const fetchData = async () => {
       await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const charData = buildChartData(data,casesType);
          setData(charData);
        });
    }
    fetchData();
  }, [casesType]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
        options={options}
        data={{
          datasets: [
            {
                data: data,
              backgroudColor: "rgba(204,15,52,0)",
              borderColor: "#CC1034"
            },
          ],
        }}
      />
      )}
      
    </div>
  );
}

export default LineGraph;
