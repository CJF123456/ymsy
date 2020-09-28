// miniprogram/pages/ceshi/ceshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    gift_hint: "",
    gift_name: "小气泡一次"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  get_phonenum(res) {
    const cloudID = res.detail.cloudID
    console.log(res, cloudID)
    wx.cloud.callFunction({
      name: 'gift',
      data: {
        phoneData: wx.cloud.CloudID(cloudID)
      }
    }).then(res => {
      const phone = res.result.phoneData.data.phoneNumber
      this.setData({
        phone: phone
      })
      this.get_gift(phone)
    })
  },

  get_gift(phone) {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('gift').where({
      phone: _.eq(phone)
    }).get().then(res => {
      console.log(res)
      if (res.data && res.data.length > 0) {
        wx.showToast({
          title: '您已领取小气泡一次，请及时到店使用。',
        })
        this.setData({
          gift_hint: "您已领取小气泡一次，请及时到店使用。"
        })
      } else {
        db.collection('gift').add({
            data: {
              phone: phone,
              gift_name: this.data.gift_name,
              pub_time: new Date(),
            }
          })
          .then(res => {
            console.log(res)
            this.setData({
              gift_hint: "恭喜成功领取" + this.data.gift_name + "，请尽快到店使用"
            })
          })
      }
    })
  }
})