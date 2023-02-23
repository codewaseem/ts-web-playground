declare module Highcharts {

}

type LineData = Record<
  number,
  {
    count: number;
    color: string;
    center?: number;
  }
>;