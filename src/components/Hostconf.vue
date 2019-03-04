<template>
    <div>
        <div class="panel panel-default" style="padding: 0;" v-loading="fullscreenLoading">
            <div class="panel-heading">
                <el-row>
                    <el-col :span="20">
                        <i class="el-icon-setting"></i> 主机信息配置
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="addinit"></el-button>
                    </el-col>
                </el-row>
            </div>

            <div class="panel-body" style="min-height: 500px;">
                <el-row >
                    <el-col :span="14" :offset="5">
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
                                    prop="IP"
                                    label="ip"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="PORT"
                                    label="端口"
                                    width="130">
                            </el-table-column>
                            <el-table-column
                                    prop="UserName"
                                    label="用户名"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope)" type="text" size="small">修改</el-button>
                                    <el-button type="text" size="small" @click="save_data(scope)"
                                               style="color: #E6A23C">删除</el-button>
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
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <span>是否确定删除此记录</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="Delete">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="主机信息修改" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="numberValidateForm">
                <el-form-item label="ip地址" label-width="120px"
                              prop="IP"
                              :rules="[{ required: true, message: 'ip不能为空'}]">
                    <el-input v-model="form.IP" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="端口号" label-width="120px"
                              prop="PORT"
                              :rules="[{ required: true, message: '端口不能为空'}]">
                    <el-input v-model="form.PORT" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="用户名" label-width="120px"
                              prop="UserName"
                              :rules="[{ required: true, message: '用户名不能为空'}]">
                    <el-input v-model="form.UserName" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="服务器密码" label-width="120px"
                              prop="Password"
                              :rules="[{ required: true, message: '密码不能为空'}]">
                    <el-input v-model="form.Password" type="password" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('numberValidateForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="主机信息添加" :visible.sync="addFormVisible">
            <el-form :model="form" ref="addValidateForm">
                <el-form-item label="ip地址" label-width="120px"
                              prop="IP"
                              :rules="[{ required: true, message: 'ip不能为空'}]">
                    <el-input v-model="form.IP" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="端口号" label-width="120px"
                              prop="PORT"
                              :rules="[{ required: true, message: '端口不能为空'}]">
                    <el-input v-model="form.PORT" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="用户名" label-width="120px"
                              prop="UserName"
                              :rules="[{ required: true, message: '用户名不能为空'}]">
                    <el-input v-model="form.UserName" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
                <el-form-item label="服务器密码" label-width="120px"
                              prop="Password"
                              :rules="[{ required: true, message: '密码不能为空'}]">
                    <el-input v-model="form.Password" type="password" auto-complete="off" style="width: 50%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addsubmitForm('addValidateForm')">确 定</el-button>
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
                activeName: 'first',
                dialogVisible: false,
                addFormVisible:false,
                lines_index: "",
                currentPage:1,
                pageSize:10,
                line:"",
                form_index:'',
            }
        },
        computed:{
            tableData(){
                return this.$store.state.hostconf.tableData
            },
            dialogFormVisible:{
                get(){
                    return this.$store.state.hostconf.dialogFormVisible
                },
                set(value){
                    this.$store.commit('set_dialogFormVisible', value)
                }
            },
            form:{
                get(){
                    return this.$store.state.hostconf.form
                },
                set(value){
                    this.$store.commit('set_form', value)
                }
            },
            fullscreenLoading:{
                get(){
                    return this.$store.state.hostconf.fullscreenLoading
                },
                set(value){
                    this.$store.commit('set_fullscreenLoading', value)
                }
            }
        },
        created(){
            this.$store.dispatch('get_ip_list',{currentPage:this.currentPage,pageSize:this.pageSize});
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                console.log(`每页 ${val} 条`);
                this.$store.dispatch('get_ip_list',{currentPage:this.currentPage,pageSize:this.pageSize})
              },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.$store.dispatch('get_ip_list',{currentPage:this.currentPage,pageSize:this.pageSize})
              },
            handleClick(row) {
                this.dialogFormVisible = true;
                this.form = {...row.row};
                this.form_index = row.$index;
                console.log(this.form);
            },
            addinit(){
              this.form = { IP: '', PORT: "", Password: "", UserName: "",};
              this.addFormVisible = true
            },
            save_data(row){
                this.dialogVisible = true;
                this.line = row.row;
                this.lines_index = row.$index;
            },
            Delete(){
                // 删除时使用的方法
                this.dialogVisible = false;
                if (this.lines_index !== "") {
                    console.log(this.line,this.lines_index,"22222222222222222222");
                    this.$store.dispatch('delete',{"data":this.line,"index":this.lines_index});
                    this.$store.dispatch('get_ip_list',{currentPage:this.currentPage,pageSize:this.pageSize})
                } else {
                    console.log("数据获取失败")
                }
            },
            submitForm(formName) {
                // 修改信息时候提交的方法
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form);
                        this.$store.dispatch('get_ip_update',{form:this.form,index:this.form_index});
                        //this.form = { IP: '', PORT: "", Password: "", UserName: "",};
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addsubmitForm(formName) {
                //添加新host信息时的方法 这里添加完毕后需要重新请求一下host列表
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //this.addFormVisible = false;
                        console.log(this.form)
                        this.$store.dispatch('get_ip_add',this.form);
                        this.$store.dispatch('get_ip_list',{currentPage:this.currentPage,pageSize:this.pageSize});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
    }
</script>


<style scoped>
</style>
