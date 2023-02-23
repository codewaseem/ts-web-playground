import ChannelAnalysis2G from "./ChannelAnalysis2G";
import ChannelAnalysis5G from "./ChannelAnalysis5G";
import { data } from "./data";

const data2G: typeof data = [];
const data5G: typeof data = [];

data.forEach((item) => {
  if (item.band == "2.4G") {
    data2G.push(item);
  } else if (item.band == "5G") {
    data5G.push(item);
  }
});

const channelAnalysis2G = new ChannelAnalysis2G("container", data2G);
channelAnalysis2G.render();

const channelAnalysis5G = new ChannelAnalysis5G("container-5g-new", data5G);
channelAnalysis5G.render();
