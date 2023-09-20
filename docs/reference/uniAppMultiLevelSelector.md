---
title: uniApp自定义多级联动选择器指南
sticky: 1
tags:
 - uniApp
 - 前端开发
categories:
 - 前端开发
date: 2023-09-20
hideComments: false
---

- **多端支持**：可以运行在H5、APP、微信小程序还是支付宝小程序，都可以轻松使用改组件。
- **自定义配置**：您可以根据需要配置选择器的级数，使其适应不同的数据结构和用例。
- **无限级联**：此组件支持无限级联选择，使您能够创建具有复杂数据结构的选择器。

| 参数  | 类型   | 描述                                                       | 默认值 | 必选 |
| ----- | ------ | ---------------------------------------------------------- | ------ | ---- |
| title | string | 标题                                                       | ''     | 否   |
| layer | number | 控制几级联动                                               | 1      | 否   |
| data  | array  | 数据：[{name: '', id: '', children: [{name: '', id: ''}]}] | []     | 否   |

![GIF 6-9-2023 上午 9-56-07](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202309060957542.gif)

接口返回数据结构：

```json
[
    {id: 47, name: "工厂1", parentId: 0, type: 0},
    {id: 48, name: "区域1", parentId: 47, type: 0},
    {id: 19, name: "设备1", parentId: 48, type: 1}
]
```

处理后数据结构：

```json
[{ 
    id: 47, name: "工厂1", parentId: 0, type: 0,
    children: [{ 
        id: 48, name: "区域1", parentId: 47, type: 0,
        children: [
            { id: 19, name: "设备1", parentId: 48, type: 1 }
        ] 
    }] 
}]
```

引用示例：

```vue
<template>
	<view class="container">
		<view @click="bindDevice">选择设备</view>
        <cascade-picker ref="picker" :title="cascadePicker.title" :layer="cascadePicker.layer" :data="cascadePicker.data" @callback="pickerCallback"></cascade-picker>
    </view>
</template>
<script>
import cascadePicker from '@/components/cascade-picker/cascade-picker.vue';
import {handleTree} from "@/utils/tree";
export default {
	components: {
    	cascadePicker
	},
    data() {
        return {
			deviceArr: [],
			deviceId: '',
            cascadePicker: {
                title: 'picker标题',
                layer: null,
                data: []
          }
		}
	},
	onLoad() {
        this.getDeviceSimpleList()
      },
	methods: {
		// 获取设备列表
        getDeviceSimpleList() {
          getDeviceSimpleList().then(res => {
            this.deviceArr = handleTree(res.data)
          })
        },
		// 打开设备选择器
        bindDevice() {
          const _this = this;
          _this.cascadePicker.data = _this.deviceArr;
          _this.$refs.picker.open().then(function() {
            console.log('打开成功');
          });
        },
        // picker多级联动回调
        pickerCallback(e) {
          const {data} = e;
          const lastItem = data[data.length - 1];
          this.deviceId = lastItem.id;
        }
    }
}
</script>
```

`@/utils/tree`文件中的`handleTree`方法

```javascript
/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id = 'id', parentId = 'parentId', children = 'children', rootId = 0) {
  rootId = rootId || Math.min.apply(Math, data.map(item => {
    return item[parentId]
  })) || 0
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  //循环所有项
  const treeData = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      //返回每一项的子级数组
      return father[id] === child[parentId]
    });
    branchArr.length > 0 ? father.children = branchArr : '';
    //返回第一层
    return father[parentId] === rootId;
  });
  return treeData !== '' ? treeData : data;
}
```

`cascade-picker`组件完整代码：

> 在`components`文件夹下创建`cascade-picker`文件夹，然后在此文件夹下创建`cascade-picker.vue` - 多级联动组件

```vue
<template name="cascade-picker">
  <view class="aui-picker" v-if="SHOW" :class="{'aui-picker-in': FADE==1,'aui-picker-out': FADE==0}">
    <view class="aui-mask" @click.stop="close"></view>
    <view class="aui-picker-main">
      <view class="aui-picker-header">
        <view class="aui-picker-header-icon" @click.stop="close">取消</view>
        <view class="aui-picker-title" v-if="title">{{ title }}</view>
        <view class="aui-picker-header-icon aui-picker-confirm" @click.stop="_confirm">确认</view>
      </view>
      <view class="aui-picker-nav">
        <view class="aui-picker-navitem"
              v-if="nav.length>0"
              v-for="(item, index) in nav"
              :key="index"
              :data-index="index"
              :class="[index==navCurrentIndex ? 'active' : '', 'aui-picker-navitem-'+index]"
              :style="{margin: nav.length>2 ? '0 10px 0 0' : '0 30px 0 0'}"
              @click.stop="_changeNav($event)"
        >{{ item.name }}
        </view>
        <view class="aui-picker-navitem"
              :key="nav.length"
              :data-index="nav.length"
              :class="[nav.length==navCurrentIndex ? 'active' : '', 'aui-picker-navitem-'+nav.length]"
              :style="{margin: nav.length>2 ? '0 10px 0 0' : '0 30px 0 0'}"
              @click.stop="_changeNav($event)">请选择
        </view>
        <view class="aui-picker-navborder" :style="{left: navBorderLeft+'px'}"></view>
      </view>
      <view class="aui-picker-content">
        <view class="aui-picker-lists">
          <view class="aui-picker-list"
                v-for="(list, index) in queryItems.length + 1"
                :key="index"
                :data-index="index"
                :class="[index==navCurrentIndex ? 'active' : '']"
          >
            <view class="aui-picker-list-warp" v-if="index == 0">
              <view class="aui-picker-item"
                    v-for="(item, key) in items"
                    v-if="item.pid=='0'"
                    :key="key"
                    :data-pindex="index"
                    :data-index="key"
                    :data-id="item.id"
                    :data-pid="item.pid"
                    :data-name="item.name"
                    :data-type="item.type"
                    :class="{'active': result.length>index && result[index].id==item.id}"
                    :style="{'background': touchConfig.index==key && touchConfig.pindex==index ? touchConfig.style.background : ''}"
                    @click.stop="_chooseItem($event)"
                    @touchstart="_btnTouchStart($event)"
                    @touchmove="_btnTouchEnd($event)"
                    @touchend="_btnTouchEnd($event)"
              >{{ item.name }}
              </view>
            </view>
            <view class="aui-picker-list-warp" v-else>
              <view class="aui-picker-item"
                    v-for="(item, key) in queryItems[index-1]"
                    :key="key"
                    :data-pindex="index"
                    :data-index="key"
                    :data-id="item.id"
                    :data-pid="item.pid"
                    :data-name="item.name"
                    :data-type="item.type"
                    :class="{'active': result.length>index && result[index].id==item.id}"
                    :style="{'background': touchConfig.index==key && touchConfig.pindex==index ? touchConfig.style.background : ''}"
                    @click.stop="_chooseItem($event)"
                    @touchstart="_btnTouchStart($event)"
                    @touchmove="_btnTouchEnd($event)"
                    @touchend="_btnTouchEnd($event)"
              >{{ item.name }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'cascade-picker',
  props: {
    title: { //标题
      type: String,
      default: ''
    },
    layer: { //控制几级联动,默认无限级(跟随数据有无下级)
      type: Number,
      default: null
    },
    data: { //数据 如：[{id: '', name: '', children: [{id: '', name: ''}]}]
      type: Array,
      default() {
        return [
          // [{id: '', name: '', children: [{id: '', name: ''}]}]
        ]
      }
    }
  },
  data() {
    return {
      SHOW: false,
      FADE: -1,
      nav: [],
      items: [], // 第一级数据列表
      queryItems: [], // 各级数据列表
      navCurrentIndex: 0, // 当前选中的导航项索引
      navBorderLeft: 35, // 导航栏的边框左侧位置
      result: [],
      touchConfig: {
        index: -1,
        pindex: -1,
        style: {
          color: '#214579',
          background: '#EFEFEF'
        }
      },
      selectedData: [] // 用于回显数据的属性
    }
  },
  watch: {
    data() {
      const _this = this;
      const data = _this.data;
      _this.items = _this._flatten(data, '0')
    }
  },
  methods: {
    // 打开
    open() {
      const _this = this;
      _this.reset(); //打开时重置picker
      return new Promise(function (resolve, reject) {
        _this.SHOW = true;
        _this.FADE = 1;
        resolve();
      });
    },
    // 关闭
    close() {
      const _this = this;
      return new Promise(function (resolve, reject) {
        _this.FADE = 0;
        const _hidetimer = setTimeout(() => {
          _this.SHOW = false;
          _this.FADE = -1;
          clearTimeout(_hidetimer);
          resolve();
        }, 100)
      });
    },
    //重置
    reset() {
      const _this = this;
      _this.queryItems = [];
      _this.nav = [];
      _this.navBorderLeft = 35;
      _this.navCurrentIndex = 0;
      _this.result = [];
    },
    //导航栏切换
    _changeNav(e) {
      const _this = this;
      const index = Number(e.currentTarget.dataset.index);
      _this.navCurrentIndex = index;
      const _el = uni.createSelectorQuery().in(this).select(".aui-picker-navitem-" + index);
      _el.boundingClientRect(data => {
        _this.navBorderLeft = data.left + 20;
      }).exec();
    },
    //数据选择
    _chooseItem(e) {
      const _this = this;
      const id = e.currentTarget.dataset.id;
      const name = e.currentTarget.dataset.name;
      const pid = e.currentTarget.dataset.pid;
      const type = e.currentTarget.dataset.type;
      const _arr = [];
      _this.result[_this.navCurrentIndex] = {id: id, name: name, pid: pid, type: type};
      if (
        (!_this._isDefine(_this.layer) && _this._isDefine(_this._deepQuery(_this.data, id).children))
        ||
        (_this.navCurrentIndex < (Number(_this.layer) - 1) && _this._isDefine(_this._deepQuery(_this.data, id).children))
      ) { //有下级数据
        _this._deepQuery(_this.data, id).children.forEach(function (item, index) {
          _arr.push({id: item.id, name: item.name, pid: id, type: item.type});
        });
        if (_this.navCurrentIndex == _this.queryItems.length) { //选择数据
          _this.queryItems.push(_arr);
          _this.nav.push({name: name});
        } else { //重新选择数据
          _this.queryItems.splice(_this.navCurrentIndex + 1, 1);
          _this.nav.splice(_this.navCurrentIndex + 1, 1);
          _this.queryItems.splice(_this.navCurrentIndex, 1, _arr);
          _this.nav.splice(_this.navCurrentIndex, 1, {name: name});
        }
        _this.navCurrentIndex = _this.navCurrentIndex + 1;
        const _el = uni.createSelectorQuery().in(this).select(".aui-picker-navitem-" + _this.navCurrentIndex);
        setTimeout(() => {
          _el.boundingClientRect(data => {
            _this.navBorderLeft = data.left + 20;
          }).exec();
        }, 100)
      } else { //无下级数据且最后一级数据的type为1时，则可以确认关闭
        _this._confirm();
      }
    },
    _confirm() {
      const _this = this;
      const lastItem = _this.result[_this.result.length - 1];
      if (lastItem && lastItem.type === 1) {
        _this.close().then(() => {
          _this.$emit("callback", {status: 0, data: _this.result});
        });
      } else {
        uni.$u.toast('请选择设备')
      }
    },
    //递归遍历——将树形结构数据转化为数组格式
    _flatten(tree, pid) {
      return tree.reduce((arr, {id, name, type, children = []}) =>
        arr.concat([{id, name, pid, type}], this._flatten(children, id)), [])
    },
    //根据id查询对应的数据(如查询id=10100对应的对象)
    _deepQuery(tree, id) {
      let isGet = false;
      let retNode = null;

      function deepSearch(tree, id) {
        for (let i = 0; i < tree.length; i++) {
          if (tree[i].children && tree[i].children.length > 0) {
            deepSearch(tree[i].children, id);
          }
          if (id === tree[i].id || isGet) {
            isGet || (retNode = tree[i]);
            isGet = true;
            break;
          }
        }
      }

      deepSearch(tree, id);
      return retNode;
    },
    /***判断字符串是否为空
     @param {string} str 变量
     @example: aui.isDefine("变量");
     */
    _isDefine(str) {
      if (str == null || str == "" || str == "undefined" || str == undefined || str == "null" || str == "(null)" || str == 'NULL' || typeof (str) == 'undefined') {
        return false;
      } else {
        str = str + "";
        str = str.replace(/\s/g, "");
        if (str == "") {
          return false;
        }
        return true;
      }
    },
    _btnTouchStart(e) {
      const _this = this,
        index = Number(e.currentTarget.dataset.index),
        pindex = Number(e.currentTarget.dataset.pindex);
      _this.touchConfig.index = index;
      _this.touchConfig.pindex = pindex;
    },
    _btnTouchEnd(e) {
      const _this = this,
        index = Number(e.currentTarget.dataset.index),
        pindex = Number(e.currentTarget.dataset.pindex);
      _this.touchConfig.index = -1;
      _this.touchConfig.pindex = -1;
    },
  }
}
</script>

<style lang="scss" scoped>
/* ====================
  多级联动弹窗
 =====================*/
.aui-picker {
  width: 100vw;
  height: 100vh;
  //opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  /* display: none; */
}

// 遮罩层
.aui-mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}

.aui-picker.aui-picker-in {
  -moz-animation: aui-fade-in .1s ease-out forwards;
  -ms-animation: aui-fade-in .1s ease-out forwards;
  -webkit-animation: aui-fade-in .1s ease-out forwards;
  animation: aui-fade-in .1s ease-out forwards;
}

.aui-picker.aui-picker-out {
  -moz-animation: aui-fade-out .1s ease-out forwards;
  -ms-animation: aui-fade-out .1s ease-out forwards;
  -webkit-animation: aui-fade-out .1s ease-out forwards;
  animation: aui-fade-out .1s ease-out forwards;
}

.aui-picker-main {
  width: 100vw;
  height: 50vh;
  background: #FFF;
  //border-radius: 15px 15px 0 0;
  position: absolute;
  left: 0px;
  bottom: 0;
  z-index: 999;
}

.aui-picker.aui-picker-in .aui-picker-main {
  -moz-animation: aui-slide-up-screen .2s ease-out forwards;
  -ms-animation: aui-slide-up-screen .2s ease-out forwards;
  -webkit-animation: aui-slide-up-screen .2s ease-out forwards;
  animation: aui-slide-up-screen .2s ease-out forwards;
}

.aui-picker.aui-picker-out .aui-picker-main {
  -moz-animation: aui-slide-down-screen .2s ease-out forwards;
  -ms-animation: aui-slide-down-screen .2s ease-out forwards;
  -webkit-animation: aui-slide-down-screen .2s ease-out forwards;
  animation: aui-slide-down-screen .2s ease-out forwards;
}

.aui-picker-header {
  width: 100%;
  min-height: 50px;
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-icon {
    font-size: 15px;
    color: #aaa;
    padding: 0 15px;
  }

  .aui-picker-confirm {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 15px;
    color: $custom-content-color;
    padding: 0 15px;
  }
}

.aui-picker-header::after {
  content: '';
  width: 100%;
  height: 1px;
  background: rgba(100, 100, 100, .3);
  -moz-transform: scaleY(.3);
  -ms-transform: scaleY(.3);
  -webkit-transform: scaleY(.3);
  transform: scaleY(.3);
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 999;
}

.aui-picker-title {
  line-height: 20px;
  text-align: center;
  font-size: 17px;
  color: #333;
  padding: 15px;
  box-sizing: border-box;
  position: absolute;
  left: 50px;
  right: 50px;
  top: 0;
}

.aui-picker-content {
  width: 100%;
  height: -webkit-calc(100% - 100px);
  height: calc(100% - 100px);
}

.aui-picker-nav {
  width: 100%;
  height: 50px;
  text-align: left;
  padding: 0 15px;
  margin: 0 0 1px 0;
  justify-content: flex-start;
  white-space: nowrap;
  box-sizing: border-box;
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
}

.aui-picker-nav::after {
  content: '';
  width: 100%;
  height: 1px;
  background: rgba(100, 100, 100, .3);
  -moz-transform: scaleY(.3);
  -ms-transform: scaleY(.3);
  -webkit-transform: scaleY(.3);
  transform: scaleY(.3);
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 999;
}

.aui-picker-navitem {
  width: 80px;
  line-height: 50px;
  font-size: 16px;
  margin: 0 30px 0 0;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.aui-picker-navitem.active {
  color: $custom-content-color;
}

.aui-picker-navborder {
  width: 40px;
  height: 3px;
  background: $custom-content-color;
  border-radius: 5px;
  transition: left .15s;
  position: absolute;
  left: 40px;
  bottom: 0;
}

.aui-picker-lists {
  width: 100%;
  height: 100%;
  justify-content: space-around;
  white-space: nowrap;
}

.aui-picker-list {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  display: none;
  vertical-align: top;
}

.aui-picker-list.active {
  display: inline-block;
}

.aui-picker-list-warp {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 15px 0;
  display: inline-block;
}

.aui-picker-item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 15px;
  color: #333;
  position: relative;
}

.aui-picker-item.active {
  color: $custom-content-color;
}

.aui-picker-item.active::after {
  content: '✔';
  font-size: 15px;
  color: $custom-content-color;
  position: absolute;
  top: 0px;
  right: 10px;
}

</style>
```

#### 总结

自定义多级联动选择器组件将有助于您在`uni-app`中创建灵活的选择器，以满足各种不同平台和级数的需求。如果有任何问题、反馈或需要进一步的帮助，请不要犹豫，在下面的评论中提出。期待听到您的声音，以便改进和完善这个组件。