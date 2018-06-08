// (function(){
//     if(navigator.userAgent.match(/mobile/i)){
//         $("#dituContent").height($(window).height()*1.2);
//     }else{
//         $("#dituContent").height($(window).height()-80);
//     }
//     var map = new BMap.Map("dituContent"); 
//     point = new BMap.Point(96.404, 35.917);
//     map.centerAndZoom(point, 5);				 // 初始化地图，设置中心点坐标和地图级别 
//     map.setMinZoom(0);
//     map.enableScrollWheelZoom();

//     var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT}); 
//     map.addControl(top_right_navigation);
//     //map.setMapStyle({styleJson: mapStyleJson });
//     //map.setMapStyle({style:'grassgreen'});
    
//     //map makers
//     var points=[];
//     var nameArray = [];
//     var labelArray = [];
//     var contentArray=[];
//     var infoWindowArray=[];
//     var markerArray=[];
//     var longitudeArray=[];
//     var latitudeArray=[];
//     var timeArray=[];
//     var gpsTimeArray=[];
//     var speedArray=[];
//     var gpsTemp=[];
//     var gpsTemp2=[];
//     var gpsTemp3=[];
//     var gpsTemp4=[];
//     var coolerStatus=[];
//     var doorStatus=[];
//     var index_lnglat = {};
//     var label_offset_size=new BMap.Size(24,0);
//     opts = {	
//         width : 360,	 // 信息窗口宽度	
//         height: 220	 // 信息窗口高度 
//     }
//     function loadContainer(cat){
//         //cat : 1当前，其他历史
//         var selectBoxIDs=-1;
//         if(cat!=1){selectBoxIDs=$("#boxSelect").val();}
//         $.ajax({	
//             url: '/api/d/container_latest_json',	
//             type: 'POST',	
//             data: {id:selectBoxIDs,"cat":cat,"startTime":$("#startTime").val(),"endTime":$("#endTime").val()}, 
//             dataType:'json',
//             beforeSend:function(){
//                 layer.msg(' 加载项目 ...', {icon: 16,shade: [0.3,'#fff'],time: 4000});
//                 points=[];
//                 nameArray = [];
//                 labelArray = [];
//                 contentArray=[];
//                 infoWindowArray=[];
//                 markerArray=[];
//                 index_lnglat={};

//                 longitudeArray=[];
//                 latitudeArray=[];
//                 timeArray=[];
//                 gpsTimeArray=[];
//                 speedArray=[];
//                 gpsTemp1=[];
//                 gpsTemp2=[];
//                 gpsTemp3=[];
//                 gpsTemp4=[];
//                 coolerStatus=[];
//                 doorStatus=[];
//             },
//             success: function (json){
//                 layer.closeAll();
//                 if(json.status==0){
//                     layer.msg(json.msg, {shade: [0.1,'#fff'],time:2000});
//                     return;
//                 }
//                 map.clearOverlays();
//                 boxs=json.boxs;
//                 if(boxs.length <= 0){
//                     layer.msg('未查询到轨迹点');
//                     return;
//                 }
//                 var boxSelectLength=$("#boxSelect option").size();//箱子选择下拉表个数
//                 for (var i = 0; i < boxs.length; i++){
//                     //如果箱子下拉个数为零 添加箱子选择
//                     if(boxSelectLength==0){
//                         $("#boxSelect").append('<option value="'+ boxs[i].box_id +'">'+ boxs[i].name +'</option>');
//                     }
//                     points[i] = new BMap.Point(parseFloat(boxs[i].lng_bd09), parseFloat(boxs[i].lat_bd09));
//                     nameArray[i]=boxs[i].name;
//                     index_lnglat[parseFloat(boxs[i].lng_bd09)+'_'+ parseFloat(boxs[i].lat_bd09)]=i;
//                     timeArray[i]=boxs[i].insert_time;
//                     gpsTimeArray[i]=boxs[i].gps_time;
//                     speedArray[i]=boxs[i].speed;
//                     gpsTemp1[i]=boxs[i].gps_temp1;
//                     gpsTemp2[i]=boxs[i].gps_temp2;
//                     gpsTemp3[i]=boxs[i].gps_temp3;
//                     gpsTemp4[i]=boxs[i].gps_temp4;
//                     coolerStatus[i]=boxs[i].cooler_work_status;
//                     doorStatus[i]=boxs[i].gps_door1;
//                     //add marker
//                     markerArray[i]=new BMap.Marker(points[i]);
//                     if(cat == 1 || i == 0){//每个点最新位置及轨迹的最后一条
//                         labelArray[i]=new BMap.Label(nameArray[i],{offset:label_offset_size});
//                         markerArray[i].setLabel(labelArray[i]);
//                         markerArray[i].setIcon(new BMap.Icon('../images/red.gif',new BMap.Size(24,24)));
//                     }else{
//                         labelArray[i]=new BMap.Label(formatDate(timeArray[i],'dd hh:ii'),{offset:label_offset_size});
//                         markerArray[i].setLabel(labelArray[i]);
//                         markerArray[i].setIcon(new BMap.Icon('../images/red.gif',new BMap.Size(24,24)));
//                     }
//                     contentArray[i]='<h3>'+ nameArray[i] +'</h3>';
//                     contentArray[i] +='<p>速度：'+ Math.round(speedArray[i]*100)/100 +'Km/h<br/>';
//                     contentArray[i] +='温度：'+ gpsTemp1[i]/10 +'°C , '+ gpsTemp2[i]/10+'°C , '+ gpsTemp3[i]/10 +'°C , '+ gpsTemp4[i]/10+'°C,<br/>';
//                     contentArray[i] +='冷机状态：'+ coolerStatus[i] +'<br/>';
//                     contentArray[i] +='门  状   态：'+ doorStatus[i] +'<br/>';
//                     contentArray[i] +='定位时间：'+ formatDate(gpsTimeArray[i]) +'<br/>';
//                     contentArray[i] +='数据时间：'+ formatDate(timeArray[i]) +'</p>';
//                     map.addOverlay(markerArray[i]);
//                     infoWindowArray[i] = new BMap.InfoWindow(contentArray[i]);
//                     addClickHandler(contentArray[i],markerArray[i]);
//                     //end of add marker
//                 }
//                 map.centerAndZoom(points[0],15);
//             },
//             error: function (json){	
//                 {layer.msg('加载失败', {shade: [0.1,'#fff'],time:2000});}
//             }
//         });	
//     }
//     translateCallback = function (data){
//         if(data.status === 0) {
//             map.clearOverlays(); 
//             for (var i = 0; i < data.points.length; i++) {
//                 var tmpMarker=new BMap.Marker(data.points[i]);
//                 tmpMarker.setLabel(new BMap.Label(nameArray[i],{offset:label_offset_size}));
//                 tmpMarker.setIcon(new BMap.Icon('/assets/images/bz_red.gif',new BMap.Size(24,24)));
//                 sContent='<h3>'+ nameArray[i] +'</h3>';
//                 sContent +='<p>速度：'+ Math.round(speedArray[i]*100)/100 +'m/s<br/>';
//                 sContent +='温度：'+ gpsTemp1[i]/10 +'°C , '+ gpsTemp2[i]/10+'°C , '+ gpsTemp3[i]/10 +'°C , '+ gpsTemp4[i]/10+'°C,<br/>';
//                 sContent +='冷机状态：'+ coolerStatus[i] +'<br/>';
//                 sContent +='门  状   态：'+ doorStatus[i] +'<br/>';
//                 sContent +='定位时间：'+ formatDate(gpsTimeArray[i]) +'<br/>';
//                 sContent +='数据时间：'+ formatDate(timeArray[i]) +'</p>';
//                 var infoWindow = new BMap.InfoWindow(sContent);
//                 tmpMarker.addEventListener("click", function(){
//                     this.openInfoWindow(infoWindow);
//                 });
//                 map.addOverlay(tmpMarker);
//                 console.log(data.points[i]);
//                 //map.setCenter(data.points[i]);
//             }
//             map.centerAndZoom(data.points[0],15);
//         }else{
            
//         }
//     }
//     function addClickHandler(content,marker){
//         marker.addEventListener("click",function(e){
//             openInfo(content,e)}
//         );
//     }
//     function openInfo(content,e){
//         var p = e.target;
//         var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
//         var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
//         map.openInfoWindow(infoWindow,point); //开启信息窗口
//     }
//     loadContainer(1);
//     $("#containerLoader").click(function(){
//         loadContainer(2);
//     });
// });
