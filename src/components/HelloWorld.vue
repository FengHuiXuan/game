<template>
  <div class="helloWorld">
    <div class="arrangementfrom bounceInLeft animated" @click="lookList">
    	排行榜
    </div>
	<transition name="fade">
    <div class="tickets_go" @touchend='touchendDom' v-show="preferentialTicket">
    	<div class="tickets_go_gongxi"><img src="../image/gongxihuode.png" /></div>
    	<div class="tickets_go_baoxing" ><img 
    		@touchstart='touchstartDom'
    		@touchmove='touchmoveDom'
    		src="../image/admissiontickets.jpg" /></div>
    	<div class="tickets_go_huoqu">
    		<div class="datibgse" @click="datibgseling">
					领取入场券
				</div>
    	</div>
    </div>
	</transition>	
	<!--<transition  v-on:after-enter="afterEnter" name="answerMistake">
		<div class="answerMistake" v-show="pop_up">
			<span>回答错误</span>
		</div>
	</transition>	-->
	<transition name="fade">
    <div v-show="dataState" class="scrollYellow">
    	<div class="scrollYellows zoomIn animated">
    		<div class="scrollYellows_ ">
    			<div class="scrollYellows_head">
    				<span >{{issueListItem.issue}}</span>
    			</div>
    			<ul class="scrollYellows_center">
    				<li v-for="item,index in issueListItem.answer" @click="issueListItemIndexitem(index)">
    					<span>{{item.order}}、</span>
    					<div :class="issueListItemIndex== index?'scrollYellows_center_left_text scrollYellows_center_left':'scrollYellows_center_left' "><p>{{item.texts}}</p></div>
    					<i></i>
    				</li>
    			</ul>
    			<div class="scrollYellows_tijiao">
    				<p @click="subit">提交</p>
    			</div>
    		</div>
    	</div>
    </div>
	</transition>	
		<div class="godati">
			<div class="godaticen">
				<div v-show="gongxiyouhui" class="congratulationGet">
					<img onclick="return false" src="../image/shenmi2.png"/>
					<img onclick="return false" src="../image/sehnmi1bg.png"/>
				</div>
				<img class="godaticen_off bounceInDown animated" v-show="!gongxiyouhui" onclick="return false" @click="begindati" src="../image/baoxiangwu.png"/>
				<img v-show="gongxiyouhui" class="godaticen_on" onclick="return false" src="../image/gobox.png"/>
				<div v-show="gongxiyouhui" class="open_box"  @click="begindati">
					<div v-show="gongxiyouhui" class="datibgse">
						重新答题
					</div>
				</div>
				
				<div v-show="!gongxiyouhui" class="open_box"  @click="begindati">
					<img class="pulse animated infinite" onclick="return false" src="../image/openbg.png"/>
				</div>
			</div>
		</div>
	
  </div>
</template>

<script>
import {issueData} from '../issueData.js'
import {countDown,RM,weixin,setItem,getItem} from '../method.js'
import { Toast ,MessageBox,InfiniteScroll } from 'mint-ui';

export default {
  name: 'HelloWorld',
  data () {  	
	    return {
	      msg: 'Welcome to Your Vue.js App',
		  dataState:false, //答题
		  preferentialTicket:false, //获取优惠券
		  gongxiyouhui:false, //已获得优惠券
		  issueList:issueData,
		  pop_up:false,
		  scrollHeight:"",
		  scrollPageX:"",
		  scrollPageY:"",
		  issueListItem:{
			  issue:"",
			  answer:[]
		  },
		  dataStateIndex:0,
		  issueListItemIndex:-1,
		  DateGetTime:0,
		  parentHeight:'',
		  dimoffsetTop:"",
	    }
  },
  async created(){
  	if(!JSON.parse(getItem('MY_USER_INFO'))){
			try{  
				let res = await this.$http.post(`${RM}/home/getuser`)
				console.log('这是logingetuser',res)
				if(res.data.state == 1){
					let data = res.data.data
					setItem('MY_USER_INFO',JSON.stringify(data));
				}else if(res.data.state == 0){
					window.location.href = 'https://treasure.17link.cc'
				}
			}catch(e){
				window.location.href = 'https://treasure.17link.cc'
			} 			
		}
  	
	},
  methods:{
  	touchstartDom(e){
  		this.parentHeight = e.target.offsetParent.offsetHeight
  		this.scrollHeight = e.target.offsetHeight
  		this.scrollPageY = e.changedTouches[0].clientY
  		this.dimoffsetTop = e.target.offsetTop
  	},
  	touchmoveDom(e){
  		let Y = e.changedTouches[0].clientY-this.scrollPageY
  		this.parentHeight-this.scrollHeight 
  		let pY = this.dimoffsetTop+Y
  		if(pY<0 && pY>this.parentHeight-this.scrollHeight ){
  			e.target.style.top = pY+'px' 
  		}

  	},
  	touchendDom(e){
  		console.log(e)
  	},
		lookList(){ //查看排行榜
		  this.$router.push({path:"/rankingList"})
		},
		//afterEnter(){ 
		//	this.pop_up = false
		//},
		  datibgseling(){ //领取优惠券
		  	this.preferentialTicket = false
		  	this.gongxiyouhui = true
		  },
			subit(){ //提交 回答问题
				let that = this
				if(that.issueListItemIndex == -1) return
				if(!that.issueListItem.answer[that.issueListItemIndex].correct){				
					Toast({message: '回答错误',duration: 500});
					//that.pop_up = true
					return
				} 
				that.dataStateIndex++
				that.issueListItemIndex = -1
				if(that.dataStateIndex >= 12){ //答题通过
					let dateTime =  Math.round((new Date().getTime()- that.DateGetTime)/1000) 
					let getData = JSON.parse(getItem('MY_USER_INFO'))
					if(!getData) return 
					let objData = {
						id:getData.id,
						time:dateTime
					}
					that.$http.post(`${RM}/home/questions`,objData).then(res => {
						console.log(res)
						if(res.data.state == 0){
							Toast({message: res.data.message,duration: 2000});
						}else if(res.data.state == 1){
							MessageBox('提示', '恭喜您答题通过用时'+dateTime+'s');
						}
					})
					that.dataState = false
					that.preferentialTicket = true
					return
				} 
				let index = that.dataStateIndex
				that.issueListItem = that.issueList[index]
			},
			begindati(){ //打开宝箱回答问题
				let that = this
				let data = that.issueList.sort((a,b) => {
					return Math.random()-0.5
				})
				
				that.DateGetTime = new Date().getTime()
				let getData = JSON.parse(getItem('MY_USER_INFO'))
				if(!getData) return 
				that.$http.get(`${RM}/home/getcount/${getData.id}`).then(res => {
					console.log(res)
					if(res.data.state == 1){
						if (res.data.sum < 3) {
							MessageBox.confirm('你还有'+(3-res.data.sum )+'次答题机会确定开始答题?').then(action => {
		  				that.issueList = data
							that.dataState = true
							that.issueListItem = that.issueList[0]
						});
						}else if(res.data.sum >= 3){
							MessageBox('提示', '您已没有答题机会');
						}
					}
				})
				
			},
			issueListItemIndexitem(index){ //答题ictive
				this.issueListItemIndex = index
			}

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.animation_count_infinite{
	animation-iteration-count: infinite;
}
.congratulationGet>img{
		height: .7rem;
}
.congratulationGet{
	margin-bottom: .3rem;
	text-align: center;
}
.helloWorld{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-image:url(../image/homebg.png) ;
	background-color: #000;
	background-size: 7.5rem;
	background-repeat: no-repeat
}
.tickets_go{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0,0,0,0.8);
	z-index: 100;
}
.tickets_go>div{
	text-align: center;
}
.tickets_go_gongxi>img{
	width: 4.68rem;
	height: 1.73rem;
}
.tickets_go_gongxi{
	margin-top: 1.5rem;
}
.tickets_go_baoxing{
	margin-top: .4rem;
	height: 5rem;
	overflow: hidden;
	position: relative;
}
.tickets_go_baoxing>img{
	position: absolute;
	top: 0;
	left: 0;
	width: 7.5rem;

}
.tickets_go_huoqu{
	display: flex;
	justify-content: center;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 1.34rem;
}
.scrollYellows_{
	width: 5rem;
	padding-top: 1.5rem;
	position: relative;
}
.scrollYellows_head{
	font-size: .3rem;
	text-align: center;
	color: #510d00;
}
.scrollYellows_center_left_text{
	color:red
}
.scrollYellows_center{
	
}
.tickets_go_huoqu .datibgse{
	margin: 0;
	
}

.scrollYellows_tijiao{
	display: flex;
	justify-content: center;
	margin-top:.4rem ;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 1.2rem;
}

.scrollYellows_tijiao>p{
	font-size: .24rem;
	color: #510d00;
	width: 3rem;
	height: .66rem;
	border: .01rem solid #510d00;
	line-height: .66rem;
	text-align: center;
	font-weight: bold;
}
.scrollYellows_center>li{
	margin-top: .2rem;
	font-size: .24rem;
	display: flex;
	border-bottom: .01rem solid #510d00;
	padding: .2rem  0 .14rem 0;
	color: #510d00;
	font-weight: bold;
}
.scrollYellows_center>li>span{
	
}
.scrollYellows_center_left{
	text-align: center;
	flex: 1;
}
.scrollYellows_center_left>p{
	display:inline-block ;
	text-align: left;
}
.arrangementfrom{
	position: fixed;
	left: 0;
	top: .35rem;
	width: 2.12rem;
	height: .7rem;
	background-image: url(../image/paihangb.png);
	background-size: 2.12rem .7rem ;
	background-repeat:no-repeat ;
	font-size: .32rem;
	color: #000000;
	font-weight: bold;
	line-height: .7rem;
	padding-left:.25rem ;
}
.godati{
	display: flex;
	justify-content: center;
	position: fixed;
	bottom: .6rem;
	left: 0;
	right: 0;
}
.scrollYellow{
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background:rgba(0,0,0,.7) ;
	z-index: 10;
}
.scrollYellows{
	display: flex;
	justify-content: center;
	width: 7rem;
	background-image: url(../image/adyibg.png);
	background-size: 7rem 11.2rem;
	height: 11.2rem;
	background-repeat:no-repeat ;
	
}
.godaticen{
	text-align: center;
}
.godaticen_on{
	width: 5rem;
	height: 4.82rem;
	margin-right: .9rem;
}
.godaticen_off{
	width: 2.34rem;
	height: 2.15rem;
}
.datibgse{
	background-image: url(../image/datibg.png);
	background-size:2.48rem .7rem ;
	width: 2.48rem;
	height: .7rem;
	font-size: .32rem;
	font-weight: bold;
	text-align: center;
	line-height: .7rem;
	box-shadow: #666 0 0  .2rem;
	margin-top: .46rem;
}
.open_box>img{
	width: 3.78rem;
	height: .7rem;
}
.open_box{
	margin-top: .46rem;
	text-align: center;
	display: flex;
	justify-content: center;
}
</style>
