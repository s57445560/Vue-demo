<template>
    <div class="el-header">
        <el-row>
            <el-col :span="10">
                <h2 style="color: white;font-family: Microsoft YaHei;margin-top: 15px;">
                    <i class="el-icon-menu"></i>
                    应用系统升级平台
                </h2>
            </el-col>
            <el-col :span="2" :offset="12" style="margin-top: 15px;">
                <el-button type="success" size="small" round plain @click="exit">退出</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {
            ElCol,
            ElRow
        },
        name: 'el-header',
        data () {
            return {}
        },
        methods:{
            exit(){
                sessionStorage.removeItem('token');
                this.$router.push({path:'/login'})

            }
        }
    }
</script>


<style scoped>
</style>
