const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 英雄名
    name: {
        type: String
    },
    // 英雄头像
    avatar: {
        type: String
    },
    // 英雄称号
    title: {
        type: String
    },
    // 英雄类别
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    // 英雄评分
    scores: {
        // 难度、技能、攻击、生存
        difficult: {
            type: Number
        },
        skill: {
            type: Number
        },
        attack: {
            type: Number
        },
        survive: {
            type: Number
        }
    },
    // 英雄技能
    skills: [{
        // 技能图标、技能名称、技能描述
        icon: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        }
    }],
    // 出装
    items1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    items2: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 使用技巧
    usageTips: {
        type: String
    },
    // 对抗技巧
    battleTips: {
        type: String
    },
    // 英雄关系
    relations: {
        // 搭档、天敌
        partners: [{
            hero: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Hero'
            },
            description: {
                type: String
            }
        }],
        enermies: [{
            hero: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Hero'
            },
            description: {
                type: String
            }
        }],
    }
})

module.exports = mongoose.model('Hero', schema)