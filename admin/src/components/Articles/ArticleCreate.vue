<template>
    <div class="container">
        <b>{{id?'编辑':'新建'}}文章</b>
        <el-form label-width='100px' @submit.native.prevent="save()">
            <el-form-item label='文章分类'>
                <el-select v-model="model.categories" multiple placeholder="请选择">
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='标题'>
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label='内容'>
                <template>
                    <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body">
                    </vue-editor>
                </template>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入富文本编辑器组件
import {
    VueEditor
} from "vue2-editor"

export default {
    components: {
        VueEditor
    },
    props: {
        id: {}
    },
    data() {
        return {
            // 保存需要新建的/选中的第一级文章
            model: {},
            // 保存全部分类
            categories: []
        }
    },
    methods: {
        async save() {
            let res
            if (this.id) {
                console.log(this.id);
                res = await this.$http.put(`/rest/articles/${this.id}`, this.model)
            } else {
                res = await this.$http.post('/rest/articles', this.model)
            }

            this.$router.push('/articles/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async getName() {
            const res = await this.$http.get(`/rest/articles/${this.id}`)
            this.model = res.data
        },
        // 获取分类
        async getCategories() {
            const res = await this.$http.get('/rest/categories')
            this.categories = res.data
        },
        // 富文本编辑器图片上传优化
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData()
            formData.append('file', file)
            let res = await this.$http.post('/upload', formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url)
            resetUploader()
        }
    },
    created() {
        if (this.id) {
            console.log(this.id);
            this.getName()
        }
        this.getCategories()
    }
}
</script>