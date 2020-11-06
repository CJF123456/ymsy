// 云函数入口文件
const cloud = require("wx-server-sdk");
const Request = require("request-promise");
cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  if (!event.action) return "参数错误";
  let url = null;
  switch (event.action) {
    case "getMyCards":
      if (!event.phone) return "参数错误";
      let phone=event.phone
      let name=event.name
      url = `http://192.144.148.99:8008/xijie/get_coupon?phone=${phone}&wx_name=${name}`;
      break;
    default:
      url = "http://192.144.148.99:8008/line_chart";
      break;
  }
  let result = Request(url)
    .then((html) => {
      console.log(html);
      return html;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};
