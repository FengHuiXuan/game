

function countDown(that,n){
	if(n<=0){
		that.countDownTime = '重新获取'
		that.countDownTimeState  = true
		return
	}
	n--
	setTimeout(res => {
		that.countDownTime = n
		countDown(that,that.countDownTime)
	},1000)
}


const getItem = item => {
    return localStorage.getItem(item)
}
const setItem = (item,value) => {
    localStorage.setItem(item, value)
}
const removeItem = item => {
    localStorage.removeItem(item)
}



let product = true 
let RM = product ? 'https://treasure.17link.cc': '/apis'


var weixin = {
    config: {
        url:'https://treasure.17link.cc/home/getuser',
        userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
        api:'https://treasure.17link'
    },
    isweixin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        } else {
            return false;
        }
    },
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    },
    getUser : function(code) {
        $.ajax({
            type: 'get',
            url: weixin.config.api + '/third/weixin/xxx?code='+code,
            cache:false,
            async: false,
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(json){
                localStorage.setItem('MY_USER_INFO',JSON.stringify(json));
            },
            error: function(json) {
                console.log(json);
            }
        })
    },
    getUserInfo:function(){
        if(weixin.config.userInfo != null){
            return JSON.parse(localStorage.getItem('MY_USER_INFO'));
        }else{
            if(weixin.getQueryString('code') != null){
                weixin.getUser(weixin.getQueryString('code'));
                return JSON.parse(localStorage.getItem('MY_USER_INFO'));
            }else{
                window.location.href = weixin.config.url;
            }
        }
    }
}


export {
	countDown,
	RM,
	weixin,
	getItem,
    setItem,
    removeItem,
}

