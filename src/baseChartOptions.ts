import { Options } from "../node_modules/highcharts/highcharts";
export const defaultColors = [
  "#0088CE",
  "#57B1DF",
  "#ABD8EF",
  "#FFBC3D",
  "#FFD37F",
  "#FFE9BF",
  "#00AC3E",
  "#ABE4BF",
  "#00AC3E",
  "#EE0000",
  "#000000",
  "#747676",
  "#B1B1B1",
  "#D8DADA",
  "#984700",
  "#CB5F00",
  "#ED7000",
  "#F3A157",
  "#F9D0AB",
  "#0F5B25",
  "#008330",
  "#00AC3E",
  "#57C880",
  "#ABE4BF",
  "#0B4467",
  "#136598",
  "#0088CE",
  "#57B1DF",
  "#ABD8EF",
  "#997126",
  "#CC9630",
  "#FFBC3D",
  "#FFD37F",
  "#FFE9BF",
];

export const defaultOptions: Options = {
  chart: {
    style: {
      fontFamily:
        'VerizonNHGDS-Regular,"Helvetica Neue",Helvetica,Arial,sans-serif',
    },
    plotBackgroundImage: "/img/watermark_03.png",
  },
  credits: {
    enabled: false,
  },
  lang: {
    noData: "No data available",
  },
  colors: defaultColors,
  yAxis: {
    title: {
        align: 'middle',
        style: {
            'color': 'black'
        }
    },
    labels: {
        style: {
            color: 'black',
            fontSize: "12px"
        }
    },
  },
  xAxis: {
    title: {
        align: 'middle',
        style: {
            'color': 'black'
        }
    },
    labels: {
        style: {
            color: 'black',
            fontSize: "12px"
        }
    },
    dateTimeLabelFormats: {
        millisecond: '%H:%M',
        second: '%H:%M'
    }
  },
  noData: {
    style: {
      fontFamily:
        'VerizonNHGDS-Regular,"Helvetica Neue",Helvetica,Arial,sans-serif',
      color: "#333",
      fontSize: "16px",
    },
  },
  title: {
    margin: 36,
    style: {
      fontFamily:
        'VerizonNHGDS-Bold,"Helvetica Neue",Helvetica,Arial,sans-serif',
      fontWeight: "bold",
      color: "#333",
      fontSize: "20px",
    },
    align: "left",
    verticalAlign: "top",
  },
  exporting: {
    sourceWidth: 1250,
    sourceHeight: 500,
    scale: 1,
    url: "https://nj51vmaspd2.nss.vzwnet.com:12346/",
    chartOptions: {
      chart: {
        events: {
          load: function () {
            this.renderer
              .image(
                "http://nj51damtpa3v.nss.vzwnet.com/VMAS/blacktheme/images/login-logo.png",
                0, // x
                30, // y
                117, // width
                40 // height
              )
              .add();
          },
        },
      },
    },
  },
};

function deepMerge<T>(target: T, source: Partial<T>): T {
    const merged = {...target};
  
    for (const key of Object.keys(source)) {
      const targetValue = (merged as any)[key];
      const sourceValue = (source as any)[key];
  
      if (typeof sourceValue === 'object' && typeof targetValue === 'object') {
        (merged as any)[key] = deepMerge(targetValue, sourceValue);
      } else {
        (merged as any)[key] = sourceValue;
      }
    }
  
    return merged;
  }

export const mergeOptions: typeof deepMerge<Options> = deepMerge;

export function getColorByIndex( index: number): string {
  const colorIndex = index % defaultColors.length;
  return defaultColors[colorIndex];
}
