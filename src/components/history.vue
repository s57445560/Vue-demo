<template>
    <div>
        <div class="panel panel-default" style="padding: 0;">
            <div class="panel-heading">
                <el-row>
                    <el-col :span="20">
                        <i class="el-icon-search"></i> 历史升级任务查看
                    </el-col>
                </el-row>
            </div>

            <div class="panel-body" style="min-height: 500px;">
                <el-row v-loading="fullscreenLoading">
                    <el-col :span="24" >
                        <el-table
                                fit
                                :data="tableData.results"
                                border
                                size="mini"
                                stripe>
                            <el-table-column
                                    fixed
                                    prop="id"
                                    label="ID"
                                    width="80">
                            </el-table-column>
                            <el-table-column
                                    prop="UpdateTime"
                                    label="升级时间"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="UpdateApp"
                                    label="升级应用">
                            </el-table-column>
                            <el-table-column
                                    prop="BackDir"
                                    label="备份点"
                                    width="220">
                            </el-table-column>
                            <el-table-column
                                    prop="ElapsedTime"
                                    label="耗时(s)"
                                    width="80">
                            </el-table-column>
                            <el-table-column
                                    prop="F_app"
                                    label="失败应用"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="UpdateAppStatus"
                                    label="升级状态"
                                    width="100"
                                    :filters="[{ text: '成功', value: true }, { text: '失败', value: false }]"
                                    :filter-method="filterTag"
                                    filter-placement="bottom-end">
                                <template slot-scope="scope">
                                    <el-tag
                                            :type="scope.row.UpdateAppStatus === true ? 'success' : 'danger'"
                                            disable-transitions v-text="scope.row.UpdateAppStatus === true ? '成功' : '失败'"></el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                              fixed="right"
                              label="详细"
                              width="100">
                              <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                              </template>
                            </el-table-column>
                        </el-table>
                    </el-col>

                    <el-col :span="14" :offset="6" style="margin-top: 50px">
                        <el-pagination
                                background
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page.sync="currentPage"
                              :page-sizes="[10, 20, 30, 40]"
                              :page-size="pageSize"
                              layout="sizes, prev, pager, next"
                              :total="tableData.count">
                        </el-pagination>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-dialog title="结果详细信息" :visible.sync="dialogTableVisible" width="60%">
            <div style="text-align: center" v-if="get_run_task == false">
               <h2>暂无结果</h2>
            </div>

              <el-tabs class="test-1" tab-position="left" style="height: 270px;margin-top: 20px;overflow-y :auto" v-model="get_run_task.active" v-else>
                <el-tab-pane v-for="(values,key) in get_run_task.data" :key="key" :label="values.name" :name="values.name">
                    <el-alert title="应用执行状态" type="info" :closable="false" center show-icon style="margin-bottom: 3px;"></el-alert>
                    <el-col v-for="(value,key) in values.result" :key="key">
                        <el-alert v-if="value.status" :title="value.ip " type="success"  :closable="false" style="margin-bottom: 3px;">: 升级成功!</el-alert>
                        <el-alert v-else-if="value.status === false" :title="value.ip " type="error"  :closable="false" style="margin-bottom: 3px;">: {{ value.message }}</el-alert>
                    </el-col>
                </el-tab-pane>
              </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {ElCol},
        name: 'histroy',
        data () {
            return {
                currentPage:1,
                pageSize:10,
                dialogTableVisible: false,
                get_run_task:{}
            }
        },
        computed:{
            fullscreenLoading(){
                return this.$store.state.history.history_fullscreenLoading
            },
            tableData(){
                return this.$store.state.history.tableData
            },
        },
        created(){
            this.$store.dispatch('get_history_list',{currentPage:this.currentPage,pageSize:this.pageSize})
        },
        methods: {
            handleClick(row){
                this.dialogTableVisible = true;
                if(row.Detail_Status){
                    this.get_run_task = JSON.parse(row.Detail_Status.U_Status)
                }else{
                    this.get_run_task = false
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.$store.dispatch('get_history_list',{currentPage:this.currentPage,pageSize:this.pageSize})
              },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.$store.dispatch('get_history_list',{currentPage:this.currentPage,pageSize:this.pageSize})
              },
            filterTag(value, row) {
                return row.UpdateAppStatus === value;
              },
        },
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
