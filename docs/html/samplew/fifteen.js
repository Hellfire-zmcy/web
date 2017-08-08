/* 姓名：杨赫男
 * 学号：09333022
 * 实现的附加功能：
 *     1.拼图成功后的祝贺
 *     2.多张拼图背景可供选择
 */
var puzzlearea;// 全局变量
var blankBlock = document.createElement("div");
var selectPuzzle = document.createElement("select");
var back1;
var back2;
var back3;
var back4;
window.onload = function() {
	document.getElementsByTagName("body")[0].style.backgroundImage = "url(originalback.jpg)";
	puzzlearea = document.getElementById("puzzlearea").getElementsByTagName("div");
	// 为拼块设置样式并调整位置
	//alert(puzzlearea.length);
	for ( var i = 0; i < puzzlearea.length; i++) {
		puzzlearea[i].className = 'puzzlepiece';
		var num = parseInt(i / 4);// parseInt函数：丢弃数字小数部分，取整
		var remainder = i % 4;
		puzzlearea[i].style.left = remainder * 100 + "px";
		puzzlearea[i].style.top = num * 100 + "px";
		// 设置拼块背景
		puzzlearea[i].style.backgroundPosition = -1 * remainder * 100 + "px"+ " " + (-1) * num * 100 + "px";
	}
	// 添加空白块并设置其样式和位置
	document.getElementById("puzzlearea").appendChild(blankBlock);
	blankBlock.className = 'puzzlepiece';
	blankBlock.style.backgroundImage = "none";
	blankBlock.style.left = "300px";
	blankBlock.style.top = "300px";
	// 鼠标悬浮在可移动块上时要变换其样式
	for ( var j = 0; j < puzzlearea.length; j++) {
		puzzlearea[j].onmouseover = canMoveandChange;
	}
	// 单击可移动块时，将其与空白块交换位置
	for ( var p = 0; p < puzzlearea.length; p++) {
		puzzlearea[p].onclick = movePuzzlepiece;
	}
	// 打乱拼块顺序
	document.getElementById("shufflebutton").onclick = function() {
		document.getElementsByTagName("body")[0].style.backgroundImage = "url(originalback.jpg)";// 背景还原
		for ( var q = 0; q < 200; q++) {
			var neighbors = findNeighbors();
			var victim = neighbors[Math.floor(Math.random() * neighbors.length)];// Math.floor取地板，Math.random取0-1（不含1）的随机数
			var node_x = puzzlearea[victim].style.left;
			var node_y = puzzlearea[victim].style.top;
			puzzlearea[victim].style.left = blankBlock.style.left;
			puzzlearea[victim].style.top = blankBlock.style.top;
			blankBlock.style.left = node_x;
			blankBlock.style.top = node_y;
		}
	}
	// 在DOM中增加下拉菜单元素以便选择不同拼图背景
	//selectPuzzle = document.createElement("select");
	back1 = document.createElement("option");
	back2 = document.createElement("option");
	back3 = document.createElement("option");
	back4 = document.createElement("option");
	var p1 = document.createTextNode("Kung Fu Panda");
	var p2 = document.createTextNode("Finding Nemo11");
	var p3 = document.createTextNode("Toy Story");
	var p4 = document.createTextNode("Despicable Me");
	document.getElementById("controls").appendChild(selectPuzzle);
	selectPuzzle.appendChild(back1);
	selectPuzzle.appendChild(back2);
	selectPuzzle.appendChild(back3);
	selectPuzzle.appendChild(back4);
	back1.appendChild(p1);
	back2.appendChild(p2);
	back3.appendChild(p3);
	back4.appendChild(p4);
	// 响应用户选择的背景图片
	//alert("jsjs");
	selectPuzzle.onchange = function(){
		var n = selectPuzzle.selectedIndex+1;
		if(n == 1)
			n = "";
		alert(n);
		for ( var t = 0; t < 15; t++) {
			document.getElementsByTagName("body")[0].style.backgroundImage="url(originalback.jpg)";
			puzzlearea[t].style.backgroundImage = "url(background"+n+".jpg)";
		}
	}
}
// 若鼠标浮动与其上方的拼块可移动则改变其样式
function canMoveandChange(event) {// 作为响应事件的可调用函数，注意其参数为event
	var node_x = parseInt(event.target.style.left);
	var node_y = parseInt(event.target.style.top);
	if (Math.abs(node_x - parseInt(blankBlock.style.left)) == 100&& node_y == parseInt(blankBlock.style.top)|| Math.abs(node_y - parseInt(blankBlock.style.top)) == 100&& node_x == parseInt(blankBlock.style.left)) {
		// 若拼块可移动则追加样式
		if (event.target.className.indexOf('movablepiece') < 0) {
			event.target.className += ' movablepiece';// 追加css时注意前面的空格！
		}
	} else {
		event.target.className = 'puzzlepiece';// 若不可移动则消除其浮动样式
	}
}
// 移动拼块到空白块位置
function movePuzzlepiece(event) {
	if (event.target.className != 'puzzlepiece') {// 据类名判断拼块可否移动，不可移动类名必为puzzlepiece
		var node_x = event.target.style.left;
		var node_y = event.target.style.top;
		event.target.style.left = blankBlock.style.left;
		event.target.style.top = blankBlock.style.top;
		blankBlock.style.left = node_x;
		blankBlock.style.top = node_y;
		if (isSuccess() === true) {// 每次移动拼块后都要判断是否拼出完整的图
			success();
		}
	}
}
// 找到空白块的邻居并将其存入数组neighbors，用于打乱拼图过程
function findNeighbors() {
	var n = 0;
	var allNeighbors = [];// 空数组
	for ( var m = 0; m < puzzlearea.length; m++) {
		var node_x = parseInt(puzzlearea[m].style.left);
		var node_y = parseInt(puzzlearea[m].style.top);
		if (Math.abs(node_x - parseInt(blankBlock.style.left)) == 100&& node_y == parseInt(blankBlock.style.top)|| Math.abs(node_y - parseInt(blankBlock.style.top)) == 100&& node_x == parseInt(blankBlock.style.left)) {
			allNeighbors[n] = m;
			n++;
		}
	}
	return allNeighbors;
}
// 检验是否完成拼图
function isSuccess() {
	for ( var t = 0; t < 15; t++) {
		var suc_num = parseInt(t / 4);// parseInt函数：丢弃数字小数部分，取整
		var suc_remainder = t % 4;
		if (puzzlearea[t].style.left != suc_remainder * 100 + "px"|| puzzlearea[t].style.top != suc_num * 100 + "px") {
			return false;
		}
	}
	return true;
}
// 拼图成功后的祝贺！body背景从淡淡的祥云变为火红的祥云，弹出对话框PERFECT!
function success() {
	alert("PERFECT!");
	document.getElementsByTagName("body")[0].style.backgroundImage = "url(success.jpg)";
}
