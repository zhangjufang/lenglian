//方向描述
function parseDirection(angle){
	if(angle < 0){return '-';}
	var modulo = parseInt(angle/45);
	var remainder = angle - modulo*45;
	remainder = parseInt(remainder*10)/10;
	var direction = '-';
	switch(modulo){
		case 0://北偏东
			direction = remainder > 0 ?'北偏东'+ remainder +'度':'正北';
			break;
		case 1://东偏北
			direction = '东偏北'+ (45 - remainder) +'度';
			break;
		case 2://东偏南
			direction = remainder > 0 ?'东偏南'+ remainder +'度':'正东';
			break;
		case 3://南偏东
			direction = '南偏东'+ (45 - remainder) +'度';
			break;
		case 4://南偏西
			direction = remainder > 0 ?'南偏西'+ remainder +'度':'正南';
			break;
		case 5://西偏南
			direction = '西偏南'+ (45 - remainder) +'度';
			break;
		case 6://西偏北
			direction = remainder > 0 ?'西偏北'+ remainder +'度':'正西';
			break;
		case 7://西偏北
			direction = '西偏北'+ (45 - remainder) +'度';
			break;
	}
	return direction;
}

////华氏度转摄氏度
function F2C(t){
	if (t=='-') return t;
	return parseInt(10*(t - 32)/1.8)/10;
}
//摄氏度转华氏度
function C2F(t){
	if (t=='-') return t;
	return t*1.8 + 32;
}
//字符串左侧补零
function leftPad(str,num){
	if(str.length >= num) return str;
	for(i=0;i < num; i++){
		if(str.length >= num) break;
		str = '0'+str;
	}
	return str;
}
///新版本冷机状态图标
	/* 
		返回状态图标数组，
		$statusArray为状态数组，
		$urlPre为图标地址前缀,默认没有
	*/
	function coolerStatusIcon(statusArray,url){
		if(url == undefined || url == null){
			url='../images/icon/';
		}
		var result = [
			'<img src="../images/icon/null24.png" title="Unknown">',
			'<img src="../images/icon/null24.png" title="Unknown">',
			'<img src="../images/icon/null24.png" title="Unknown">',
			'<img src="../images/icon/null24.png" title="Unknown">',
			'<img src="../images/icon/null24.png" title="Unknown">',
			'<img src="../images/icon/null24.png" title="Unknown">'
			];
		////0 冷机运行状态
			switch(statusArray[0]){
				case '000':
					result[0]='<img src="../images/icon/poweroff.png" title="Power off">';
					break;
				case '001':
					result[0]='<img src="../images/icon/cooling.png" title="Cooling">';
					break;
				case '010':
					result[0]='<img src="../images/icon/heating.png" title="Heating">';
					break;
				case '011':
					result[0]='<img src="../images/icon/defrost.png" title="Defrost">';
					break;
				case '100':
					result[0]='<img src="../images/icon/null.png" title="Null">';
					break;
				case '101':
					result[0]='<img src="../images/icon/pretrip.png" title="Pretrip">';
					break;
				case '110':
					result[0]='<img src="../images/icon/sleep.png" title="Sleep">';
					break;
				case '111':
					result[0]='<img src="../images/icon/null.png" title="Null">';
					break;
			}
		//1：冷机运行cs模式 0 1
			if(statusArray[1] == 0){
				result[1] = '<img src="../images/icon/continuous.png" title="Continuous OP mode">';
			}else{
				result[1] = '<img src="../images/icon/cycle.png" title="Cycle sentry OP mode">';
			}
		//2：冷机是否高速状态，0，1 
			if(statusArray[2] == 0){
				result[2] = '<img src="../images/icon/highspeed.png" title="High speed">';
			}else{
				result[2] = '<img src="../images/icon/highspeed_none.png" title="Not in high speed">';
			}
		//3：门开关 0,开门，1关门，2，未设置
			switch(statusArray[3]){
				case '0':
					result[3]='<img src="../images/icon/dooropen.png" title="Door open">';
					break;
				case '1':
					result[3]='<img src="../images/icon/doorclose.png" title="Door closed">';
					break;
				case '2':
					result[3]='<img src="../images/icon/null24.png" title="No door setting">';
					break;
			}
		//4：油电模式
			if(statusArray[4] == 0){
				result[4] = '<img src="../images/icon/electric.png" title="Electric mode">';
			}else{
				result[4] = '<img src="../images/icon/diesel.png" title="Diesel mode">';
			}
		//5：新风开启状态，0开启，1关闭
			switch (statusArray[5]) {
				case '1':
					result[5] = '<img src="../images/icon/freshair_close.png" title="Fresh air stoped">';
					break;
				case '0':
					result[5] = '<img src="../images/icon/freshair_open.png" title="Fresh air running">';
					break;
				default:
					result[5] = '<img src="../images/icon/null24.png" title="No fresh air set">';
					break;
			}
		return result;
	}
	/* 
		分析冷机运行模式，返回六个状态数组
		0:冷机运行状态 000，001，010，011，100，101，110，111
		1：冷机运行cs模式 0 1
		2：冷机是否高速状态，0，1
		3：门开关0,开门，1关门，
		4：油电模式 0 油汽模式，1电器模式
		5：新风开启状态，0关闭，1开始
	*/
	function coolerStatus(zone_status,gps_door1,reserve7,cooler_off_flag,dtuSet,gps_door2,hasCooler){
		if(dtuSet == undefined || dtuSet == null){dtuSet = 0;}
		if(hasCooler == undefined || hasCooler == null){hasCooler = 1;}

		var result=['-','-','-','-','-','-'];

		if(dtuSet != 0){//新版本设备
			var zoneStatusBinStr = leftPad(parseInt(zone_status).toString(2),8);
			//console.log(hasCooler+'-'+zoneStatusBinStr);
			//console.log(zoneStatusBinStr);
			//运行状态
				var runCode = zoneStatusBinStr.substr(0,3);
				result[0] = runCode;
			//cs模式
				var csCode = zoneStatusBinStr.substr(3,1);//substr(zoneStatusBinStr,3,1);
				result[1] = csCode;
			//hs，是否高速模式
				var hsCode = zoneStatusBinStr.substr(4,1);//substr($zoneStatusBinStr,4,1);
				result[2] = hsCode;
			//门开关
				result[3] = gps_door1;
			//油电模式
				var dsCode = zoneStatusBinStr.substr(6,1);//substr($zoneStatusBinStr, 6,1);
				result[4] = dsCode;
			//新风开关
				result[5] = reserve7;
		}else{//老版本设备

		}
		return result;
	}