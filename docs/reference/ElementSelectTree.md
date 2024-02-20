---
title: 利用 el-select 和 el-tree 实现树形结构多选框联动功能
date: 2024-02-20
hideComments: false
tags:
 - Element
 - 前端开发
categories:
 - 前端开发
publish: true
---
用 `ElementUI` 中的 `el-select`下拉选择器 和 `el-tree`树形控件来实现一个强大的联动功能，包括多选、删除、搜索、清空选项等功能。

效果图：

![Snipaste_2024-02-19_11-38-34](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202402200928696.png)

![GIF 19-2-2024 上午 11-39-08](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202402200928964.gif)

代码实现：

`HTML`部分：

```vue
<template>
  <div class="container">
    <el-select size="small" v-model="selectTreeArr" placeholder="请选择" :popper-append-to-body="false" multiple clearable collapse-tags
      @remove-tag="removeTag" @clear="clearAll">
      <el-option :value="selectTreeValue" class="setstyle" disabled>
        <el-input class="setinput" size="mini" placeholder="输入关键字进行过滤" clearable v-model="filterText"></el-input>
        <el-tree :data="treeData" default-expand-all show-checkbox node-key="id" ref="treeRef" highlight-current
          :filter-node-method="filterNode" :props="defaultProps" @check-change="handleCheckChange"></el-tree>
      </el-option>
    </el-select>
  </div>
</template>
```

`JavaScript`部分：

```vue
<script>
export default {
  name: 'selectTree',
  data() {
    return {
      selectTreeArr: [],
      selectTreeValue: [],
      filterText: '',
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 5,
              label: '一级 1-1'
            }
          ]
        },
        {
          id: 2,
          label: '二级 2',
          children: [
            {
              id: 6,
              label: '二级 2-1'
            },
            {
              id: 7,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '三级 3',
          children: [
            {
              id: 8,
              label: '三级 3-1'
            },
            {
              id: 9,
              label: '三级 3-2',
              children: [
                {
                  id: 91,
                  label: '三级 3-2-1'
                },
                {
                  id: 92,
                  label: '三级 3-2-2'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          label: '四级 1',
          children: []
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.treeRef.filter(val)
    }
  },
  methods: {
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 移除Tag
    removeTag() {
      this.selectTreeValue.splice(0, 1)
      let setList = this.$refs.treeRef.getCheckedNodes()
      setList.splice(0, 1)
      this.$nextTick(() => {
        this.$refs.treeRef.setCheckedNodes(setList)
      })
    },
    // 全部删除
    clearAll() {
      this.selectTreeValue = []
      this.selectTreeArr = []
      this.$nextTick(() => {
        this.$refs.treeRef.setCheckedNodes([])
      })
    },
    handleCheckChange() {
      // getCheckedNodes方法接收两个 boolean 类型的参数: 1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
      let dataList = this.$refs.treeRef.getCheckedNodes(true)
      this.selectTreeValue = []
      this.selectTreeArr = []
      dataList.forEach((item) => {
        this.selectTreeValue.push({ id: item.id, label: item.label })
        this.selectTreeArr.push(item.label)
      })
    }
  }
}
</script>
```

`CSS`部分：

```vue
<style lang="scss" scoped>
.container {
  padding: 20px;
}

.setstyle {
  height: auto;
  padding: 0 !important;
  .setinput {
    padding: 6px;
  }
}
</style>
```