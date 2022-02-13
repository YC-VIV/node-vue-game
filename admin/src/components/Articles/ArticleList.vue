<template>
    <div>
        <b>文章列表</b>
        <el-table :data="items" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="250">
            </el-table-column>
            <el-table-column prop="title" label="文章名">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/articles/edit/${scope.row._id}`)" type="primary" size="small">编辑
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
            items: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('/rest/articles')
            this.items = res.data
        },
        remove(row) {
            this.$confirm(`确定要删除文章"${row.title}"吗?`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
                const res = await this.$http.delete(`/rest/articles/${row._id}`)
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