<template>
    <div class="container">
        <b>{{id?'编辑':'新建'}}分类</b>
        <!-- @submit.native是使用原生html方法 -->
        <el-form label-width='100px' @submit.native.prevent="save()">
            <el-form-item label='上级分类'>
                <el-select v-model="model.parent">
                    <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item label='名称'>
                <el-input v-model="model.name"></el-input>
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
            // 保存需要新建的/选中的第一级分类
            model: {},
            // 保存全部第一级分类
            parents: []
        }
    },
    methods: {
        // 新建、修改分类
        // 修改分类用的是同一个函数，根据是否有id进行判断发送新建或者修改的请求
        async save() {
            let res
            if(this.id) {
                console.log(this.id);
                res = await this.$http.put(`/rest/categories/${this.id}`,this.model)
            } else {
                res = await this.$http.post('/rest/categories',this.model)
            }
            
            this.$router.push('/categories/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        // 查询id分类的详细信息
        async getName() {
            const res = await this.$http.get(`/rest/categories/${this.id}`)
            this.model = res.data
        },
        // 获取第一级分类
        async getParents() {
            const res = await this.$http.get('/rest/categories')
            this.parents = res.data
        }
    },
    created() {
        if(this.id) {
            this.getName()
        }
        this.getParents()
    }
}
</script>