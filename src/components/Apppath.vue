<template>
    <div>
        <div class="panel panel-default" style="padding: 0;" v-loading="path_fullscreenLoading">
            <div class="panel-heading">
                <el-row>
                    <el-col :span="20">
                        <i class="el-icon-setting"></i> 应用路径配置
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini"
                                   @click="path_addinit"></el-button>
                    </el-col>
                </el-row>
            </div>

            <div class="panel-body" style="min-height: 500px;">
                <el-row >
                    <el-col :span="18" :offset="3">
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
                                    prop="App"
                                    label="应用名称"
                                    width="130">
                            </el-table-column>
                            <el-table-column
                                    prop="AIP"
                                    label="所在服务器ip"
                                    width="130">
                            </el-table-column>
                            <el-table-column
                                    prop="DIR"
                                    label="程序路径"
                                    width="260">
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="path_handleClick(scope)" type="text" size="small">修改
                                    </el-button>
                                    <el-button type="text" size="small" @click="path_save_data(scope)"
                                               style="color: #E6A23C">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>

                    <el-col :span="14" :offset="6" style="margin-top: 50px">
                        <el-pagination
                                background
                                @size-change="path_handleSizeChange"
                                @current-change="path_handleCurrentChange"
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
        <el-dialog
                title="提示"
                :visible.sync="path_dialogVisible"
                width="30%">
            <span>是否确定删除此记录</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="path_dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="path_Delete">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="应用信息修改" :visible.sync="path_dialogFormVisible">
            <el-form :model="path_form" ref="path_numberValidateForm">
                <el-form-item label="应用名称" label-width="120px" prop="App"
                                :rules="[{ required: true, message: '应用路径不能为空'}]">
                    <el-select v-model="path_form.App" placeholder="请选择活动区域">
                        <el-option v-for="value in getbasedata.app" :value="value" :key="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务器ip" label-width="120px" prop="AIP"
                              :rules="[{ required: true, message: '应用路径不能为空'}]">
                    <el-select v-model="path_form.AIP" placeholder="请选择活动区域">
                        <el-option v-for="value in getbasedata.ip" :value="value" :key="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应用路径" label-width="120px"
                                  prop="DIR"
                                  :rules="[{ required: true, message: '应用路径不能为空'}]">
                    <el-input v-model="path_form.DIR" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="path_dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="path_submitForm('path_numberValidateForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="应用信息添加" :visible.sync="path_addFormVisible">
            <el-form :model="path_form" ref="path_addValidateForm">
                <el-form-item label="应用名称" label-width="120px" prop="App"
                                :rules="[{ required: true, message: '应用路径不能为空'}]">
                    <el-select v-model="path_form.App" placeholder="请选择活动区域">
                        <el-option v-for="value in getbasedata.app" :value="value" :key="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务器ip" label-width="120px" prop="AIP"
                              :rules="[{ required: true, message: '应用路径不能为空'}]">
                    <el-select v-model="path_form.AIP" placeholder="请选择活动区域">
                        <el-option v-for="value in getbasedata.ip" :value="value" :key="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应用路径" label-width="120px"
                                  prop="DIR"
                                  :rules="[{ required: true, message: '应用路径不能为空'}]">
                    <el-input v-model="path_form.DIR" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="path_addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="path_addsubmitForm('path_addValidateForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {ElCol},
        name: 'hostconf',
        data () {
            return {
                path_activeName: 'first',
                path_dialogVisible: false,
                path_addFormVisible: false,
                lines_index: "",
                line:"",
                currentPage: 1,
                pageSize:10,
                path_form_index:"",
            }
        },
        created(){
            this.$store.dispatch('get_apppath_list',{currentPage:this.currentPage,pageSize:this.pageSize});
            this.$store.dispatch('get_app_ip_list');
        },
        computed:{
            getbasedata(){
                return this.$store.state.apppath.base_data
            },
            tableData(){
                return this.$store.state.apppath.tableData
            },
            path_dialogFormVisible:{
                get(){
                    return this.$store.state.apppath.path_dialogFormVisible
                },
                set(value){
                    this.$store.commit('set_path_dialogFormVisible', value)
                }
            },
            path_fullscreenLoading:{
                get(){
                    return this.$store.state.apppath.path_fullscreenLoading
                },
                set(value){
                    this.$store.commit('set_path_fullscreenLoading', value)
                }
            },
            path_form:{
                get(){
                    return this.$store.state.apppath.form
                },
                set(value){
                    this.$store.commit('set_app_form', value)
                }
            },
            fullscreenLoading:{
                get(){
                    return this.$store.state.apppath.fullscreenLoading
                },
                set(value){
                    this.$store.commit('set_fullscreenLoading', value)
                }
            }
        },
        methods: {
            path_handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.$store.dispatch('get_apppath_list',{currentPage:this.currentPage,pageSize:this.pageSize});

            },
            path_handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.$store.dispatch('get_apppath_list',{currentPage:this.currentPage,pageSize:this.pageSize});

            },
            path_handleClick(row) {
                this.path_dialogFormVisible = true;
                this.path_form = {...row.row};
                this.path_form_index = row.$index;
                console.log(row);
            },
            path_addinit(){
                this.path_form = {};
                this.path_addFormVisible = true
            },
            path_save_data(row){
                this.path_dialogVisible = true;
                this.line = row.row;
                this.lines_index = row.$index;
            },
            path_Delete(){
                // 删除时使用的方法
                this.path_dialogVisible = false;
                console.log(this.lines_index);
                if (this.lines_index !== "") {
                    this.$store.dispatch('app_delete',{"data":this.line,"index":this.lines_index});
                    this.$store.dispatch('get_apppath_list',{currentPage:this.currentPage,pageSize:this.pageSize})
                } else {
                    console.log("数据获取失败")
                }
            },
            path_submitForm(formName) {
                // 修改信息时候提交的方法
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.$refs,"cccccccccccc");
                        this.$store.dispatch('get_app_update',{form:this.path_form,index:this.path_form_index});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            path_addsubmitForm(formName) {
                //添加新host信息时的方法 这里添加完毕后需要重新请求一下host列表
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('get_app_add',this.path_form);
                        this.$store.dispatch('get_apppath_list',{currentPage:this.currentPage,pageSize:this.pageSize});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        mounted(){
            console.log('mounted');
        }
    }
</script>


<style scoped>
</style>
