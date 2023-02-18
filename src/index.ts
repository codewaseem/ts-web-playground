import { data } from "./data";

const cols = data.reduce((prev, cur) => {
  const key = +cur.center_ch;
  if(!prev[key]) prev[key] = {
    count: 0,
    color: Math.floor(Math.random()*16777215).toString(16)
  };
  
  prev[key].count++;

  return prev;
}, {} as LineData);

const colKeys = Object.keys(cols).sort((a, b) => +a - +b);
const columnsCount = colKeys.length;


const WIDTH_ADJUST = 4;
const COLUMN_WIDTH  = 600 / columnsCount;

const xOffset = 0;



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


type LineData = Record<number, {
  count: number,
  color: string,
  center?: number
}>;


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

  cols[+key].center =  xOffset +  i * WIDTH_ADJUST;
  

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
  const center = cols[+item.center_ch].center || Number(item.center_ch) * WIDTH_ADJUST - WIDTH_ADJUST;
  const width = Number(item.width);
  const height = Math.abs(Number(item.signal_strength));

  const point1 = [center - width , 0];
  const point2 =  [center - width / 2 , height];
  const point3 = [center + width / 2 , height];
  const point4 = [center + width , 0]
  series.push({
    type: "line",
    color: '#' + cols[+item.center_ch].color,
    data: [
      point1,
      point2,
      point3,
      point4
    ]
  })
})

renderChart(series);


