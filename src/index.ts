import { data } from "./data";

const ChannelColors: Record<number, string> = {
  1 : '0F0',
  6: 'F00',
  11: '00F'
}

const cols = data
  .filter((item) => item.band == "2.4G")
  .reduce((prev, cur) => {
    const key = Number(cur.center_ch);
    if (!prev[key])
      prev[key] = {
        count: 0,
        color: ChannelColors[key] ||  Math.floor(Math.random() * 16777215).toString(16),
      };

    prev[key].count++;

    return prev;
  }, {} as LineData);

const columnsCount = 13;

const WIDTH_ADJUST = 5;
const COLUMN_WIDTH = 30;

const xOffset = 2410;

function renderChart(series: Highcharts.SeriesOptionsType[]) {
  return Highcharts.chart("container", {
    title: {
      text: "Channel Analysis - 2.4G",
    },
    xAxis: {
      lineWidth: 0,
      tickInterval: 5,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      minorTickLength: 0,
      labels: {
        formatter: (ctx) => {
          return String(((+ctx.value + 2) / 1000).toFixed(3));
        },
      },
    },
    yAxis: {
      max: 100,
      title: {
        text: 'Signal Strength',
      },
      tickInterval: 10,
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      minorTickLength: 0,
      tickLength: 0,
      labels: {
        formatter: (ctx) => {
          return String(-ctx.value);
        },
      },
    },
    tooltip: {
      enabled: false,
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

type LineData = Record<
  number,
  {
    count: number;
    color: string;
    center?: number;
  }
>;

Array(2)
  .fill(100)
  .forEach((columnY, j) => {
    series.push({
      type: "column",
      color: "#CCC3",
      data: [
        {
          x: xOffset - (j + 1) * WIDTH_ADJUST,
          y: columnY,
          dataLabels: {
            enabled: false,
          },
        },
      ],
    });
  });

Array(columnsCount)
  .fill(100)
  .forEach((_, i) => {
    if (i == 0) {
    }

    series.push({
      type: "column",
      color: "#0F03",
      data: [
        {
          x: xOffset + i * WIDTH_ADJUST,
          y: 100,
          dataLabels: {
            enabled: true,
            formatter: () => {
              return `Ch ${i + 1}`;
            },
          },
        },
      ],
    });

    if (cols[i+1]) cols[i+1].center = xOffset + i * WIDTH_ADJUST;
  });

Array(2)
  .fill(100)
  .forEach((columnY, j) => {
    const x = xOffset + ( columnsCount + j) * WIDTH_ADJUST;
    series.push({
      type: "column",
      color: "#CCC3",
      data: [
        {
          x: x,
          y: columnY,
          dataLabels: {
            enabled: false,
          },
        },
      ],
    });
  });

series.push({
  type: 'column',
  color: "#0F03",
  data: [{
    x: 2484,
    y: 100,
    dataLabels: {
      enabled: true,
      formatter: () => {
        return `Ch 14`;
      },
    },
  }]
});

Array(2)
  .fill(100)
  .forEach((columnY, j) => {
    const x = 2484 + (j + 1) * WIDTH_ADJUST;
    console.log("x", x);
    series.push({
      type: "column",
      color: "#CCC3",
      data: [
        {
          x: x,
          y: columnY,
          dataLabels: {
            enabled: false,
          },
        },
      ],
    });
  });


// add channel
data.filter(item => item.band == "2.4G").forEach((item) => {

  const center =
    cols[+item.center_ch].center ||
    Number(item.center_ch) * WIDTH_ADJUST - WIDTH_ADJUST;
  const width = Number(item.width) / 2;
  const height = Math.abs(Number(item.signal_strength));




  const point1 = [center - width, 0];
  const point2 = [center - width / 2, height];
  const point3 = [center + width / 2, height];
  const point4 = [center + width, 0];
  series.push({
    type: "line",
    color: "#" + cols[+item.center_ch].color,
    data: [point1, point2, point3, point4],
  });
});

renderChart(series);
