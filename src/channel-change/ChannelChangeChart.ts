import { Chart, Options } from "../../node_modules/highcharts/highcharts";
import { defaultOptions, mergeOptions } from "../baseChartOptions";
import { ChChange, Root } from "./data";

export default class ChannelChangeChart {
  private chart: Chart | undefined = undefined;
  constructor(private containerId: string, private data: Root) {}

  render() {
    const chChangeData: ChChange[] = [];

    // Extract all channel change data
    Object.keys(this.data).forEach((key) => {
      const value = this.data[key];
      if (value.ch_change) {
        chChangeData.push({ ...value.ch_change, mac: key });
      }
    });

    chChangeData.sort((a, b) => +a.ts - +b.ts);
    const options = {
      title: {
        text: "Channel Change Records"
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Time"
        },
        min: +chChangeData[0].ts,
        labels: {
          useHTML: true,
          formatter: function () {
            const time = Highcharts.dateFormat("%H:%M", +(this as any).value);
            const date = Highcharts.dateFormat("%b %e, %Y", +(this as any).value);
            return `<div style="text-align:center">${time}<br />${date}</div>`;
          }
        }
      },
      yAxis: {
        title: {
          text: "Channels"
        },
        min: 0,
        max: 167,
        tickInterval: 1
      },
      tooltip: {
        useHTML: true
      },
      series: chChangeData.map((item) => {
        return {
          type: "scatter",
          name: item.mac,
          data: [
            {
              x: +item.ts,
              y: +item.primary_ch
            }
          ],
          tooltip: {
            headerFormat: "",
            pointFormatter: function () {
              return `<div>
                        <div><b>Timestamp:</b> ${Highcharts.dateFormat(
                          "%H:%M, %b %e, %Y",
                          +item.ts
                        )}</div>
                        <div><b>Primary Ch: </b> ${item.primary_ch}</div>
                        <div><b>Previous Ch: </b> ${item.prev_ch}</div>
                        <div><b>MAC: </b> ${item.mac}</div>
                        <div><b>Reason: </b> ${item.reason}</div>
                        <div><b>BID: </b> ${item.bid}</div>
                        <div><b>Score: </b> ${item.cur_score}</div>
                        <div><b>Prev. Score: </b> ${item.prev_score}</div>
                        </div>`;
            }
          }
        };
      })
    };
    this.chart = new Highcharts.Chart(
      this.containerId,
      mergeOptions(defaultOptions, options)
    );
  }

  destroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }
}
