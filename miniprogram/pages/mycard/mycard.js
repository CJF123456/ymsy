// miniprogram/pages/mycard/mycard.js
Page({
  data: { cardList: [] },
  onLoad: function (options) {
    this.getMyCards();
  },
  getMyCards() {
    let userPhone = wx.getStorageSync("userPhone");
    wx.showLoading({
      title: "加载中...",
    });
    wx.cloud
      .callFunction({
        name: "request",
        data: { action: "getMyCards", phone: userPhone, name: "gts" },
      })
      .then((res) => {
        // debugger;
        wx.hideLoading();
        console.log(res);
        let cardList = JSON.parse(res.result);
        this.setData({
          cardList,
        });
      })
      .catch((err) => {
        wx.hideLoading();
      });
  },
});
