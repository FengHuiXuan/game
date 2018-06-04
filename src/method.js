

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
function sha1(strss){
    
    function add(x, y) {  
        return((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);  
    }  
    
    function SHA1hex(num) {  
        var sHEXChars = "0123456789abcdef";  
        var str = "";  
        for(var j = 7; j >= 0; j--)  
            str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);  
        return str;  
    }  
    
    function AlignSHA1(sIn) {  
        var nblk = ((sIn.length + 8) >> 6) + 1,  
            blks = new Array(nblk * 16);  
        for(var i = 0; i < nblk * 16; i++) blks[i] = 0;  
        for(i = 0; i < sIn.length; i++)  
            blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);  
        blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);  
        blks[nblk * 16 - 1] = sIn.length * 8;  
        return blks;  
    }  
    
    function rol(num, cnt) {  
        return(num << cnt) | (num >>> (32 - cnt));  
    }  
    
    function ft(t, b, c, d) {  
        if(t < 20) return(b & c) | ((~b) & d);  
        if(t < 40) return b ^ c ^ d;  
        if(t < 60) return(b & c) | (b & d) | (c & d);  
        return b ^ c ^ d;  
    }  
    
    function kt(t) {  
        return(t < 20) ? 1518500249 : (t < 40) ? 1859775393 :  
            (t < 60) ? -1894007588 : -899497514;  
    }  
    
    function SHA1(sIn) {  
        var x = AlignSHA1(sIn);  
        var w = new Array(80);  
        var a = 1732584193;  
        var b = -271733879;  
        var c = -1732584194;  
        var d = 271733878;  
        var e = -1009589776;  
        for(var i = 0; i < x.length; i += 16) {  
            var olda = a;  
            var oldb = b;  
            var oldc = c;  
            var oldd = d;  
            var olde = e;  
            for(var j = 0; j < 80; j++) {  
                if(j < 16) w[j] = x[i + j];  
                else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);  
                var t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));  
                e = d;  
                d = c;  
                c = rol(b, 30);  
                b = a;  
                a = t;  
            }  
            a = add(a, olda);  
            b = add(b, oldb);  
            c = add(c, oldc);  
            d = add(d, oldd);  
            e = add(e, olde);  
        }  
        var SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e);  
        return SHA1Value.toUpperCase();  
    }  
    function SHA2(sIn) {  
        return SHA1(sIn).toLowerCase();  
    } 
    return SHA2(strss)
}

function generateMixed(n) {
    var res = "";
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];   
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res;
}

function setCookie(key, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = key + '=' + value + ';expires=' + oDate;

}
function removeCookie(key) {
    setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
}
function getCookie(key) {
    var cookieArr = document.cookie.split('; ');
    for(var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split('=');
        if(arr[0] === key) {
            return arr[1];
        }
    }
    return false;
}







export {
	countDown,
	RM,
	weixin,
	getItem,
    setItem,
    removeItem,
    sha1,
    generateMixed,
    setCookie,
    removeCookie,
    getCookie
}

