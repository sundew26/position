<template>
  <div class="locate clearfix" @click="locateAddr()">
    <span class="item-txt">{{addr || '定位到当前位置'}}</span>
    <span class="iconfont icon-locate"></span>
  </div>
  <toast :show.sync="showToast" type="text" width="20em">{{toastMsg}}</toast>
</template>
<script>
  /* eslint-disable */
  import {Toast} from 'vux/src/components'
  export default {
    data () {
      return {
        showToast: false,
        toastMsg: '定位中...',
        addr: ''
      }
    },
    components: {
      Toast
    },
    methods: {
      // 定位到当前位置
      locateAddr () {
        let options = {
          enableHighAccuracy: true,
          maximunAge: 1000,
          timeout: 5000
        }
        if (window.navigator.geolocation) {
          this.showToast = true
          navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback, options)
        } else {
          window.alert('您的浏览器不支持定位!')
        }
      },
      // 定位当前地址成功回调
      successCallback (position) {
        this.coordsToPos(position.coords.longitude, position.coords.latitude)
      },
      // 定位当前地址失败回调
      errorCallback (error) {
        let _this = this
        // 获取失败时调百度接口
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (position) {
          if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            _this.coordsToPos(position.point.lng, position.point.lat)
          }
          else {
            window.alert('获取失败')
          }
        }, {enableHighAccuracy: true})
      },
      coordsToPos (longitude, latitude) {
        let point = new BMap.Point(longitude, latitude)
        let geoc = new BMap.Geocoder()
        geoc.getLocation(point, function (rs) {
          let addComp = rs.addressComponents
          this.showToast = false
          this.addr = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
        }.bind(this))
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/common.scss';
  .locate {
    font-size: 16px;
    line-height: 50px;
    border-bottom: 1px solid #dedede;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    cursor: pointer;
    .item-txt {
      flex: 1;
    }
    .icon-locate {
      width: 16px;
      height: 16px;
      padding-right: 10px;
    }
  }
</style>
