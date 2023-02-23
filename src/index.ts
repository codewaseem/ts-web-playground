import ChannelAnalysis2G from "./channel-analysis/ChannelAnalysis2G";
import ChannelAnalysis5G from "./channel-analysis/ChannelAnalysis5G";
import ChannelChangeChart from "./channel-change/ChannelChangeChart";
import { data2G, data5G } from "./channel-analysis/data";
import { dataChannelChange } from "./channel-change/data";


const channelAnalysis2G = new ChannelAnalysis2G("container", data2G);
channelAnalysis2G.render();

const channelAnalysis5G = new ChannelAnalysis5G("container-5g-new", data5G);
channelAnalysis5G.render();

const channelChange = new ChannelChangeChart('channel-change', dataChannelChange);

channelChange.render();
