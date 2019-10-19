//index.js
var wxbarcode = require('../../utils/index.js');

Page({

  data: {
    code: 'my20889938'
  },

  onLoad: function () {
    wxbarcode.barcode('barcode', 'my20889938', 680, 200);
    wxbarcode.qrcode('qrcode', 'my20889938', 420, 420);
  }
})
