<template>
<div class="rankingList_box">
	<div class="rankingList_box_h">
 		<div class="rankingList_box_bar">
 			<div 
 				@click="ranking_tabber(1)"
 				:class='rankingList_tabber == 1?"rankingList_active":""'><span>个人</span></div>
 			<div 
			 	@click="ranking_tabber(2)"
 				:class='rankingList_tabber == 2?"rankingList_active":""'><span>团队</span></div>
 		</div>
 		<div class="rankingList_box_barder">
 			<div class="rankingList_box_barder1"><span>{{rankingList_tabber == 1 ?'姓名':rankingList_tabber == 2?'团队':""}}</span></div>
 			<div class="rankingList_box_barder2"><span v-show="rankingList_tabber == 1">团队</span></div>
 			<div class="rankingList_box_barder3"><span>{{rankingList_tabber == 1 ?'用时':rankingList_tabber == 2?'积分':""}}</span></div>
 		</div>
	</div>
	<ul class="rankingList_">
		<li class="rankingList_li" v-for="item,index in ranking_List">
			<div class="rankingList_left">
				<div>
					<span>{{index+1}}</span>
				</div>
			</div>
			<div class="rankingList_right">
				<div class="rankingList_box_barder1">
					<!--<span v-show="rankingList_tabber == 1">{{item.user_name}}</span><span v-show="rankingList_tabber == 2">{{item.team_cate}}-{{item.team_type}}</span>-->
					<span>{{rankingList_tabber == 1 ? item.user_name : item.team_cate+'-'+item.team_type}}</span>
				</div>
 				<div class="rankingList_box_barder2"><span v-show="rankingList_tabber == 1">{{item.team_cate}}-{{item.team_type}}</span></div>
 				<div class="rankingList_box_barder3">
 					<!--<span v-show="rankingList_tabber == 1">{{item.min_time}}</span><span v-show="rankingList_tabber == 2">{{item.ave}}</span>-->
 					<span>{{rankingList_tabber == 1 ? item.min_time : item.ave}}</span>
 				</div>
				
			</div>
		</li>
		
		
	</ul>
	<div class="rankingList_button">
		<div @click="returnHome">返回首页</div>
	</div>
</div>
</template>
<script>
	import {RM,weixin,getItem,setItem} from '../method.js'
	import { Toast ,MessageBox } from 'mint-ui';
	export default{
		data(){
			return {
				rankingList_tabber:1,
				ranking_List:[]
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
			console.log(123)
			this.personageList()
			
		},
		methods:{
			ranking_tabber(id){
				if(this.rankingList_tabber == id) return
				this.rankingList_tabber = id
				
				if(id == 1){
					this.personageList()					
				}else if(id = 2){
					this.teamList()
				}
			},
			personageList(){ //个人列表
				let that = this
				that.$http.get(`${RM}/home/ranksone`).then(res => {
					console.log(res)
					if(res.data.state == 1){
						that.ranking_List = res.data.data
					}
				})
			},
			teamList(){//团队列表
				let that = this
				that.$http.get(`${RM}/home/ranksteam`).then(res => {
					console.log(res)
					if(res.data.state == 1){
						that.ranking_List = res.data.data
					}
				})
			},
			returnHome(){
				this.$router.push({path:"/"})
			}
		}
	}
</script>
<style>
.rankingList_box .rankingList_active{
	color: #000;
	background: #ffd800;
	border-color: #ffd800;
}
.rankingList_box{
	height: 100%;
}
.rankingList_{
	margin-top: 3.25rem;
	
}
.rankingList_li:nth-child(1){
	padding-top:.2rem;
}
.rankingList_li{
	display: flex;
	padding-top:.38rem;
}
.rankingList_right>div{
	
}
.rankingList_right span{
	color: #ababab;
	font-size: .28rem;
	line-height: .47rem;
}
.rankingList_left{
	width: 1.5rem;
	color: #ffd800;
}
.rankingList_left>div{
	width: .56rem;
	height: .47rem;
	background-size:.56rem .47rem ;
	background-repeat:no-repeat ;
	margin-left: .57rem;
	text-align: center;
	font-size: .24rem;
}
.rankingList_li:nth-child(1) .rankingList_left>div{
	background-image: url(../image/paim1.png);
	color: #000;
}
.rankingList_li:nth-child(2) .rankingList_left>div{
	background-image: url(../image/paim2.png);
	color: #000;
}
.rankingList_li:nth-child(3) .rankingList_left>div{
	background-image: url(../image/paim3.png);
	color: #000;
}
.rankingList_right{
	display: flex;
	border-bottom:.01rem dashed #5e534f ;
	padding-bottom:.36rem;
}
.rankingList_button{
	position: fixed;
	left: 0;
	right: 0;
	bottom: .6rem;
	display: flex;
	justify-content: center;
}
.rankingList_button>div{
	height: .68rem;
	width: 2.5rem;
	background-image:url(../image/datibg.png) ;
	background-size:2.5rem .68rem ;
	text-align: center;
	line-height: .68rem;
	font-size: .3rem;
	color: #4a3d00;
	font-weight: bold;
}
.rankingList_box_barder{
	display: flex;
	padding-left: 1.5rem;
	margin-top: .42rem;
}
.rankingList_box_barder1{
	width: 1.85rem;
}
.rankingList_box_barder2{
	width: 2.6rem;
}

.rankingList_box_barder>div{
	font-size: .3rem;
	color: #ffd800;
	font-weight: bold;
}
.rankingList_box_bar{
	margin-top: 1.8rem;
	display: flex;
	justify-content: center;
}
.rankingList_box_bar>div:nth-child(1){
	margin-right: .3rem;
}
.rankingList_box_bar>div{
	height: .48rem;
	border:.02rem solid #fff;
	line-height: .48rem;
	text-align: center;
	width: 1.22rem;
	border-radius: .5rem;
	color: #fff;
	font-size: .28rem;
}
.rankingList_box_h{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	
	height: 3.25rem;
	background-image: url(../image/paihangbangbg.png);
	background-size:7.5rem ;
	background-repeat:no-repeat ;
}
</style>
