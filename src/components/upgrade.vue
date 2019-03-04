<template>
    <el-row>
        <el-col>
            <el-steps :active="number" finish-status="success" simple>
                <el-step title="准备部署"></el-step>
                <el-step title="地址连通性检查"></el-step>
                <el-step title="开始部署"></el-step>
                <el-step title="报告生成"></el-step>
            </el-steps>
        </el-col>
        <el-col>
            <el-col class="test-1" style="max-height: 400px;min-height: 400px;overflow-y:auto" :span="20" :offset="2">
                <transition enter-active-class="animated fadeInRight">
                    <el-col v-show="number === 0" :span="6" :offset="9" style="margin-top: 80px;">
                        <h1>准备部署!</h1>
                    </el-col>
                </transition>
                <transition enter-active-class="animated fadeInRight">
                    <el-col v-show="number === 1">
                          <el-tabs class="test-1" tab-position="left" style="height: 300px;margin-top: 20px;overflow-y :auto">
                            <el-tab-pane label="连通性检查">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>服务器IP</th>
                                            <th>状态</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(value,key,index) in check_run" :key="key">
                                            <td v-text="index+1"></td>
                                            <td>{{ key }}</td>
                                            <td v-if="value == true"><i style="color: #67C23A" class="el-icon-success"></i></td>
                                            <td v-else-if="value == false"><i style="color: #F56C6C" class="el-icon-error"></i></td>
                                            <td v-else="value == true"><i style="color: #909399" class="el-icon-loading"></i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </el-tab-pane>
                          </el-tabs>
                    </el-col>
                </transition>
                <transition enter-active-class="animated fadeInRight">
                    <el-col v-show="number === 2">
                        <el-col style="margin-top: 20px;" :span="19" :offset="5">
                            <el-tag type="info">升级应用状态：</el-tag>
                            <el-tag v-for="(value,key) in get_run_task.ok_list" :key="value">{{ value }}  <i style="color: #67C23A" class="el-icon-success"></i></el-tag>
                            <el-tag v-for="(value,key) in get_run_task.error_list" :key="value">{{ value }}  <i style="color: #F56C6C" class="el-icon-error"></i></el-tag>
                            <el-tag v-for="(value,key) in get_run_task.not_run_list" :key="value">{{ value }}  <i style="color: #909399" class="el-icon-loading"></i></el-tag>
                        </el-col>
                        <el-col>
                          <el-tabs class="test-1" tab-position="left" style="height: 270px;margin-top: 20px;overflow-y :auto" v-model="get_run_task.active">
                            <el-tab-pane v-for="(values,key) in get_run_task.data" :key="key" :label="values.name" :name="values.name">
                                <el-alert title="应用执行状态" type="info" :closable="false" center show-icon style="margin-bottom: 3px;"></el-alert>
                                <el-col v-for="(value,key) in values.result" :key="key">
                                    <el-alert v-if="value.status" :title="value.ip " type="success"  :closable="false" style="margin-bottom: 3px;">: 升级成功!</el-alert>
                                    <el-alert v-else-if="value.status === false" :title="value.ip " type="error"  :closable="false" style="margin-bottom: 3px;">: {{ value.message }}</el-alert>
                                </el-col>
                            </el-tab-pane>
                          </el-tabs>
                        </el-col>
                    </el-col>
                </transition>
                <transition enter-active-class="animated fadeInRight">
                    <el-col v-show="number === 3">
                        <el-tabs class="test-1" tab-position="left" style="height: 310px;margin-top: 20px;overflow-y :auto">
                            <el-tab-pane label="报告生成">
                                <el-col>
                                    <el-alert title="升级报告" type="info" :closable="false" center show-icon style="margin-bottom: 3px;"></el-alert>
                                    <transition enter-active-class="animated flipInX" >
                                    <el-form label-position="right" label-width="120px" v-if="display_result">
                                        <el-form-item label="ID:" style="margin: 0;">
                                            <el-tag type="success">{{ upgrade_status.id }}</el-tag>
                                        </el-form-item>
                                        <el-form-item label="时间:" style="margin: 0;">
                                            <el-tag type="success">{{ upgrade_status.UpdateTime }}</el-tag>
                                        </el-form-item>
                                        <el-form-item label="升级的应用:" style="margin: 0;">
                                            <el-tag type="success">{{ upgrade_status.UpdateApp }}</el-tag>
                                        </el-form-item>
                                        <el-form-item label="备份点:" style="margin: 0;">
                                            <el-tag type="success">{{ upgrade_status.BackDir }}</el-tag>
                                        </el-form-item>
                                        <el-form-item label="耗时:" style="margin: 0;">
                                            <el-tag type="success">{{ upgrade_status.ElapsedTime  }}s</el-tag>
                                        </el-form-item>
                                        <el-form-item label="状态:" style="margin: 0;">
                                            <el-tag type="success" v-if="upgrade_status.UpdateAppStatus">升级成功</el-tag>
                                            <el-col v-else>
                                                <el-tag type="danger">升级失败</el-tag>
                                                <el-tag type="danger" v-for="(value,key) in get_run_task.error_list" :key="value">{{ value }}</el-tag>
                                            </el-col>

                                        </el-form-item>
                                    </el-form>
                                    </transition>
                                </el-col>
                            </el-tab-pane>
                          </el-tabs>
                    </el-col>
                </transition>
                <transition enter-active-class="animated fadeInRight">
                    <el-col v-show="number === 4" :span="6" :offset="9" style="margin-top: 80px;">
                        <h1>部署完成!</h1>
                    </el-col>
                </transition>
            </el-col>
        </el-col>
        <el-col :span="24" >
            <el-col :span="3" :offset="3"><el-button type="success" @click="Home" round>返回升级 首页</el-button></el-col>
            <el-col :span="3" :offset="13"><el-button type="primary" @click="Next" :loading="button_status" round>{{ commit_data }}</el-button></el-col>
        </el-col>
        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span style="color: #409EFF">       升级时有错误 (是/否) 继续执行???</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm_run">确 定</el-button>
          </span>
        </el-dialog>
    </el-row>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {
            ElCol,
            ElRow
        },
        name: 'el-upgrade',
        data () {
            return {
                number:0,
                commit_data:'进行 下一步',
                active:'ok',
                centerDialogVisible:false
            }
        },
        props: ["select","change"],
        computed:{
            get_run_task(){
                return this.$store.state.update.run_task
            },
            check_run(){
                return this.$store.state.update.check_run
            },
            button_status(){
                return this.$store.state.update.button_status
            },
            upgrade_status(){
                return this.$store.state.update.upgrade_status
            },
            display_result(){
                return this.$store.state.update.display_result
            }
        },
        methods:{
            Next(){
                // 第一步
                if(this.number === 0){
                    console.log('00000');
                    this.$store.dispatch('run_check',{data:this.select.join(',')});
                    setTimeout(function () {
                        this.$store.dispatch('get_ip_status');
                    }.bind(this),100);
                    this.number++;
                // 第二步
                }else if(this.number === 1){
                    let status = true;
                    for(var i in this.check_run){
                        if(!this.check_run[i]){
                            status = false;
                        }
                    }
                    if(status){
                        this.number++;
                        this.$store.dispatch('run_upgrade',{data:this.select.join(',')});
                        setTimeout(function () {
                            this.$store.dispatch('get_upgrade_status');
                        }.bind(this),100);
                    }else{
                        this.$message.error('有服务器登陆失败，请解决后执行下一步！');
                    }
                // 第三步
                }else if(this.number === 2){
                    if(this.get_run_task.status === false){
                        this.centerDialogVisible = true;
                    }else{
                        this.confirm_run();
                    }
                 // 第四步
                }else if(this.number === 3){
                    this.commit_data = "升级完毕";
                    this.number++
                 // 执行最后一部
                }else{
                    this.number = 0;
                    this.commit_data = "进行 下一步";
                    this.$emit('update:change',true);

                }
            },
            Home(){
                // 返回升级选择页
                this.number = 0;
                this.$emit('update:change',true)
            },

            confirm_run(){
                // 如果有错误时的确认信息
                if(this.centerDialogVisible){
                    this.centerDialogVisible = false;
                }
                this.number++;
                this.$store.dispatch('get_result');
            }
        }
    }
</script>


<style scoped>
    .test-1::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    .test-1::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 10px;
             -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: #535353;
        }
    .test-1::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 10px;
            background: #EDEDED;
        }
</style>
