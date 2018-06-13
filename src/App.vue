<template>
  <div id="app">
  	<audio  loop="loop" id="bgAudio" src="../static/mi.mp3" autoplay="autoplay"></audio>
	  <transition name="component-fade" mode="out-in">
	    <router-view/>
	  </transition>
  </div>
</template>

<script>
import {countDown,RM,weixin,setItem,getItem,sha1,generateMixed,removeItem} from './method.js'
 

export default {
  name: 'App',
  watch:{
      '$route':res => {
          console.log(res)
      }
  },
  created(){

        removeItem('MY_USER_INFO')
    // try{  }catch(e){}
    // async    await 
        // var bgAudio = document.getElementById('bgAudio');
        this.$router.push({path:"/"})
        let textHref = window.location.href
        let textHash = window.location.hash
        let text = textHref.replace(textHash,"")
        this.$http.get(`${RM}/home/getsig?url=${text}`).then(res => {
            console.log(res)
            if(res.data){
                let datas = res.data                 
                wx.config({
                    debug: datas.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: datas.appId, // 必填，公众号的唯一标识
                    timestamp: datas.timestamp, // 必填，生成签名的时间戳
                    nonceStr: datas.nonceStr, // 必填，生成签名的随机串
                    signature:  datas.signature,// 必填，签名
                    jsApiList: ['ready','error','previewImage'] // 必填，需要使用的JS接口列表
                });
                bgAudio.play();
                document.addEventListener("WeixinJSBridgeReady", function () {
                    bgAudio.play();
                }, false);
            }
        })

        
        // this.$http.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf56e899a56088dbc&secret=c86d184e788328615e586a3ad787a158`).then(res => {
        //     console.log(1,res)
        //      this.$http.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${res.data.access_token}&type=jsapi`).then(res => {
        //         console.log(2,res)  
        //            let time = new Date().getTime()
        //            let non = generateMixed(32)
        //             wx.config({
        //                 debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //                 appId: 'wxf56e899a56088dbc', // 必填，公众号的唯一标识
        //                 timestamp: time, // 必填，生成签名的时间戳
        //                 nonceStr: non, // 必填，生成签名的随机串
        //                 signature:  sha1(`jsapi_ticket=${ res.data.ticket}&noncestr=${non}&timestamp=${time}&url=${'https://treasure.17link.cc'}`),// 必填，签名
        //                 jsApiList: ['ready','error','previewImage'] // 必填，需要使用的JS接口列表
        //             });
        //     })
        // })

    
    },
    mounted(){
        var bgAudio = document.getElementById('bgAudio');
       
        bgAudio.play();
        // 兼容在微信里自动播放
        document.addEventListener("WeixinJSBridgeReady", function () {
        
            bgAudio.play();
        }, false);
    }       
}
</script>

<style>
#app{
    height:100%
}
.answerMistake{
	  position: fixed;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    opacity: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;

}
.answerMistake>span{
	  font-size: 14px;
    display: block;
    text-align: center;
}

.answerMistake-enter-active, .answerMistake-leave-active {
  transition: opacity .6s;
}

.answerMistake-enter, .answerMistake-leave-to  {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to{
  opacity: 0;
}
html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
    margin: 0;
    padding: 0;
}

html, body {
    height: 100%;
}

body {
    font-family: "Microsoft YaHei";
    font-size:14px;
    color:#333;
    background: #180903;
}
h1, h2, h3, h4, h5, h6{font-weight:normal;}
ul,ol {
    list-style: none;
}

img {
    border: none;
    vertical-align: middle;
}

a {
    text-decoration: none;
    color: #232323;
}

table {
    border-collapse: collapse;
    table-layout: fixed;
}

input, textarea {
    outline: none;
    border: none;
}

textarea {
    resize: none;
    overflow: auto;
}

.clearfix {
    zoom: 1;
}

.clearfix:after {
    content: ".";
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow:hidden;
}

.fl {
    float: left
}

.fr {
    float: right
}

.tl {
    text-align: left;
}

.tc {
    text-align: center
}

.tr {
    text-align: right;
}

.ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.inline{
    display: inline-block;
    *display: inline;
    *zoom: 1;
}
</style>
