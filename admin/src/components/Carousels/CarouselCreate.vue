<template>
    <div class="container">
        <b>{{id?'编辑':'新建'}}轮播图</b>

        <el-form label-width='100px' @submit.native.prevent="save()">

            <el-form-item label='名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="text" @click="model.adw.push({})"><i class="el-icon-plus"></i> 添加广告</el-button>
                <el-row type="flex" style="flex-wrap: wrap">
                    <el-col :span="12" v-for="(item,i) in model.adw" :key="i">
                        <el-form-item label="广告链接">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label='上传图片' style="margin-top: 1rem;">
                            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                                :show-file-list="false" :on-success="(res)=>$set(item, 'img' , res.url)">
                                <img v-if="item.img" :src="item.img" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="danger" style="margin-left: 50%;transform: translate-X(-50%);" @click="model.adw.splice(i,1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item>
                <el-button type='primary' style="margin-top: 20px" native-type='submit'>保存</el-button>
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
            model: {
                adw:[]
            },
        }
    },
    methods: {
        async save() {
            let res
            if(this.id) {
                console.log(this.id);
                res = await this.$http.put(`/rest/carousels/${this.id}`,this.model)
            } else {
                res = await this.$http.post('/rest/carousels',this.model)
            }
            
            this.$router.push('/carousels/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async getInfo() {
            console.log('getInfo');
            const res = await this.$http.get(`/rest/carousels/${this.id}`)
            this.model = {...this.model,...res.data}
        },
        afterSuccess(res) {
            this.$set(this.model, 'avatar' , res.url)
        },
    },
    created() {
        if(this.id) {
            this.getInfo()
        }
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
}

.avatar {
    width: 5rem;
    height: 5rem;
    display: block;
}
</style>