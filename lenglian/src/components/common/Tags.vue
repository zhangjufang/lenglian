<template>
    <div class="tags" v-if="showTags">
        <el-button class="bon"><i class="el-icon-d-arrow-left"></i></el-button>
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index" style="text-decoration: none;">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" >
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.path;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.path && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.path;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.path;
                })
                !isExist && this.tagsList.push({
                    title: route.meta.title,
                    path: route.path
                })
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.setTags(this.$route);
        }
    }

</script>


<style>
.tags {
    position: relative;
    height: 35px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    border-bottom: 2px solid rgb(0,52,102);
}
.bon{
    float: left;
    height:35px;
    width:45px;
    border: none;
}
.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    /* margin-top:-10px; */
}


.tags-li {
    float: left;
    margin: 3px 0px 0px 0px;
    font-size: 14px;
    overflow: hidden;
    cursor: pointer;
    height: 35px; 
    line-height: 35px;
    margin-top: -2px;
    border-right: 1px solid rgb(236, 231, 231);
    border-left: 1px solid rgb(236, 231, 231);
    background: #fff;
    padding: 2px 5px 2px 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
    text-decoration: none;
    /* border-radius: 6px; */
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
    
}

.tags-li.active {
    color:#fff;
    background:rgb(0,52,102);
    border-bottom: none;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #ffffff;
    
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 5px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    z-index: 10;
}

</style>
