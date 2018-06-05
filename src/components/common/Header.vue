<template>
    <div class="header">
        <div class="logo"><img src="../images/irlogo.png"> </div>
        <div class = "logo" style="margin-left:-150px;">后台管理系统</div>
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
                        <router-link to="/message">
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
                        <a href="#" target="_blank">
                            <el-dropdown-item>个人资料</el-dropdown-item>
                        </a>
                        <a href="#" target="_blank" >
                            <el-dropdown-item>修改密码</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 密码修改框框 -->
		<!-- <el-dialog title="_修改密码_" :visible.sync="editpass" size="init">
			<el-form :model="form">
			<el-form :model="passwordData" :rules="passwordRules" ref="passwordData">
				<el-row>
					<el-form-item label="_原密码_" prop="oldPass"  label-width="100px">
						<el-input v-model="passwordData.oldPass" type='password' placeholder="_请输入密码_"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="_新密码_" prop="newPass" label-width="100px">
						<el-input v-model="passwordData.newPass" type='password'  placeholder="_请输入密码_"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="_确认密码_" prop="checkPass" label-width="100px">
						<el-input v-model="passwordData.checkPass" type='password'  placeholder="_请输入密码_"></el-input>
					</el-form-item>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="warning" @click="editpass=false">_取消_</el-button>
				<el-button type="primary" @click="savePassword">_确定_</el-button>
			</div>
		</el-dialog> -->
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
                // message: 2
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
        width:250px;
        line-height: 70px;
    }
    img{
        width:60px;
        margin-top:10px;
        margin-left: 20px;
    }
    
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
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
        margin-left: 10px;
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
</style>
