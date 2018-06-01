<template>
<div>
	<div class="login_box">
		
		<div class="login_box_inside">
			
			<div class="login_box_inside1 bounceInLeft animated"  @click="challengeBox"></div>
			
			<div class="login_box_inside2 animated bounceInRight"></div>
		</div>
		<transition name="fade">
		<div class="login_box2" v-if="login_kuang">
			<div class="login_box_login">
				<div class="login_box_login_name">
					<div><span>姓名</span></div>
					<input type="text" v-model="trueName"  placeholder ="请填写您的真实姓名" />
				</div>
				
				<div class="login_box_login_name">
					<div><span>手机号</span></div>
					<input type="number"  v-model="phone" placeholder =""/>
				</div>
				<div class="login_box_login_names">
					<div><span>验证码</span></div>
					<input type="number"  v-model="verificationCode" placeholder =""/>
					<p @click="getCode">{{countDownTime}}</p>
				</div>
				<div class="submitPhone" @click="submitPhone">
					提交
				</div>
			</div>
		</div>
		</transition>
	</div>
</div>
</template>
<script>
	import {countDown,RM,weixin,setItem,getItem} from '../method.js'
	import { Toast ,MessageBox } from 'mint-ui';
    export default{
		data(){
			return {
				login_kuang:false,
				trueName:"",
				phone:'',
				verificationCode:"",
				countDownTime:'获取验证码',
				countDownTimeState:true
			}
		},
		async created(){
			if(JSON.parse(getItem('MY_USER_INFO'))){
				let datas = JSON.parse(getItem('MY_USER_INFO'))
				if(!datas.mobile){
					this.login_kuang = true
				}
			}else{
				console.log(2)
				try{  
					let res = await this.$http.post(`${RM}/home/getuser`)
					console.log('这是logingetuser',res)
					if(res.data.state == 1){
						let data = res.data.data
						setItem('MY_USER_INFO',JSON.stringify(data));
						if(data.mobile){
							this.login_kuang = false
						}
					}else if(res.data.state == 0){ 
						this.login_kuang = true
					}
				}catch(e){
	               alert(e)
	            } 
			}
			 
			
		},
		methods:{
			submitPhone(){//提交
				let that = this
				if(this.trueName != "" && this.phone != "" && this.verificationCode != ""){
					let objs = {
						name:this.trueName,
						phone:this.phone,
						code:this.verificationCode
					}
					this.$http.post(`${RM}/home/putuser`,objs).then(res => {
						console.log(res)
						if(res.data.state == 1){
							Toast({message: res.data.message,duration: 2000});
							this.login_kuang = false
							setItem('MY_USER_INFO',JSON.stringify(res.data.data));
						}else if(res.data.state == 0){
							Toast({message: res.data.message,duration: 2000});
						}
						
					})
				}
				
			
				//window.location.href = 'https://treasure.17link.cc/home/getuser'
				
//				this.$http.post(`${RM}/home/login`).then(res => {
//					console.log(res)
//				})
				//this.login_kuang = !this.login_kuang
			},
			async getCode(){//获取优惠码
				let that = this
				if(!that.countDownTimeState) return
				function isPoneAvailable(str) {  
			          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
			          if (!myreg.test(str)) {  
			              return false;  
			          } else {  
			              return true;  
			          }  
		      	} 
				if(!isPoneAvailable(that.phone)){
					Toast({message: '请输入有效的手机号码',duration: 1000});
					return
				}
				that.countDownTimeState = false
				try{ 
					let res = await this.$http.post(`${RM}/home/login`,{phone:this.phone})
					if(res.data.state == 1){
						countDown(that,60)
					}else if(res.data.state == 0){
						Toast({message: res.data.message,duration: 1000});
						that.countDownTimeState = true
					}
					console.log(res)
				}catch(e){
	               that.countDownTimeState = true
	           } 
			},
			challengeBox(){//宝箱作战
			 	this.$http.post(`${RM}/home/getuser`).then(res => {			
					console.log('这是logingetuser',res)
					if(res.data.state == 1){
						let data = res.data.data
						setItem('MY_USER_INFO',JSON.stringify(data));
						this.$router.push({path:"/home"})
					}else if(res.data.state == 0){ 
						this.login_kuang = true
					}
			 	})
			}
		},
	}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.submitPhone{
	width: 100%;
	height: .68rem;
	border: .01rem solid #510d00;
	line-height: .68rem;
	text-align: center;
	font-weight: bold;
	margin-top: .4rem;
}
.login_box_login_name{
	display: flex;
  	margin-top: .15rem;
  	line-height: .4rem;
	border-bottom: .01rem solid #510d00;
	padding: .13rem 0;
}
.login_box_login_names{
	display: flex;
  	margin-top: .15rem;
  	line-height: .4rem;
	border-bottom: .01rem solid #510d00;
	padding: .13rem 0;
}
.login_box_login_names>p{
	font-size: .2rem;
	height: .4rem;
	width: 1.3rem;
	border: .01rem solid #510d00;
	line-height: .38rem;
	color:#510d00;
	text-align: center;
	font-weight: bold;
}
.login_box_login_names>div{
	font-size: .24rem;
	color: #510d00;
	line-height: .4rem;
	width: .85rem;
	text-align: left;
	height: .4rem;
	font-weight: bold;
}
.login_box_login_names>input{
	font-size: .2rem;
	color: #510d00;
	background: none;
	height: .38rem;
	width: 1.2rem;
}
.login_box_login_name>div{
	font-size: .24rem;
	color: #510d00;
	line-height: .4rem;
	width: .85rem;
	text-align: left;
	height: .4rem;
	font-weight: bold;
}
.login_box_login_name>input{
	font-size: .2rem;
	color: #510d00;
	line-height: .4rem;
	background: none;
	height: .4rem;
	width: 2.25rem;
	flex: 1;
}
.login_box_login{
	width: 5rem;
	height: 6.15rem;
	background: url(../image/adyibg.png) no-repeat; 
	background-size: 5rem 6.15rem;
	padding: 0 .8rem;
	padding-top: 1rem;
	box-sizing: border-box;
}
.login_box2{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0,0,0,.7);
}
.login_box{
	background:url(../image/loginbg.png);
	background-size:7.5rem 13rem;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
.login_box_inside1{
	text-align: center;
	width: 4rem;
	height: 4rem;
	background: url(../image/111.png) no-repeat;
	background-size:4rem 4rem ;
}

.login_box_inside2{
	margin-top: 1rem;
	text-align: center;
	width: 4rem;
	height: 4rem;
	background: url(../image/111.png) no-repeat ;
	background-size:4rem 4rem ;
}


</style>
