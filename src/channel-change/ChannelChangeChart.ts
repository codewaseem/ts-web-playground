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

    const options: Options = {
      title: {
        text: "Channel Change Records",
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Time",
        },
        labels: {
          useHTML: true,
          formatter: function(){
            const time = Highcharts.dateFormat('%H:%M', +this.value);
            const date = Highcharts.dateFormat('%b %e, %Y', +this.value);
            return  `<div style="text-align:center">${time}<br />${date}</div>`
          }
        },
        min: +chChangeData[0].ts,
        dateTimeLabelFormats: {
          day: "%e %b %Y",
          hour: "%e %b %Y %H:%M",
          minute: "%e %b %Y %H:%M",
          second: "%e %b %Y %H:%M",
          millisecond: "%e %b %Y %H:%M",
        },
      },
      yAxis: {
        title: {
          text: "Channels",
        },
        min: 0,
        max: 167,
        tickInterval: 1,
      },
      rangeSelector: {
        enabled: true,
        buttonPosition: {
          align: "left",
        },
        buttons: [
          {
            type: "hour", //0
            count: 1,
            text: "1h",
          },
          {
            type: "hour", //1
            count: 3,
            text: "3h",
          },
          {
            type: "hour", //2
            count: 6,
            text: "6h",
          },
          {
            type: "hour", //3
            count: 12,
            text: "12h",
          },
          {
            type: "day", //4
            count: 1,
            text: "1d",
          },
          {
            type: "day", //5
            count: 3,
            text: "3d",
          },
          {
            type: "day", //6
            count: 7,
            text: "7d",
          },
          {
            type: "day", //7
            count: 14,
            text: "14d",
          },
          {
            type: "month", //8
            count: 1,
            text: "1m",
          },
          {
            type: "month", //9
            count: 3,
            text: "3m",
          },
          {
            type: "month", //10
            count: 6,
            text: "6m",
          },
          {
            type: "year", //11
            count: 1,
            text: "1y",
          },
          {
            type: "all", //12
            text: "All",
          },
        ],
        buttonTheme: {
          // styles for the buttons
          fill: "none",
          stroke: "none",
          "stroke-width": 0,
          r: 4,
          style: {
            color: "#000",
            fontFamily:
              'VerizonNHGDS-Regular,"Helvetica Neue",Helvetica,Arial,sans-serif',
            fontWeight: "normal",
          },
          states: {
            hover: {
              fill: "#D8DADA",
              style: {
                color: "#000",
                fontFamily:
                  'VerizonNHGDS-Regular,"Helvetica Neue",Helvetica,Arial,sans-serif',
                fontWeight: "normal",
              },
            },
            select: {
              fill: "#000",
              style: {
                color: "white",
                fontFamily:
                  'VerizonNHGDS-Bold,"Helvetica Neue",Helvetica,Arial,sans-serif',
                fontWeight: "bold",
              },
            },
            disabled: {
              fill: "none",
              style: {
                cursor: "default",
              },
            },
          },
        },
      },
      tooltip: {
        useHTML: true,
      },
      series: chChangeData.map((item) => {
        return {
          type: "scatter",
          name: item.mac,
          data: [
            {
              x: +item.ts,
              y: +item.primary_ch,
            },
          ],
          tooltip: {
            headerFormat: "",
            pointFormatter: function () {
              return `<div>
                    <div><b>Primary Ch: </b> ${item.primary_ch}</div>
                    <div><b>Previous Ch: </b> ${item.prev_ch}</div>
                    <div><b>MAC: </b> ${item.mac}</div>
                    <div><b>Reason: </b> ${item.reason}</div>
                    <div><b>Bid: </b> ${item.bid}</div>
                    <div><b>Timestamp: </b> ${item.ts}</div>
                    <div><b>Score: </b> ${item.cur_score}</div>
                    <div><b>Prev. Score: </b> ${item.prev_score}</div>
                    </div>`;
            },
          },
        };
      }),
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
