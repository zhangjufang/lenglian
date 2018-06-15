var const_alarmType = {}
const_alarmType['temp_l']='温度过低';
const_alarmType['temp_h']='温度过高';
var cmdStatus = {}
	cmdStatus['cmd3'] = '正确响应';
	cmdStatus['cmd4'] = '冷机拒绝';
	cmdStatus['cmd5'] = '冷机无应答';

function formatDate(stamp,format){
	format=format||"yyyy-mm-dd hh:ii:ss";
	var now=new Date(parseInt(stamp) * 1000);
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	var date=now.getDate();
	var hour=now.getHours();
	var minute=now.getMinutes();
	var second=now.getSeconds();
	month = month >= 10 ? month : '0'+month;
	date = date >= 10 ? date : '0'+date;
	hour = hour >= 10 ? hour : '0'+hour;
	minute = minute >= 10 ? minute : '0'+minute;
	second = second >= 10 ? second : '0'+second;

	var rStr=year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
	switch(format){
		case "dd hh:ii":
			rStr=date+" "+hour+":"+minute;
			break;
		default:
			rStr=year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
			break;
	}
	return rStr;
}
function getLocalTime(nS){
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").replace("下午","");
} 
function formatDate1(stamp){
	return getLocalTime(stamp);
}
function checkAll(allCheck,checkName){
	var checked = $(allCheck).attr('checked');
	checked = checked == undefined ? false:true;
	$("input[type=checkbox][name="+checkName+"]").attr('checked',checked);
}
function calAverageTemp(tempArray,errorValue,valCategory){
	valCategory = valCategory == undefined?'int':valCategory;
	if(tempArray.length <= 0){
		return '--';
	}
	var num=0;
	var sum=0;
	for (var i = tempArray.length - 1; i >= 0; i--) {
		if(tempArray[i] != errorValue && tempArray[i] != errorValue/10 ){
			if(valCategory == 'int'){
				sum += parseInt(tempArray[i]);
			}else{
				sum += parseFloat(tempArray[i]);
			}
			num ++;
		}
	}
	if(num > 0){
		//return
		return toDecimal1(sum/num);
	}else{
		return '-';
	}
}
function dealDataValue(v,c){
	if(v == -99 || v == -999) return '-';
	var toDecimal1_flag = 1 ;
	switch(c){
		case 'temp':
			v = Math.round(10 * v) / 100;
			if(v > 100 || v < -100) v = '-';
			break;
		case 'ambient_temp':
			v = Math.round(10 * v) / 1000;
			if(v > 100 || v < -100) v = '-';
			break;
		case 'direction':
			v = Math.round(10 * v) / 10;
			break;
		case 'time':
			v = Math.round(10 * v) / 1000;
			break;
		case 'voltage':
			v = Math.round(10 * v) / 1000;
			break;
		case 'humi':
			toDecimal1_flag = 0;
			break;
		case 'current':
			v = Math.round(10 * v) / 320;
			break;
		case 'water_temp':
			v = Math.round(10 * v) / 320;
			if(v > 100 || v < -100) v = '-';
			break;
		case 'suction_press':
			v = Math.round(10 * v) / 320;
			break;
		case 'discharge_press':
			v = Math.round(10 * v) / 320;
			break;
		default:
	}
	if(toDecimal1_flag){
		return toDecimal1(v);
	}else{
		return v;
	}
}
//冷机状态分析
function leftPad(str,num){
	if(str.length >= num) return str;
	for(i=0;i < num; i++){
		if(str.length >= num) break;
		str = '0'+str;
	}
	return str;
}
function runStatus(v){
	v=parseInt(v);
	if(v<0 || v>255){
		return 'Error'
	}
	var bv = leftPad(v.toString(2),8);
	var code = bv.substr(0,3);
	if(code=='000') return 'Power Off';
	if(code=='001') return 'Cooling';
	if(code=='010') return 'Heating';
	if(code=='011') return 'Defrost';
	if(code=='100') return 'Null';
	if(code=='101') return 'Pretrip';
	if(code=='110') return 'Sleep';
	if(code=='111') return 'Reserved';
}
function coolerStatus(v){
		v = parseInt(v);
		if(v < 0 || v > 255) return 'Error';
		var bv = leftPad(v.toString(2),8);
		var rStr='';
		//运行状态
		var code = bv.substr(0,3);
		rStr += parseStatus(code,'run')+'|| ';
		//cs
		code = bv.substr( 3,1);//substr(bv, 3,1);
		rStr += parseStatus(code,'cs')+'|| ';
		//hs
		code = bv.substr( 4,1);//substr(bv, 4,1);
		rStr += parseStatus(code,'hs')+'|| ';
		//door
		code = bv.substr( 5,1);//substr(bv, 5,1);
		rStr += parseStatus(code,'door')+'|| ';
		//ds
		code = bv.substr( 6,1);//substr(bv, 6,1);
		rStr += parseStatus(code,'ds');
		return rStr;
}
function parseStatus(code,cat){
		if(cat=='run'){
			if(code=='000') return 'Power Off';
			if(code=='001') return 'Cooling';
			if(code=='010') return 'Heating';
			if(code=='011') return 'Defrost';
			if(code=='100') return 'Null';
			if(code=='101') return 'Pretrip';
			if(code=='110') return 'Sleep';
			if(code=='111') return 'Reserved';
		}
		if(cat=='cs'){
			if(code=='0') return 'Cycle Sentry';
			if(code=='1') return 'Continuous';
		}
		if(cat=='hs'){// high speed mode
			if(code=='0') return 'Not High Speed';
			if(code=='1') return 'High Speed';
		}
		if(cat=='door'){// door
			if(code=='0') return 'Closed';
			if(code=='1') return 'Open';
		}
		if(cat=='ds'){//diesel
			if(code=='0') return 'Diesel';
			if(code=='1') return 'Electric';
		}
		return '--';
}
function coolerStatus_icon(v,airdoor,door1,door2,cooler_off_flag){
		v = parseInt(v);
		if(v < 0 || v > 255) return 'Error';
		var bv = leftPad(v.toString(2),8);
		var rStr='';
		//运行状态
		var code = bv.substr(0,3);
		rStr += parseStatus_icon(code,'run');
		//cs
		code = bv.substr(3,1);//substr(bv, 3,1);
		rStr += parseStatus_icon(code,'cs');
		//hs
		code = bv.substr(4,1);//substr(bv, 4,1);
		rStr += parseStatus_icon(code,'hs');
		//door
		code = bv.substr(5,1);//substr(bv, 5,1);
		rStr += parseStatus_icon(code,'door',airdoor,door1,door2,cooler_off_flag);
		//ds
		code = bv.substr(6,1);//substr(bv, 6,1);
		rStr += parseStatus_icon(code,'ds');//ds
		//fa  fresh air
		code = bv.substr(7,1);//substr(bv, 7,1);
		rStr += parseStatus_icon(code,'fa',airdoor,door1,door2,cooler_off_flag);
		return rStr;
}
function parseStatus_icon(code,cat,airdoor,door1,door2,cooler_off_flag){
		if(cat=='run'){
			if(code=='000') return '<img src="/assets/images/icon/poweroff.png" title="Power off">';
			if(code=='001') return '<img src="/assets/images/icon/cooling.png" title="Cooling">';
			if(code=='010') return '<img src="/assets/images/icon/heating.png" title="Heating">';
			if(code=='011') return '<img src="/assets/images/icon/defrost.png" title="Defrost">';
			if(code=='100') return '<img src="/assets/images/icon/null.png" title="Null">';
			if(code=='101') return '<img src="/assets/images/icon/pretrip.gif" title="Pretrip">';
			if(code=='110') return '<img src="/assets/images/icon/sleep.png" title="Sleep">';
			if(code=='111') return '<img src="/assets/images/icon/cooler_null.png" title="Null">';
			return code;
		}
		if(cat=='cs'){
			if(code=='0') return '<img src="/assets/images/icon/cycle.png" title="Cycle sentry OP mode">';
			if(code=='1') return '<img src="/assets/images/icon/continuous.png" title="Continuous OP mode">';
			return code;
		}
		if(cat=='hs'){// high speed mode
			if(code=='0') return '<img src="/assets/images/icon/highspeed_none.png" title="Not in high speed">';
			if(code=='1') return '<img src="/assets/images/icon/highspeed.png" title="High speed">';
			return code;
		}
		if(cat=='door'){// door
			airdoor = parseInt(airdoor);
			var door = leftPad(airdoor.toString(2),4);
			door = door.substr(0,2);
			switch(door){
				case '00':
					return '<img src="/assets/images/icon/null24.png" title="null">';
					break;
				case '01':
					if(door1 == 0) return '<img src="/assets/images/icon/doorclose.png" title="Door closed">';
					if(door1 == 1) return '<img src="/assets/images/icon/dooropen.png" title="Door open">';
					break;
				case '10':
					if(cooler_off_flag == '0') return '<img src="/assets/images/icon/null24.png" title="Unknown because of cooler off">';//冷机关闭
					if(code=='0') return '<img src="/assets/images/icon/doorclose.png" title="Door closed">';
					if(code=='1') return '<img src="/assets/images/icon/dooropen.png" title="Door open">';
					break;
				default:
					return '<img src="/assets/images/icon/null24.png" title="null">';
					break;
			}
			return code;
		}
		if(cat=='ds'){//diesel
			if(code=='0') return '<img src="/assets/images/icon/diesel.png" title="Diesel mode">';
			if(code=='1') return '<img src="/assets/images/icon/electric.png" title="Electric mode">';
			return code;
		}
		if(cat=='fa'){//fresh air door
			airdoor = parseInt(airdoor);
			var air = leftPad(airdoor.toString(2),4);
			air = air.substr(2,2);
			switch(air){
				case '00':
					return '<img src="/assets/images/icon/null24.png" title="">';
					break;
				case '01':
					if(door1 == 1) return '<img src="/assets/images/icon/freshair_close.png" title="Fresh air stoped">';
					if(door1 == 0) return '<img src="/assets/images/icon/freshair_open.png" title="Fresh air running">';
					break;
				case '10':
					if(code=='0') return '<img src="/assets/images/icon/freshair_close.png" title="Fresh air stoped">';
					if(code=='1') return '<img src="/assets/images/icon/freshair_open.png" title="Fresh air running">';
					break;
				default:
					return '<img src="/assets/images/icon/null24.png" title="">';
					break;
			}
			return code;
		}
}
function coolerStatus_bool(v,cat,airdoor,door1,door2,cooler_off_flag){
	v = parseInt(v);
	if(v < 0 || v > 255) return 'Error';
	var bv = leftPad(v.toString(2),8);
	//
	if(cat == 'door'){//
		var code = bv.substr(5,1);//substr(bv, 5,1);
		airdoor = parseInt(airdoor);
		var door = leftPad(airdoor.toString(2),4);
		door = door.substr(0,2);
		switch(door){
			case '00':
				return '-';
				break;
			case '01':
				if(door1 == 1) return '0';
				if(door1 == 0) return '1';
				break;
			case '10':
				if(cooler_off_flag == '0') return -1;
				if(code=='0') return '0';
				if(code=='1') return '1';
				break;
			default:
				return '-';
				break;
		}
	}
	if(cat == 'fa'){//
		var code = bv.substr(7,1);//substr(bv, 5,1);
		airdoor = parseInt(airdoor);
		var door = leftPad(airdoor.toString(2),4);
		door = door.substr(2,2);
		switch(door){
			case '00':
				return '-';
				break;
			case '01'://远程
				if(door1 == 1) return '0';
				if(door1 == 0) return '1';
				break;
			case '10'://本地新风
				return code;
				break;
			default:
				return '-';
				break;
		}
	}
}
function opName(opCode,value){
	//opCode:2050,2060,2061,2062,2063,2064,2065
	var name = '';
	switch(opCode){
		case '2050':
			name = value == 1 ? '远程开机':'远程关机';
			break;
		case '2060':
			name = '设置温度';
			break;
		case '2061':
			name = '初始化除霜';
			break;
		case '2062':
			name = '清除告警';
			break;
		case '2063':
			name = value == 1 ? '设置cs模式为连续模式':'设置cs模式为周期模式';
			break;
		case '2064':
			name = value == 0 ? '新风关闭':'新风启动';
			if(value == 1){
				name += '20%';
			}else if(value == 2){
				name += '40%';
			}else if(value == 3){
				name += '60%';
			}else if(value == 4){
				name += '80%';
			}else if(value == 5){
				name += '100%';
			}
			break;
		default:
			name='';

	}
	return name;
}
function opStatus(flag){
	if(flag <= 3){
		return '';
	}
	if(flag==4) return '命令被冷机拒绝';
	if(flag==5) return '终端与冷机通讯异常';
	if(flag==11) return '远程新风系统无法打开：温度低于零度。';
	if(flag==12) return '远程新风系统无法打开：冷机非制冷或者制热模式。';
	return '冷机无应答';
}
//华氏度转摄氏度
function F2C(t){
	if (t=='-') return t;
	return parseInt(10*(t - 32)/1.8)/10;
}
//摄氏度转华氏度
function C2F(t){
	if (t=='-') return t;
	return t*1.8 + 32;
}
function toDecimal1(x){ 
	var f = parseFloat(x); 
	if (isNaN(f)) { 
		return '-'; 
	} 
	var f = Math.round(x*10)/10; 
	var s = f.toString(); 
	var rs = s.indexOf('.'); 
	if (rs < 0) {
		s += '.0'; 
	}
	return s; 
}
function resizeWindow(){
	var wm = $.cookie('wideMode');
	if(wm == 0){
		wm = 1;
	}else{
		wm = 0;
	}
	$.cookie('wideMode',wm,{expires: 7, path:'/'}); 
	if(wm == 1){
		$(".logo > img").width(60);
		$(".BM-left").width(175);
		$(".BM-right").css("paddingLeft",175);
		$("#sideBarSwitch").html('<i class="icon glyphicon glyphicon-chevron-left">');
		$(".BM-body").css('background','url(/assets/images/BM-body-bg.gif) repeat-y');
		$('.side-nav li a span').show();
	}else{
		$(".logo > img").width(60);
		$(".BM-left").width(70);
		$(".BM-right").css("paddingLeft",70);
		$("#sideBarSwitch").html('<i class="icon glyphicon glyphicon-chevron-right">');
		$(".BM-body").css('background','url(/assets/images/BM-body-bg2.gif) repeat-y');
		$('.side-nav li a span').hide();
	}
}
function strtotime(str){
	if(str == undefined || str == null || str=='' || str.length < 5){
		var nd = new Date();
		str = nd.getFullYear() +'-'+ nd.getMonth() +'-'+ nd.getDate() +' '+ nd.getHours() +':'+ nd.getMinutes() +':'+nd.getSeconds();
	}
	var _arr = str.split(' ');
	var _day = _arr[0].split('-');
	_arr[1] = (_arr[1] == null) ? '0:0:0' :_arr[1];
	var _time = _arr[1].split(':');
	for (var i = _day.length - 1; i >= 0; i--) {
			_day[i] = isNaN(parseInt(_day[i])) ? 0 :parseInt(_day[i]);
	};
	for (var i = _time.length - 1; i >= 0; i--) {
			_time[i] = isNaN(parseInt(_time[i])) ? 0 :parseInt(_time[i]);
	};
	var _temp = new Date(_day[0],_day[1]-1,_day[2],_time[0],_time[1],_time[2]);
	return _temp.getTime() / 1000;
}