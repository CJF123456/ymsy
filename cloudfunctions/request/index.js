// 云函数入口文件
const cloud = require("wx-server-sdk");
const Request = require("request-promise");
cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let url = "http://192.144.148.99:8008/line_chart";
  let res= Request(url)
    .then((html) => {
      return html;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};
