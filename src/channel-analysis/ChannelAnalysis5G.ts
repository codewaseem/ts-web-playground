import {
    Chart,
    Options,
    SeriesOptionsType,
  } from "../../node_modules/highcharts/highcharts";
  import {
    mergeOptions,
    defaultOptions,
    defaultColors,
    getColorByIndex,
  } from "../baseChartOptions";
  import { ChannelInfo } from "./data";

  const columnsCount = 130;
  const WIDTH_ADJUST = 5;
  const COLUMN_WIDTH = 5;

  const xOffset = 5180;


  export default class ChannelAnalysis5G {
    private chart: Chart | undefined = undefined;
    private series: SeriesOptionsType[] = [];
  
    constructor(private containerId: string, private data: ChannelInfo[]) {}
  
    render() {
      this.add5GChannelColumns();
      this.addLines();
    
      let options: Options = {
        chart: {
          zooming: {
            pinchType: "x",
            type: "x"
          },
          panning: {
            enabled: true,
            type: "x"
          }
        },
        title: {
          text: "Channel Analysis - 5G",
        },
        xAxis: {
          min: 5175,
          title: {
            text: "Frequency (GHz)"
          },
          lineWidth: 0,
          tickInterval: 5,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          minorTickLength: 0,
          labels: {
            formatter: (ctx) => {
              return String((+ctx.value / 1000).toFixed(3));
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
  
    private add5GChannelColumns() {
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
          color: channelCounts[i+36] ? getColorByIndex(i+36) : defaultColors[6],
          opacity: 0.5,
          name: `CH ${i+36}`,
          id: `${i+36}`,
          showInLegend: channelCounts[i+36] ? true : false,
          tooltip: {
            headerFormat:'',
            pointFormatter: () => {
              return `
              <div>
              <div><b>Ch: </b> ${i+36}</div>
              <div><b>Count: </b> ${channelCounts[i+36] || 0}</div>
              <div>
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
                  return `Ch ${i + 36}`;
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
    }
  
    private addLines() {
      this.data.forEach((item) => {
        const center = xOffset + (+item.center_ch - 36) * WIDTH_ADJUST;
  
        const width = Number(item.width) / 3;
        const height = Math.abs(Number(item.signal_strength));
  
        const point1 = [center - width, 0];
        const point2 = [center - width / 2, height];
        const point3 = [center + width / 2, height];
        const point4 = [center + width, 0];
  
        this.series.push({
          type: "line",
          name: `${item.wifi_name}`,
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
          color: getColorByIndex(+item.center_ch ),
          data: [point1, point2, point3, point4],
          linkedTo: item.center_ch
        });
      });
    }
  }
  