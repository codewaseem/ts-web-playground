export type Root = Record<
  string,
  {
    ch_change?: ChChange;
    ch_info?: ChInfo[];
  }
>;
export interface ChChange {
  bid: string;
  primary_ch: string;
  prev_ch: string;
  ts: string;
  reason: string;
  cur_score: string;
  prev_score: string;
  score: Score[];
  mac?:string;
}

export interface Score {
  ch: string;
  bss: string;
  busy: string;
  intf: string;
  intfadj: string;
  fcs: string;
  txpwr: string;
  bgnoise: string;
  cns: string;
  txop: string;
  score: string;
}

export interface ChInfo {
  bid: string;
  ch: string;
  tx: string;
  inbss: string;
  obss: string;
  nocat: string;
  nopkt: string;
  doze: string;
  txop: string;
  goodtx: string;
  badtx: string;
  glitch: string;
  badplcp: string;
  cns_score: string;
  knoise: string;
}

export const dataChannelChange: Root = {
    "04:A2:22:B7:93:91": {
        ch_change: {
          bid: "10",
          primary_ch: "60",
          prev_ch: "48",
          ts: "1644523200000",
          reason: "9",
          cur_score: "648",
          prev_score: "101",
          score: []
        },
        ch_info: []
      },
      "04:A2:22:C8:F4:01": {
        ch_change: {
          bid: "11",
          primary_ch: "40",
          prev_ch: "36",
          ts: "1644544800000",
          reason: "11",
          cur_score: "792",
          prev_score: "648",
          score: []
        },
        ch_info: []
      },
      "64:CC:22:73:6B:72": {
        ch_change: {
          bid: "12",
          primary_ch: "1",
          prev_ch: "6",
          ts: "1644566400000",
          reason: "7",
          cur_score: "540",
          prev_score: "415",
          score: []
        },
        ch_info: []
      },
      "64:CC:22:73:6C:14": {
        ch_change: {
          bid: "13",
          primary_ch: "48",
          prev_ch: "149",
          ts: "1644588000000",
          reason: "8",
          cur_score: "687",
          prev_score: "487",
          score: []
        },
        ch_info: []
      },
      "64:CC:22:73:6D:16": {
        ch_change: {
          bid: "14",
          primary_ch: "36",
          prev_ch: "11",
          ts: "1644609600000",
          reason: "1",
          cur_score: "710",
          prev_score: "402",
          score: []
        },
        ch_info: []
      },
      "04:A2:22:B7:93:92": {
        ch_change: {
          bid: "15",
          primary_ch: "149",
          prev_ch: "60",
          ts: "1644631200000",
          reason: "3",
          cur_score: "599",
          prev_score: "304",
          score: []
        },
        ch_info: []
      },
      "04:A2:22:C8:F4:02": {
        ch_change: {
          bid: "16",
          primary_ch: "11",
          prev_ch: "40",
          ts: "1644652800000",
          reason: "5",
          cur_score: "458",
          prev_score: "792",
          score: []
        },
        ch_info: []
      },
      "64:CC:22:73:6B:73": {
        ch_change: {
          bid: "17",
          primary_ch: "6",
          prev_ch: "1",
          ts: "1644674400000",
          reason: "2",
          cur_score: "557",
          prev_score: "540",
          score: []
        },
        ch_info: []
      },
};
