// miniprogram/pages/usercenter/usercenter.js
Page({
  data: { userPhone: "", tipDialogViewShow: false,userGift:false },
  onLoad(options) {
    console.log(data);
    this.getDemo();
    let userPhone = wx.getStorageSync("userPhone");
    let userGift = wx.getStorageSync("userGift");
    this.updateData("userPhone", userPhone);
    this.updateData("userGift", userGift);
  },
  getDemo() {
    wx.cloud
      .callFunction({
        name: "request",
        data: {},
      })
      .then((res) => {
        // debugger;
        console.log(res);
      });
  },
  getGiftClick() {
    this.updateData("tipDialogViewShow", true);
    this.updateData("userGift", true);
    wx.setStorageSync("userGift", true);
  },
  getUserPhone(res) {
    console.log(res, cloudID);
    const cloudID = res.detail.cloudID;
    wx.cloud
      .callFunction({
        name: "gift",
        data: {
          phoneData: wx.cloud.CloudID(cloudID),
        },
      })
      .then((res) => {
        const phone = res.result.phoneData.data.phoneNumber;
        wx.setStorageSync("userPhone", phone);
        this.updateData("userPhone", phone);
      });
  },
  updateData(key, value) {
    let obj = {};
    obj[key] = value;
    this.setData(obj);
  },
  onDialogClick() {
    this.updateData("tipDialogViewShow", false);
  },
  toMyCardClick() {
    if (this.data.userPhone) {
      wx.navigateTo({ url: "../mycard/mycard" });
      wx.setStorageSync("userGift", true);
      this.updateData("userGift", true);
    } else {
      wx.showToast({
        title: "请登陆",
        icon: "none",
      });
    }
  },
});
