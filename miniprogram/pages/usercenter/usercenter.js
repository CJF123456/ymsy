// miniprogram/pages/usercenter/usercenter.js
Page({
  data: { userPhone: "", tipDialogViewShow: false },
  onLoad(options) {
    this.getDemo();
    let userPhone = wx.getStorageSync("userPhone");
    this.updateData("userPhone", userPhone);
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
    this.updateData("tipDialogViewShow",true)
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
  onDialogClick(){
    this.updateData("tipDialogViewShow",false)
  }
});
