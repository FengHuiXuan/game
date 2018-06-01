<template>
  <div id="app">
  	<audio  loop="loop" src="static/mi.mp3" autoplay="autoplay"></audio>
	  <transition name="component-fade" mode="out-in">
	    <router-view/>
	  </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
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
    min-height: 100%;
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
