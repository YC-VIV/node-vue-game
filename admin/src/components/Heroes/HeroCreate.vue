<template>
    <div class="container">
        <b>{{id?'编辑':'新建'}}英雄</b>

        <el-form label-width='100px' @submit.native.prevent="save()">
            <el-tabs type="border-card">
                <el-tab-pane label="基本信息">
                    <el-form-item label='名称'>
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label='头像'>
                        <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false" :on-success="afterSuccess">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label='称号'>
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label='类型'>
                        <el-select v-model="model.categories" multiple placeholder="请选择">
                            <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='难度'>
                        <template>
                            <el-rate style="padding-top:0.6rem" v-model="model.scores.difficult" :max="10" show-score>
                            </el-rate>
                        </template>
                    </el-form-item>
                    <el-form-item label='技能'>
                        <template>
                            <el-rate style="padding-top:0.6rem" v-model="model.scores.skill" :max="10" show-score>
                            </el-rate>
                        </template>
                    </el-form-item>
                    <el-form-item label='攻击'>
                        <template>
                            <el-rate style="padding-top:0.6rem" v-model="model.scores.attack" :max="10" show-score>
                            </el-rate>
                        </template>
                    </el-form-item>
                    <el-form-item label='生存'>
                        <template>
                            <el-rate style="padding-top:0.6rem" v-model="model.scores.survive" :max="10" show-score>
                            </el-rate>
                        </template>
                    </el-form-item>
                    <el-form-item label='顺风出装'>
                        <el-select v-model="model.items1" multiple placeholder="请选择">
                            <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='逆风出装'>
                        <el-select v-model="model.items2" multiple placeholder="请选择">
                            <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='使用技巧'>
                        <el-input v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label='对抗技巧'>
                        <el-input v-model="model.battleTips"></el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="技能">
                    <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :span="12" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label="技能名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label='技能图标'>
                                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false" :on-success="(res)=>$set(item, 'icon' , res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="技能描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>

            </el-tabs>

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
            heroes: [],
            items: [],
            categories : [],
            model: {
                scores:{},
                items1:[],
                items2:[],
                skills:[]
            },
        }
    },
    methods: {
        async save() {
            let res
            if(this.id) {
                console.log(this.id);
                res = await this.$http.put(`/rest/heroes/${this.id}`,this.model)
            } else {
                res = await this.$http.post('/rest/heroes',this.model)
            }
            
            this.$router.push('/heroes/list')
            this.$message({
                type: 'success',
                message: '保存成功！'
            })
        },
        async getInfo() {
            console.log('getInfo');
            const res = await this.$http.get(`/rest/heroes/${this.id}`)
            // this.model = res.data
            // this.model = Object.assign( {} , this.model , res.data )
            this.model = {...this.model,...res.data}
        },
        async getCategories() {
            // console.log('我跑起来了');
            const res = await this.$http.get('/rest/categories')
            this.categories = res.data
        },
        async getItems() {
            const res = await this.$http.get('rest/items')
            this.items = res.data
        },
        async getHeroes() {
            const res = await this.$http.get('rest/heroes')
            this.heroes = res.data
        },
        // 英雄头像上传成功后将服务器解析的图片地址保存到前端，以便后续传入服务器
        afterSuccess(res) {
            this.$set(this.model, 'avatar' , res.url)
        },
    },
    created() {
        if(this.id) {
            this.getInfo()
        }
        this.getCategories()
        this.getItems()
        this.getHeroes()
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