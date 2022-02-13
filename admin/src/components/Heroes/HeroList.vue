<template>
    <div>
        <b>英雄列表</b>
        <el-table :data="heroes" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="250">
            </el-table-column>
            <el-table-column prop="name" label="英雄名称">
            </el-table-column>
            <el-table-column prop="title" label="英雄称号">
            </el-table-column>
            <el-table-column prop="icon" label="头像预览">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" style="height: 3rem;">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/heroes/edit/${scope.row._id}`)" type="primary" size="small">编辑
                    </el-button>
                    <el-button @click="remove(scope.row)" type="danger" size="small">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            heroes: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('/rest/heroes')
            this.heroes = res.data
        },
        remove(row) {
            this.$confirm(`确定要删除英雄"${row.name}"吗?`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
                const res = await this.$http.delete(`/rest/heroes/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                // 重新获取数据
                this.fetch()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            
        }
    },
    created() {
        this.fetch()
    }
}
</script>
<style scoped>

</style>