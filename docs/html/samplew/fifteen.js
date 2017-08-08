/* �����������
 * ѧ�ţ�09333022
 * ʵ�ֵĸ��ӹ��ܣ�
 *     1.ƴͼ�ɹ����ף��
 *     2.����ƴͼ�����ɹ�ѡ��
 */
var puzzlearea;// ȫ�ֱ���
var blankBlock = document.createElement("div");
var selectPuzzle = document.createElement("select");
var back1;
var back2;
var back3;
var back4;
window.onload = function() {
	document.getElementsByTagName("body")[0].style.backgroundImage = "url(originalback.jpg)";
	puzzlearea = document.getElementById("puzzlearea").getElementsByTagName("div");
	// Ϊƴ��������ʽ������λ��
	//alert(puzzlearea.length);
	for ( var i = 0; i < puzzlearea.length; i++) {
		puzzlearea[i].className = 'puzzlepiece';
		var num = parseInt(i / 4);// parseInt��������������С�����֣�ȡ��
		var remainder = i % 4;
		puzzlearea[i].style.left = remainder * 100 + "px";
		puzzlearea[i].style.top = num * 100 + "px";
		// ����ƴ�鱳��
		puzzlearea[i].style.backgroundPosition = -1 * remainder * 100 + "px"+ " " + (-1) * num * 100 + "px";
	}
	// ��ӿհ׿鲢��������ʽ��λ��
	document.getElementById("puzzlearea").appendChild(blankBlock);
	blankBlock.className = 'puzzlepiece';
	blankBlock.style.backgroundImage = "none";
	blankBlock.style.left = "300px";
	blankBlock.style.top = "300px";
	// ��������ڿ��ƶ�����ʱҪ�任����ʽ
	for ( var j = 0; j < puzzlearea.length; j++) {
		puzzlearea[j].onmouseover = canMoveandChange;
	}
	// �������ƶ���ʱ��������հ׿齻��λ��
	for ( var p = 0; p < puzzlearea.length; p++) {
		puzzlearea[p].onclick = movePuzzlepiece;
	}
	// ����ƴ��˳��
	document.getElementById("shufflebutton").onclick = function() {
		document.getElementsByTagName("body")[0].style.backgroundImage = "url(originalback.jpg)";// ������ԭ
		for ( var q = 0; q < 200; q++) {
			var neighbors = findNeighbors();
			var victim = neighbors[Math.floor(Math.random() * neighbors.length)];// Math.floorȡ�ذ壬Math.randomȡ0-1������1���������
			var node_x = puzzlearea[victim].style.left;
			var node_y = puzzlearea[victim].style.top;
			puzzlearea[victim].style.left = blankBlock.style.left;
			puzzlearea[victim].style.top = blankBlock.style.top;
			blankBlock.style.left = node_x;
			blankBlock.style.top = node_y;
		}
	}
	// ��DOM�����������˵�Ԫ���Ա�ѡ��ͬƴͼ����
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
	// ��Ӧ�û�ѡ��ı���ͼƬ
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
// ����긡�������Ϸ���ƴ����ƶ���ı�����ʽ
function canMoveandChange(event) {// ��Ϊ��Ӧ�¼��Ŀɵ��ú�����ע�������Ϊevent
	var node_x = parseInt(event.target.style.left);
	var node_y = parseInt(event.target.style.top);
	if (Math.abs(node_x - parseInt(blankBlock.style.left)) == 100&& node_y == parseInt(blankBlock.style.top)|| Math.abs(node_y - parseInt(blankBlock.style.top)) == 100&& node_x == parseInt(blankBlock.style.left)) {
		// ��ƴ����ƶ���׷����ʽ
		if (event.target.className.indexOf('movablepiece') < 0) {
			event.target.className += ' movablepiece';// ׷��cssʱע��ǰ��Ŀո�
		}
	} else {
		event.target.className = 'puzzlepiece';// �������ƶ��������両����ʽ
	}
}
// �ƶ�ƴ�鵽�հ׿�λ��
function movePuzzlepiece(event) {
	if (event.target.className != 'puzzlepiece') {// �������ж�ƴ��ɷ��ƶ��������ƶ�������Ϊpuzzlepiece
		var node_x = event.target.style.left;
		var node_y = event.target.style.top;
		event.target.style.left = blankBlock.style.left;
		event.target.style.top = blankBlock.style.top;
		blankBlock.style.left = node_x;
		blankBlock.style.top = node_y;
		if (isSuccess() === true) {// ÿ���ƶ�ƴ���Ҫ�ж��Ƿ�ƴ��������ͼ
			success();
		}
	}
}
// �ҵ��հ׿���ھӲ������������neighbors�����ڴ���ƴͼ����
function findNeighbors() {
	var n = 0;
	var allNeighbors = [];// ������
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
// �����Ƿ����ƴͼ
function isSuccess() {
	for ( var t = 0; t < 15; t++) {
		var suc_num = parseInt(t / 4);// parseInt��������������С�����֣�ȡ��
		var suc_remainder = t % 4;
		if (puzzlearea[t].style.left != suc_remainder * 100 + "px"|| puzzlearea[t].style.top != suc_num * 100 + "px") {
			return false;
		}
	}
	return true;
}
// ƴͼ�ɹ����ף�أ�body�����ӵ��������Ʊ�Ϊ�������ƣ������Ի���PERFECT!
function success() {
	alert("PERFECT!");
	document.getElementsByTagName("body")[0].style.backgroundImage = "url(success.jpg)";
}
