<template>
    <div class="container">
        <b>{{id?'编辑':'新建'}}账号</b>
        <el-form label-width='100px' @submit.native.prevent="save()">
            <el-form-item label='账号名'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label='密码'>
                <el-input  v-model="model.password" :disabled="id"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: {}
    },
    data() {
        return {
            model: {}
        }
    },
    methods: {
        async save() {
            let res
            if(this.id) {
                console.log(this.id);
                res = await this.$http.put(`/rest/users/${this.id}`,this.model)
            } else {
                res = await this.$http.post('/rest/users',this.model)
            }
            
            this.$router.push('/users/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async getInfo() {
            const res = await this.$http.get(`/rest/users/${this.id}`)
            this.model = res.data
            this.model.password = '******'
        }
    },
    created() {
        if(this.id) {
            this.getInfo()
        }
    }
}
</script>