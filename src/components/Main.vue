<template>
    <el-row>
        <el-col :span="7" >
            <el-card shadow="always" style="height: 100px;background-color: #409EFF">
                <h1 style="margin-top: 10px;text-align:center;color: white"><strong>配置主机数: </strong>{{ number.ip_count }}</h1>
            </el-card>
        </el-col>
        <el-col :span="7" :offset="1">
            <el-card shadow="always" style="height: 100px;background-color: #409EFF">
                <h1 style="margin-top: 10px;text-align:center;color: white"><strong>配置应用数: </strong>{{ number.app_count }}</h1>
            </el-card>
        </el-col>
        <el-col :span="7" :offset="1">
            <el-card shadow="always" style="height: 100px;background-color: #409EFF">
                <h1 style="margin-top: 10px;text-align:center;color: white"><strong>总升级次数: </strong>{{ number.update_record_count }}</h1>
            </el-card>
        </el-col>

    </el-row>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {
            ElCol,
            ElRow},
        name: 'el-main',
        data () {
            return {
                number:{"ip_count": 0, "app_count": 0, "update_record_count": 0}
            }
        },
        created(){
            this.$http.get(this.$store.state.request_url+"/api/v1/main_count/",
            ).then(function (resp) {
                console.log(resp);
                this.number = resp.data
            }.bind(this))
        }
    }
</script>


<style scoped>
</style>
