import { data } from "./data";

const columnsCount = 20;
const WIDTH_ADJUST = 10;
const COLUMN_WIDTH  = 25;

const xOffset = 200;



function renderChart(series: Highcharts.SeriesOptionsType[]) {
  return Highcharts.chart("container", {
    title: {
      text: "Channel Analysis"
    },
    xAxis: {
      lineWidth: 0,
      tickInterval: 10,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      minorTickLength: 0,
    },
    yAxis: {
      max: 100,
      tickInterval: 10,
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      minorTickLength: 0,
      tickLength: 0,
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointWidth: COLUMN_WIDTH,
        centerInCategory: true,
        showInLegend: false,
      },
      line: {
        showInLegend: false,
        marker: {
          enabled: false,
          radius: 0,
          states: {
            hover: {
              radius: 0,
            },
          },
        },
      },
    },
    series: series,
  });
  
}
const series: Highcharts.SeriesOptionsType[] = [];

// add columns

// Array(2).fill(100).forEach((columnY, i) => {
//   series.push({
//     type: 'column',
//     color: '#CCC3',
//     data: [{
//       x: xOffset - WIDTH_ADJUST * (i + 1),
//       y: columnY,
//       dataLabels: {
//         enabled: false
//       }
//     }]
//   });
// });

const cols = data.reduce((prev, cur) => {
  if(!prev[cur.center_ch]) prev[cur.center_ch] = 0;
  
  prev[cur.center_ch]++;

  return prev;
}, {} as Record<string, number>);

const centers: Record<string, number> = {};

const colKeys = Object.keys(cols);

colKeys.forEach((key, i) => {

  if(i == 0) {
    Array(2).fill(100).forEach((columnY, j) => {
      series.push({
        type: 'column',
        color: '#CCC3',
        data: [{
          x: xOffset - ( j + 1)  *  WIDTH_ADJUST,
          y: columnY,
          dataLabels: {
            enabled: false
          }
        }]
      });
    });
  }


  series.push({
    type: 'column',
    color: '#0F03',
    data: [{
      x: xOffset +  i * WIDTH_ADJUST,
      y:  100,
      dataLabels: {
        enabled: true,
        formatter: () => {
          return `Ch ${key}`;
        },
      },
    }]
  });

  centers[key] = xOffset +  i * WIDTH_ADJUST;
  

  if(i == (colKeys.length - 1)) {
    Array(2).fill(100).forEach((columnY, j) => {
      series.push({
        type: 'column',
        color: '#CCC3',
        data: [{
          x: xOffset + (i + j + 1)  *  WIDTH_ADJUST,
          y: columnY,
          dataLabels: {
            enabled: false
          }
        }]
      });
    });
  }
});


// add channel
data.slice(0, 10).forEach((item) => {
  const center = centers[item.center_ch];
  const width = Number(item.width);
  const height = Math.abs(Number(item.signal_strength));

  const point1 = [center - width , 0];
  const point2 =  [center - width / 2, height];
  const point3 = [center + width / 2 , height];
  const point4 = [center + width, 0]
  series.push({
    type: "line",
    data: [
      point1,
      point2,
      point3,
      point4
    ]
  })
})

renderChart(series);


// const chart = Highcharts.chart("container", {
//   title: {
//     text: "Monthly Average Rainfall",
//   },

//   xAxis: {
//     min: 0,
//     lineWidth: 0,
//     tickInterval: 10,
//     minorGridLineWidth: 0,
//     lineColor: "transparent",
//     minorTickLength: 0,
//   },
//   yAxis: {
//     min: 0,
//     max: 100,
//     tickInterval: 10,
//     lineWidth: 0,
//     minorGridLineWidth: 0,
//     lineColor: "transparent",

//     minorTickLength: 0,
//     tickLength: 0,
//   },
//   tooltip: {
//     enabled: false,
//   },
//   plotOptions: {
//     column: {
//       pointWidth: 30,
//       centerInCategory: true,
//       showInLegend: false,
//     },
//     line: {
//       showInLegend: false,
//       marker: {
//         enabled: false,
//         radius: 0,
//         states: {
//           hover: {
//             radius: 0,
//           },
//         },
//       },
//     },
//   },
//   series: [
//     ...Array(columnsCount)
//       .fill(100)
//       .map((column, i) => {
//         return {
//           type: "column",
//           color: "#0F03",
//           data: [
//             {
//               x: i * 10,
//               y: column,
//               dataLabels: {
//                 enabled: true,
//                 formatter: () => {
//                   return `Ch ${i + 1}`;
//                 },
//               },
//             },
//           ],
//         };
//       }),
//     ...hrLines.map((line) => {
//       return {
//         type: "line",
//         data: [
//           [line.center - line.width + 5 + columnOffset, 0],
//           [line.center - line.width / 2 + columnOffset, line.height],
//           [line.center + line.width / 2 + columnOffset, line.height],
//           [line.center + line.width - 5 + columnOffset, 0],
//         ],
//       };
//     }),
//   ],
// });
