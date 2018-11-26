//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    video: '',    //视频
    images: [],     //图片
  },
  onLoad: function () {

  },

  // 上传视频
  upVideo: function () {
    var that = this;
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 30,
      success: function (res) {
        that.uploadvideo(res)
      }
    })
  },
  //上传视频 目前后台限制最大100M，以后如果视频太大可以在选择视频的时候进行压缩
  uploadvideo: function (t) {
    console.log(t)
    var that = this;
    wx.uploadFile({
      url: 'https://procuratorate.fengsh.cn/api' + '/upload/index',
      filePath: t.tempFilePath,
      name: "file",
      success: function (t) {
        var data = t.data;
        t = JSON.parse(t.data);
        var imgarr = 'https://procuratorate.fengsh.cn' + t.data.name;
        if (imgarr == "") {

        }
        that.setData({
          video: imgarr
        })
        wx.hideLoading();
      },
      fail: function (e) {
        wx.hideLoading(), wx.showToast({
          title: '上传失败',
        })
      }
    });
  },
  // 上传视频结束


  // 上传图片
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://procuratorate.fengsh.cn/api' + '/upload/index',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              console.log(res.data, '这是上传图片成功444')
              var data = res.data;
              res = JSON.parse(res.data);
              var imgarr = that.data.images;
              imgarr.push('https://procuratorate.fengsh.cn' + res.data.name);
              that.setData({
                images: imgarr
              })
              console.log(that.data.images, '8888888')
            }
          })
        }
        // $digest(this)
      }
    })
  },

  // 录音
  Startrecord: function () {
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
        wx.playVoice({
          filePath: tempFilePath
        })

        setTimeout(function () {
          //暂停播放
          wx.pauseVoice()
        }, 5000)
      }
    })


    setTimeout(function () {
      wx.stopVoice()
    }, 5000)
  },



  Stoprecord: function () {
    var that = this;
    wx.stopRecord({
      success: function (res) {
        // succes
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

})
