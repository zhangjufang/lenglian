<template>
    <div class="header">
        <div class="logo"><img src="../images/irlogo.png"> </div>
        <div class = "lo" style="margin-left:-150px;">{{$t('Header.tittle')}}</div>
        <!-- <div class ="bg"><img src="../images/bg2.jpg"></div> -->
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <!-- <div class="user-avator"><img src="static/img/img.jpg"></div> -->
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <div  @click="per"><el-dropdown-item > {{$t('Header.per')}} </el-dropdown-item></div>
                        <div @click="changes"><el-dropdown-item>{{$t('Header.change')}}</el-dropdown-item></div>    
                        <el-dropdown-item divided  command="loginout">{{$t('Header.logo')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="chan" v-show="change">
                    <!-- 密码修改框框 -->
                    <div class="changes"> <p style="padding-left:10px;padding-top:10px;font-size:18px;">用户密码修改</p> 
                    <el-button style="float:right;margin-right:20px;padding:5px 6px;margin-top:-20px;" @click="toggle">关闭</el-button> </div>
                    <div class="users">
                        <b>登录名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{{username}} </b> <br>
                        <b>姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{username}} </b> <br>
                        <b>密码：<el-input
                    placeholder="用户密码"  style="width:300px;margin-left:65px;"
                    v-model="input10"
                    clearable>
                    </el-input></b> <br>
                    <b>重复录入：<el-input
                    placeholder="重复录入用户密码"  style="width:300px;margin-left:30px;"
                    v-model="input10"
                    clearable>
                    </el-input></b> <br>
                    <el-button type="primary" style="margin-left:100px;">保存</el-button>
                    <el-button type="danger" style="margin-left:100px;">重置</el-button>
                    </div>

                </div>
                
            </div>
        </div>
        <div class="user" v-show="user"> 
            <!-- 个人资料 -->
            <div class="changes"> <p style="padding-left:10px;padding-top:10px;font-size:18px;">用户信息修改</p> 
             <el-button style="float:right;margin-right:20px;padding:5px 6px;margin-top:-20px;" @click="toggle">关闭</el-button> </div>
           <div class="users">
                <b>登录名：&nbsp;&nbsp; {{username}} </b> <br>
                <b>姓名：<el-input
                    placeholder="请输入姓名"  style="width:300px;margin-left:30px;"
                    v-model="input10"
                    clearable>
                    </el-input></b> <br>
                <b>电话：<el-input
                    placeholder="电话"  style="width:300px;margin-left:30px;"
                    v-model="input10"
                    clearable>
                    </el-input></b> <br>
                <b>Email：<el-input
                    placeholder="Email"  style="width:300px;margin-left:20px;"
                    v-model="input10"
                    clearable>
                    </el-input></b><br>
                <b>性别：
                        <el-select v-model="value" slot="prepend" placeholder="请选择" style="z-index:9999;margin-left:30px;width:300px;">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select></b> <br>
                <el-button type="primary" style="margin-left:100px;">保存</el-button>
                <el-button type="danger" style="margin-left:100px;">重置</el-button>
            </div> 
            
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                // editpass:false,
                // name: 'jufang',
                message: 2,
                input10:'',
                 options: [{
                    value: '选项1',
                    label: '男'
                    }, {
                    value: '选项2',
                    label: '女'
                    }],
                value: '',
                user:false,
                change:false,
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('username');
                return username ? username : this.username;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('username')
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            per(){
            this.user=true
            this.change=false
            },
            changes(){
            this.user=false
            this.change=true
            },
            toggle(){
                this.user=false
                this.change=false
            },
             lancheck(lan){
            console.log(lan);
            this.$i18n.locale=lan;
            },
            
            // //保存密码
			// savePassword(){

			// 	this.$refs['passwordData'].validate((valid) => {
			// 		if (valid) {
			// 			let url="web/Common/Common_Admin";

			// 			password(url);
			// 			function password(url){
			// 				let passwordData=_this.passwordData;
			// 				let postData={
			// 					FTokenID: _this.$store.state.FTokenID,
			// 					FAction: "UpdateAdminMainUserPassword",
			// 					FOldPassword:passwordData.oldPass,
			// 					FNewPassword:passwordData.checkPass,
			// 					FVersion: "1.0.0"
			// 				}
			// 				$.ajax({
			// 					"url": url,
			// 					"cache": false,
			// 					"async": true,
			// 					"type": "post",
			// 					"dataType": "json",
			// 					"contentType": "application/json; charset=utf-8",
			// 					"data": JSON.stringify(postData),
			// 					success: function (res) {

			// 						if(res.Result==200){

			// 							_this.$refs['passwordData'].resetFields();
			// 							_this.$message("_修改成功_，_5秒后返回登录页面_");
			// 							_this.editpass = false;
			// 							setTimeout(function(){
			// 								_this.$store.commit("goLogin");
			// 							},5000)
			// 						}else {
			// 							_this.$message("_修改失败_!")
			// 						}
			// 					},
			// 					error: function () {
			// 						//console.log('_请求失败_')
			// 					}
			// 				});
			// 			}
			// 		} else {
			// 			//console.log('error submit!!');
			// 			return false;
			// 		}
			// 	});
			// },
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    
    .header .logo{
        float: left;
        width:120px;
        line-height: 70px;
    }
    .lo{
        position:fixed;
        padding-top:20px;
        padding-left:250px;
    }
    .logo img{
        width:60px;
        margin-top:10px;
        margin-left: 20px;
    }
    .bg img{
        float: left;
        width:63%;
        height:70px;
        /* margin-top:10px; */
        /* margin-left: 20px; */
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
        /* width:50%; */
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
        
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
        margin-left: 10px;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 20px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .user{
        position: fixed;
        z-index:999;
        width:45%;
        border:1px solid gray;
        height:65vh;
        margin-top:10%;
        margin-left:30%;
        background-color:#fff;        
        border-radius: 8px;
    }
    .changes{
        width:100%;
        height:50px;
        background-color:rgb(0,52,102)
    }
    .users{
        margin-top:5%;
        margin-left:15%;
    }
    .users b{
        font-size:18px;
        display:block;
        color:black;
        /* margin-top:3%; */
    }
    .chan{
        position: fixed;
        z-index:999;
        width:45%;
        border:1px solid gray;
        height:60vh;
        margin-top:24%;
        margin-left:-59%;
        background-color:#fff;        
        border-radius: 8px;
    }
</style>
