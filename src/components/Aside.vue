<template>
    <div>
        <el-menu background-color="#545c64"
                 :default-active="url"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router
                 unique-opened
                 style="position: absolute;bottom: 0;top:60px;width: 200px;left: 0px;"
                 align="left">
            <el-menu-item index="/">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页信息</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-setting"></i>主机与应用设置</template>
                <el-menu-item-group>
                    <template slot="title">主机登陆类</template>
                        <el-menu-item index="/hostconf">主机信息配置</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="应用配置类">
                    <el-menu-item index="/apppath">应用路径配置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-bell"></i>升级任务</template>
                <el-menu-item-group title="升级任务类">
                    <el-menu-item index="/update">开始升级</el-menu-item>
                    <el-menu-item index="">预留</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-search"></i>任务信息追溯</template>
                <el-menu-item-group title="任务查看类">
                    <el-menu-item index="/history">查看历史升级任务</el-menu-item>
                    <el-menu-item index="">预留</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {ElCol},
        name: 'el-aside',
        data () {
            return {
                url:'/'
            }
        },
        methods: {
        },
        created() {
            this.url =  this.$route.path;
        }
    }
</script>


<style scoped>
a {
    text-decoraction: none;
}
.router-link-active {
    text-decoration: none;
}
</style>
