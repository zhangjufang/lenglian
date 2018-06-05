<template>
    <div class="login-wrap" :style ="bg">
        <div class="login">
            <div class="ms-logo"><img src="../images/irlogo.png" alt=""></div>
            <div class="ms-login" style="padding:50px;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                    <el-form-item prop="userName" style="margin-top: -20px;margin-left:30px;">
                        <span >{{$t('login.username')}}:</span>&#160;
                        <el-input v-model="ruleForm.username" placeholder="username" style="width:60%;margin-left:20px;"></el-input>
                    </el-form-item>
                    <el-form-item prop="userPassword" style="margin-top: 20px;margin-left:30px;">
                        <span>{{$t('login.password')}}&nbsp;:</span>&#160;&#160;&#160;
                        <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" style="width:60%;margin-left:20px;"></el-input>
                    </el-form-item>
                    <template >
                        <span style="margin-left:30px;">{{$t('login.lang')}}:</span>
                        <el-radio v-model="radio" label="1" name="lang" @change="lancheck('cn')" value="_cn" style="margin-left:10%">中文</el-radio>
                        <el-radio v-model="radio" label="2" name="lang" @change="lancheck('en')" value="_en" style="margin-left:10%">English</el-radio>
                    </template>
                    <div class="login-btn">
                        <el-button id="loginBtn" @click="submitForm('ruleForm')">登录</el-button>
                    </div>  
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
// import { setCookie,getCookie,delCookie } from '../../assets/js/login.js'
    export default {
        data: function(){
            return {
                radio:'1',
                bg:{
                    backgroundImage: "url(" + require("../images/bei3.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", 
                },
                ruleForm: {
                    username: '',
                    password: ''
                },
            }
        },
        methods: {
             submitForm(formName) {
                 
               this.$axios.post('/api/welcome/user_login',this.qs.stringify({userName:this.ruleForm.username,userPassword:this.ruleForm.password})).then((data) =>{
                //    console.log('success====',data)
                  if (data.data.code==200) {
                        localStorage.setItem('username',this.ruleForm.username);
                        this.$router.push('/');
                    } else {
                        alert('登陆失败:用户名或密码不正确');
                        return false;
                    }
                });
            },
            lancheck(lan){
            console.log(lan);
            this.$i18n.locale=lan;
            },
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .login{
        position: absolute;
        left:35%;
        top:20%;
        width:500px;
        height:360px;
        border-radius: 6px;
        background: #fff;
    }
    .ms-logo{
        height:35%;
        width: 100%;
        background-color: rgb(0,52, 102);

    }
    .ms-logo img{
        margin-left: 35%;
        margin-top: 3%;
    }
   .fon{
        width:100px;
    }
    .login-btn{
        text-align: center;
        margin-top:20px;
    }
    .login-btn button{
        width:100%;
        height:36px;
        color: #fff;
        background-color: rgb(0,52, 102);
    }
</style>