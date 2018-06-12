
		// var refresh_flag = 1;
		// $(function(){
		// 	//定时刷新标记
		// 	//map 区域大小
		// 		// map_resize();
		// 		// $(window).resize(function(){map_resize();});

		// 	//定时刷新点
		// 		setInterval(function(){
		// 			if(refresh_flag==1){
		// 				loadContainer();
		// 			}
		// 		},60000);

		// 	var map = new BMap.Map("dituContent"); 
		// 	point = new BMap.Point(96.404, 35.917);
		// 	map.centerAndZoom(point, 5);// 初始化地图，设置中心点坐标和地图级别 
		// 	map.setMinZoom(0);
		// 	map.enableScrollWheelZoom();
		// 	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT}); 
		// 	map.addControl(top_right_navigation);
		// 	map.setMapStyle({styleJson: mapStyleJson });
		// 	map.setMapStyle({style:'grassgreen'});
		// 	绑定轨迹按钮动作
		// 	$("#containerLoader").click(function(){
		// 		loadTrack();
		// 	});
		// 	地图缩放事件
		// 		map.addEventListener('zoomend', function(){
		// 			if(refresh_flag > 0) return;
		// 			var zoomLevel = map.getZoom();
		// 			var allOverlay = map.getOverlays();
		// 			$.each(allOverlay,function(index,mk){
		// 				if(mk.toString() == '[object Marker]'){
		// 					if(zoomLevel < 9){
		// 						mk.hide();
		// 						var lb = mk.getLabel();
		// 						if(lb){
		// 							//console.log(lb.content);
		// 							if(lb.content == '起始' || lb.content == '结束'){
		// 								mk.show();
		// 							}
		// 						}
		// 					}else{
		// 						mk.show();
		// 					}
		// 				}
		// 			});
		// 		});
		// 	// //绑定下拉框选择事件
		// 	// 	$("#boxSelect").change(function(){
		// 	// 		openTarget($(this).val());
		// 	// 	});
		// 	// window.points = [];
		// 	// window.map = map;
		// 	// loadContainer();
		// });
		// function loadContainer(cat){//加载点
		// 		$.ajax({	
		// 			url: '/api/d/container_latest_json',	
		// 			type: 'POST',	
		// 			// data: {"cat":1,"startTime":$("#startTime").val(),"endTime":$("#endTime").val(),'ts':$.now()}, 
		// 			dataType:'json',
		// 			beforeSend:function(){
		// 				layer.msg(' 加载项目 ...', {icon: 16,shade: [0.3,'#fff'],time: 4000});
		// 				points=[];
		// 			},
		// 			success: function (json){
		// 				layer.closeAll();
		// 				if(json.status==0){
		// 					layer.msg(json.msg, {shade: [0.1,'#fff'],time:2000});
		// 					return;
		// 				}
		// 				boxs=json.boxs;
		// 				if(boxs.length <= 0){
		// 					layer.msg('未查询到轨迹点');
		// 					return;
		// 				}
		// 				var boxSelectLength=$("#boxSelect option").size();//箱子选择下拉表个数
		// 				for (var i = 0; i < boxs.length; i++){
		// 					//如果箱子下拉个数为零 添加箱子选择
		// 					if(boxSelectLength==0){
		// 						$("#boxSelect").append('<option value="'+ boxs[i].box_id +'">'+ boxs[i].name +'</option>');
		// 					}
		// 					window.points.push(boxs[i]);
		// 				}
		// 				boxs = null;
		// 				//坐标转换
		// 				transToBd('marker');
						
		// 			},
		// 			error: function (json){	
		// 				{layer.msg('加载失败', {shade: [0.1,'#fff'],time:2000});}
		// 			}
		// 		});	
		// }
		// function transToBd(target){
		// 	window.gotBdBlock = 0;
		// 	window.ajaxLen = 0;
		// 	var pointsLen = window.points.length;
		// 	var points = [];//将大数组分成小数组存放。
		// 	var ajaxId = 0;//第几组请求
		// 	var i = 0 ;
		// 	var j = 0 ;
		// 	var gap = 100;
		// 	var ajaxLen = 0;//要发起几次请求。
		// 	//数组分装
		// 	for(; i < pointsLen; i++){
		// 		if(i % gap == 0){
		// 			ajaxId = Math.floor(i/gap);
		// 			points[ajaxId] = [];
		// 		}
		// 		points[ajaxId].push(window.points[i]);
		// 	}
		// 	ajaxLen = points.length;
		// 	window.ajaxLen = ajaxLen;
		// 	//循环分包转换   闭包
		// 	for(; j < ajaxLen; j++){
		// 		(function(){
		// 			var jj=j;
		// 			var callback = function(data){
		// 				var ajaxID = jj;
		// 				var len = pointsLen;
		// 				var i;
		// 				var base = ajaxID * gap;
		// 				if(data.status === 0){
		// 					window.gotBdBlock += 1;
		// 					for (var i = 0; i < data.points.length; i++) {
		// 						var index = base + i;
		// 						window.points[index]['lng_bd'] = data.points[i].lng;
		// 						window.points[index]['lat_bd'] = data.points[i].lat;
		// 					}
		// 					if(window.gotBdBlock == window.ajaxLen){//全部转换完成
		// 						//转换完成，处理以后
		// 						if(target == 'marker'){
		// 							addMark(window.points);
		// 						}else if(target == 'track'){
		// 							addTrack(window.points);
		// 						}
		// 					}
		// 				}
		// 				callback = null
		// 				jj = null;
		// 			};
		// 			doTrans(points[j],callback);
		// 		})();
		// 	}
		// }
		// function doTrans(points,callback){//转换坐标
		// 	var BdPoints = [],len = points.length,i;  
		// 	for (i = 0; i < len; i++) {  
		// 		BdPoints.push(new BMap.Point(points[i].longitude,points[i].latitude)); 
		// 	}
		// 	var convertor = new BMap.Convertor();  
		// 	convertor.translate(BdPoints, 1, 5, callback);//百度的坐标转换接口。 
		// }
		// function addMark(points){
		// 	var label_offset_size=new BMap.Size(24,0);
		// 	for (var i = 0; i < points.length; i++){
		// 		var p = new BMap.Point(parseFloat(points[i].lng_bd),parseFloat(points[i].lat_bd));
		// 		var marker = new BMap.Marker(p);
		// 		var lb = new BMap.Label(points[i].name,{offset:label_offset_size});
		// 		marker.setLabel(lb);
		// 		marker.setIcon(new BMap.Icon('/assets/images/bz_red.gif',new BMap.Size(24,24)));
		// 		addClickHandler(points[i],marker);
		// 		map.addOverlay(marker);
		// 		//marker.click();
		// 	}
		// }
		// function addClickHandler(box,marker){
		// 	marker.addEventListener("click",function(e){
		// 		openInfo(box,e)}
		// 	);
		// }
		// function openInfo(box,e){
		// 	var p = e.target;
		// 	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		// 	var opts = {	
		// 		width : 360,	 // 信息窗口宽度	
		// 		height: 220	 // 信息窗口高度 
		// 	};
		// 	var geo = new BMap.Geocoder();
		// 	geo.getLocation(point,function(result){
		// 		map.openInfoWindow(makeInfoWindow(box,result.address,opts),point); //开启信息窗口
		// 	});
		// }
		// function makeInfoWindow(box,address,opts){
		// 		console.log(box);
		// 		var info = '<h3>'+ box.name +'</h3>';
		// 		info += '<br/>地　　址：'+ address;
		// 		//info +='<p>速度：'+ dealData(box.speed,'') +'Km/h<br/>';
		// 		info += '<br/>定位时间：'+ formatDate(box.insert_time);
		// 		var avgTemp = calAverageTemp(box.gps_temp1,box.gps_temp2,box.gps_temp3,-999);
		// 		info += '<br/>箱内温度：'+ dealDataValue((box.avgTemp*100)/100 ,'temp')+'°C';
		// 		info += '<br/>设定温度：'+ F2C(dealDataValue(box.cooler_set_temp,'temp')) +'°C' + '环境温度：'+ F2C(dealDataValue(box.ambient_temp,'ambient_temp')) + '°C';
		// 		info += '<br/>出风温度：'+ F2C(dealDataValue(box.out_air_temp,'temp')) +'°C' + '回风温度：'+ F2C(dealDataValue(box.re_air_temp,'temp')) +'°C';
		// 		info += '<br/>机组模式：'+ runStatus(box.zone_status);
		// 		info += '<br/>报警代码：'+ makeAlarmStr(box);
		// 		info += '<br/>数据时间：'+ formatDate(box.gps_time);
		// 		return new BMap.InfoWindow(info,opts);
		// }
		// function makeAlarmStr(box){
		// 	var str='';
		// 	for (var i = 1; i <= 13; i++) {
		// 		var k='cooler_alarm_level';
		// 		k = k+i;
		// 		if(box[k] != 0){
		// 			//str += box[k]+":"+box['cooler_alarm_value'+i] +", "
		// 			str += box[k] +", ";
		// 		}
		// 	}
		// 	return '<font color="red">'+ str +'</font>';
		// }
		// //轨迹
		// function loadTrack(){
		// 	//清除定时刷新
		// 		refresh_flag = 0;
		// 	//选择一个箱子
		// 		selectedBoxID=$("#boxSelect").val();
		// 		if(selectedBoxID <= 0){
		// 			layer.msg('请选择一个箱体查询');
		// 			return;
		// 		}
		// 	//清除地图点
		// 		map.clearOverlays();
		// 		window.points = [];
		// 	//加载轨迹
		// // 		$.ajax({	
		// // 			url: '/D/map_container_track_json',	
		// // 			type: 'POST',	
		// // 			data: {id:selectedBoxID,"startTime":$("#startTime").val(),"endTime":$("#endTime").val(),'ts':$.now()}, 
		// // 			dataType:'json',
		// // 			beforeSend:function(){
		// // 				layer.msg(' 加载项目 ...', {icon: 16,shade: [0.3,'#fff'],time: 4000});
		// // 				points=[];
		// // 			},
		// // 			success: function (json){
		// // 				layer.closeAll();
		// // 				if(json.status==0){
		// // 					layer.msg(json.msg, {shade: [0.1,'#fff'],time:2000});
		// // 					return;
		// // 				}
		// // 				boxs=json.boxs;
		// // 				if(boxs.length <= 0){
		// // 					layer.msg('未查询到轨迹点');
		// // 					return;
		// // 				}
		// // 				var boxSelectLength=$("#boxSelect option").size();//箱子选择下拉表个数
		// // 				for (var i = 0; i < boxs.length; i++){
		// // 					window.points.push(boxs[i]);
		// // 				}
		// // 				boxs = null;
		// // 				//坐标转换
		// // 				transToBd('track');
		// // 			},
		// // 			error: function (json){	
		// // 				{layer.msg('加载失败', {shade: [0.1,'#fff'],time:2000});}
		// // 			}
		// // 		});	
		// }
		// function addTrack(points){
		// 	var label_offset_size=new BMap.Size(24,0);
		// 	var path = [];
		// 	for (var i = points.length-1; i >=0; i--){
		// 		var p = new BMap.Point(parseFloat(points[i].lng_bd),parseFloat(points[i].lat_bd));
		// 		path.push(p);

		// 		var marker = new BMap.Marker(p);
		// 		if(i == points.length -1){//起始点
		// 			marker.setIcon(new BMap.Icon('/assets/images/bz_red.gif',new BMap.Size(24,24)));
		// 			marker.setLabel(new BMap.Label('起始',{offset:label_offset_size}));
		// 		}else if(i == 0){
		// 			marker.setIcon(new BMap.Icon('/assets/images/bz_red.gif',new BMap.Size(24,24)));
		// 			marker.setLabel(new BMap.Label('结束',{offset:label_offset_size}));
		// 		}else{
		// 			marker.setIcon(new BMap.Icon('/assets/images/bz_red_small.gif',new BMap.Size(12,12)));
		// 			//var lb = new BMap.Label(points[i].name,{offset:label_offset_size});
		// 		}

		// 		addClickHandler(points[i],marker);
		// 		map.addOverlay(marker);
		// 	}
		// 	//path
		// 	var symbol = new BMap.Symbol(
		// 		BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, //百度预定义的 箭头方向向下的非闭合箭头
		// 		{
		// 			fillColor:'#FFF', //设置矢量图标的填充颜色。支持颜色常量字符串、十六进制、RGB、RGBA等格式
		// 			fillOpacity:1, //设置矢量图标填充透明度,范围0~1
		// 			scale:0.4, //设置矢量图标的缩放比例
		// 			rotation:90, //设置矢量图标的旋转角度,参数为角度
		// 			strokeColor:'#FFF', //设置矢量图标的线填充颜色,支持颜色常量字符串、十六进制、RGB、RGBA等格式
		// 			strokeOpacity:1, //设置矢量图标线的透明度,opacity范围0~1
		// 			strokeWeight:2, //旋设置线宽。如果此属性没有指定，则线宽跟scale数值相
		// 		}
		// 		);
		// 	var iconSequence = new BMap.IconSequence(symbol,'','50px');
		// 	var polyLine = new BMap.Polyline(path,{icons:[iconSequence],strokeColor:"#23A9F6", strokeWeight:6, strokeOpacity:1});
		// 	map.addOverlay(polyLine);
		// 	map.centerAndZoom(path[path.length-1],10);
			
		// }
		// function openTarget(box_id){
		// 	if(refresh_flag != 1){
		// 		return;
		// 	}
		// 	for (var i = 0; i < window.points.length; i++) {
		// 		if(window.points[i].box_id == box_id){
		// 			var box = window.points[i];
		// 			var point = new BMap.Point(window.points[i].lng_bd, window.points[i].lat_bd);
		// 			var opts = {	
		// 				width : 360,// 信息窗口宽度	
		// 				height: 220 // 信息窗口高度 
		// 			};
		// 			var geo = new BMap.Geocoder();
		// 			geo.getLocation(point,function(result){
		// 				//console.log(window.box);
		// 				map.openInfoWindow(makeInfoWindow(box,result.address,opts),point); //开启信息窗口
		// 			});
		// 		}
		// 	}
		// }
		// //map resize
		// // function map_resize(){//调整地图图层大小
		// // 	if(navigator.userAgent.match(/mobile/i)){
		// // 		$("#map_container").height($(window).height()*1.2);
		// // 	}else{
		// // 		$("#map_container").height($(window).height()-80);
		// // 	}
		// // }
