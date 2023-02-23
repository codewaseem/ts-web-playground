import {
  Chart,
  Options,
  SeriesOptionsType,
} from "../node_modules/highcharts/highcharts";
import {
  mergeOptions,
  defaultOptions,
  getColorByIndex,
} from "./baseChartOptions";
import { ChannelInfo } from "./data";

const columnsCount = 13;
const WIDTH_ADJUST = 5;
const COLUMN_WIDTH = 30;

const xOffset = 2410;

export default class ChannelAnalysis2G {
  private chart: Chart | undefined = undefined;
  private series: SeriesOptionsType[] = [];

  constructor(private containerId: string, private data: ChannelInfo[]) {}

  render() {
    this.add2GChannelColumns();
    this.addLines();

    let options: Options = {
      
      title: {
        text: "Channel Analysis - 2.4G",
      },
      xAxis: {
        title: {
          text: "Band",
        },
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
          text: "Signal Strength (dBm)",
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
        useHTML: true
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
      series: this.series,
    };

    this.chart = Highcharts.chart(
      this.containerId,
      mergeOptions(defaultOptions, options)
    );
  }

  destory() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  private add2GChannelColumns() {
    const channelCounts = this.data.reduce((prev, cur) => {
      const key = Number(cur.center_ch);
      if (!prev[key]) prev[key] = 0;

      prev[key]++;

      return prev;
    }, {} as { [key: number]: number });

    Array(2)
      .fill(100)
      .forEach((columnY, j) => {
        this.series.push({
          enableMouseTracking: false,
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
        this.series.push({
          type: "column",
          color: getColorByIndex(i+1),
          opacity: 0.5,
          showInLegend: true,
          id: String(i+1),
          name: `CH ${i + 1}`,
          tooltip: {
            headerFormat:'',
            pointFormatter: () => {
              return `
              <div>
              <div><b>Ch: </b> ${i+1}</div>
              <div><b>Count: </b> ${channelCounts[i+1] || 0}</div>
            </div>
              `
            }
          },
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
      });

    Array(2)
      .fill(100)
      .forEach((columnY, j) => {
        
        const x = xOffset + (columnsCount + j) * WIDTH_ADJUST;
        this.series.push({
          enableMouseTracking: false,
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

    // this.series.push({
    //   type: "column",
    //   color: defaultColors[6],
    //   opacity: 0.5,
    //   data: [
    //     {
    //       x: 2484,
    //       y: 100,
    //       dataLabels: {
    //         enabled: true,
    //         formatter: () => {
    //           return `Ch 14`;
    //         },
    //       },
    //     },
    //   ],
    // });

    // Array(2)
    //   .fill(100)
    //   .forEach((columnY, j) => {
    //     const x = 2484 + (j + 1) * WIDTH_ADJUST;
    //     this.series.push({
    //       type: "column",
    //       color: "#CCC3",
    //       data: [
    //         {
    //           x: x,
    //           y: columnY,
    //           dataLabels: {
    //             enabled: false,
    //           },
    //         },
    //       ],
    //     });
    //   });
  }

  private addLines() {
    this.data.forEach((item) => {
      const center = xOffset + (+item.center_ch - 1) * WIDTH_ADJUST;

      const width = Number(item.width) / 2;
      const height = Math.abs(Number(item.signal_strength));

      const point1 = [center - width, 0];
      const point2 = [center - width / 2, height];
      const point3 = [center + width / 2, height];
      const point4 = [center + width, 0];

      this.series.push({
        type: "line",
        tooltip: {
          headerFormat: '',
          pointFormatter: () => {
            return `<div>
              <div><b>Wifi Name: </b> ${item.wifi_name.trim() || '(Unnamed)'}</div>
              <div><b>Signal Strength: </b> ${item.signal_strength}</div>
              <div><b>Center Ch: </b> ${item.center_ch}</div>
            </div>
            `
          },
        },
        color: getColorByIndex(+item.center_ch),
        data: [point1, point2, point3, point4],
        linkedTo: item.center_ch
      });
    });
  }
}
