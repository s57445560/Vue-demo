<template>

    <el-container>
        <el-header style="background-color: #409EFF;">
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <Aside></Aside>
            </el-aside>

            <el-main style="background-color: #F2F6FC;position: absolute;top:60px;bottom: 0;left: 201px;right: 0px;">
                <router-view/>
            </el-main>

        </el-container>

    </el-container>


</template>

<script>
    import Header from '@/components/Header'
    import Aside from '@/components/Aside'
    export default {
        name: 'home',
        data () {
            return {

            }
        },
        methods: {

        },
        components: {
            Header,
            Aside
        }
    }
</script>


<style scoped>
    .app-container .app-body {
        background: #ECF0F5;
        padding: 0;
    }
</style>
