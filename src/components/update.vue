<template>
    <div>
        <div class="panel panel-default" style="padding: 0;">
            <div class="panel-heading">
                <el-row>
                    <el-col :span="20">
                        <i class="el-icon-bell"></i> 开始升级
                    </el-col>
                </el-row>
            </div>
            <div class="panel-body" style="min-height: 500px;">
                <transition enter-active-class="animated bounceInRight">
                    <el-row v-show="!change">
                        <Upgrade :select="select" :change.sync="change"></Upgrade>
                    </el-row>
                </transition>
                <transition enter-active-class="animated bounceInDown" >
                    <el-row v-show="change">
                    <el-col :span="5">
                        <div class="panel panel-default" style="padding: 0;" v-loading="loading">
                            <div class="panel-heading" style="background-color: #409EFF">
                                <el-row>
                                    <el-col style="color: white">
                                        所有应用列表
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="panel-body test-1" style="min-height: 500px;max-height:500px;overflow-y :auto">
                                <el-tree
                                        empty-text="暂无数据列表"
                                      :data="get_all_app"
                                      node-key="id"
                                      default-expand-all>
                                </el-tree>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="19" style="padding-left: 10px;">
                        <div class="panel panel-default" style="padding: 0;">
                            <div class="panel-heading" style="background-color: #409EFF">
                                <el-row>
                                    <el-col :span="20" style="color: white">
                                        可升级的程序选择
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="panel-body" style="min-height: 500px;">
                                  <div style="text-align: center;margin-top: 30px;" class="row">
                                    <el-transfer
                                      style="text-align: left; display: inline-block;"
                                      v-model="select"
                                      :titles="['待选升级应用', '已选升级应用']"
                                      :button-texts="['放弃升级', '准备升级']"
                                      :format="{
                                        noChecked: '${total}',
                                        hasChecked: '${checked}/${total}'
                                      }"
                                      :data="get_update_list">
                                    </el-transfer>
                                      <div class="row" style="margin-top: 2px">
                                      <el-button slot="left-footer" size="mini"  type="success"
                                                 @click="reget_update_list"
                                                 style="margin-right: 76px;width: 198px" >
                                          获取待升级列表
                                      </el-button>
                                      <el-button slot="right-footer" size="mini" type="success"
                                                 @click="start_update"
                                                 style="margin-left: 76px;width: 198px" >
                                          准备开始升级
                                      </el-button>
                                          </div>
                                  </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import ElCol from "element-ui/packages/col/src/col";
    import ElRow from "element-ui/packages/row/src/row";
    import Upgrade from '@/components/upgrade'
    export default {
        components: {
            ElRow,
            ElCol,
            Upgrade},

        name: 'el-update',
        data () {
            return {
                select:[],
                change:true
            }
        },
        methods:{
            reget_update_list(){
                this.select = [];
                this.$store.dispatch('get_update_list')
            },
            start_update(){
                if(this.select == ''){
                    this.$message.error('没有选择需要升级的应用');
                }else{
                    console.log(this.select.join(','));
                    this.change = false;
                }
            }
        },
        computed:{
            get_all_app(){
                return this.$store.state.update.all_app
            },
            get_update_list(){
                return this.$store.state.update.update_list
            },
            loading(){
                return this.$store.state.update.loading
            },
        },
        created(){
            this.$store.dispatch('get_app_list');
            this.$store.dispatch('get_help_message');
            this.$store.dispatch('get_update_list')
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
