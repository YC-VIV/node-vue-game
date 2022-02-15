<template>
    <div>
        <b>用户列表</b>
        <el-table :data="model" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="250">
            </el-table-column>
            <el-table-column prop="name" label="用户名">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="$router.push(`/users/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            model: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('/rest/users')
            this.model = res.data
        },
        async remove(id) {
            await this.$http.delete(`/rest/users/${id}`)
            this.fetch()
        }
    },
    created() {
        this.fetch()
    }
}
</script>
<style scoped>
</style>