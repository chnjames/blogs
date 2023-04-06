# Vue
## 谈谈你对MVVM的理解

`MVVM`是`Model-View-ViewModel`的缩写，它是一种基于前端开发的架构模式。由`Model`、`View`、`ViewModel`三部分组成。其核心的提供对`View`和`ViewModel`的双向数据绑定，这使得`ViewModel`的状态改变可以自动传递给`View`，即所谓的数据双向绑定。`ViewModel`是核心，负责连接`View`和`Model`，保证视图和数据一致性，这种轻量级的架构让前端开发更加高效、便捷。

- `Model`代表数据模型，也可以在`Model`中定义数据修改和业务逻辑；
- `View`代表 UI 组件，他负责将数据模型转化成 UI 展现出来；
- `ViewModel`是一个同步`View`和`Model`的对象。

`Vue.js`是`MVVM`架构的最佳实践，但并没有完全遵循`MVVM`，专注于`MVVM`中的`ViewModel`，不仅做到了数据双向绑定，而且还是较轻量级的JS库。

## Vue双向绑定原理

Vue数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。

![image-20220622142138245](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202206221421927.png)

`Observer`：数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用`Object.defineProperty`的`getter`和`setter`来实现。

`Compile`：指令解析器，他的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。

`Watcher`：订阅者，作为连接`Observer`和`Compile`的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

`Dep`：消息订阅器，内部维护了一个数组，用来收集订阅者（`Watcher`），数据变动触发`notify`函数，再调用订阅者的`update`方法。

从图中可以看出，**当执行 new Vue() 时，Vue 就进入了初始化阶段，一方面 Vue 会遍历 data 选项中的属性，并用 Object.defineProperty 将它们转为 getter / setter，实现数据变化监听功能；另一方面，Vue 的指令编译器 Compile 对元素节点的指令进行扫描和解析，初始化视图，并订阅 Watcher 来更新视图，此时 Watcher 会将自己添加到消息订阅器中（Dep），初始化完毕。 **

**当数据发生变化时，Observer 中的 setter 方法被触发，setter 会立即调用 Dep.notify()，Dep开始遍历所有的订阅者，并调用订阅者的 update 方法，订阅者收到通知后对视图进行相应的更新。**

## `package.json`与`package-lock.json`的关系

> `pageage.json`用来描述项目及项目所依赖的模块信息。

### 语义版本控制

版本号：

组成：`major.minor.patch`，即主版本号.次版本号.修补版本号。

### 安装依赖包的版本

安装依赖包的时候，版本号前面都会带有`^`或`~`的符号：

`~`会匹配最近的小版本依赖包，比如`~1.2.3`会匹配所有`1.2.x`版本，但是不包括`1.3.0`

`^`会匹配最新的大版本依赖包，比如`^1.2.3`会匹配所有`1.x.x`的包，包括`1.3.0`，但是不包括`2.0.0`

`*`安装最新版本的依赖包，比如`*1.2.3`会匹配`x.x.x`



## `Element`动态表单验证（多层嵌套）

### 效果图：

![image-20230225142826140](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202302251428782.png)

### 实现代码：

```vue
<template>
    <el-form class="form" ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="设备名称" prop="equipmentName">
              <el-select v-model="form.equipmentName" placeholder="请选择设备名称" clearable style="width: 100%">
                <el-option v-for="(item, index) in menuOptions" :key="index" :label="item.name" :value="item.name"/>
              </el-select>
            </el-form-item>
            <el-form-item label="模板类型" prop="templateType">
              <el-select v-model="form.templateType" placeholder="请选择模板类型" clearable style="width: 100%">
                <el-option v-for="(item, index) in menuOptions" :key="index" :label="item.name" :value="item.name"/>
              </el-select>
            </el-form-item>
            <el-card shadow="never" v-for="(item, index) in form.partsList" :key="index">
              <el-row :gutter="10" type="flex" justify="space-between">
                <el-col :span="23">
                  <el-form-item label="设备部位" :prop="'partsList.'+ index + '.location'" :rules="partsListRules.location">
                    <el-input v-model="item.location" placeholder="请输入设备部位"/>
                  </el-form-item>
                  <el-form-item label="部位图片" :prop="'partsList.' + index + '.image'" :rules="partsListRules.image">
                    <imageUpload v-model="item.image" :limit="1" :is-show-tip="false"/>
                  </el-form-item>
                  <el-card shadow="never" v-for="(task, idx) in item.taskList" :key="idx">
                    <el-row :gutter="10" type="flex" justify="space-between">
                      <el-col :span="23">
                        <el-form-item label="任务名称" :prop="'partsList.' + index + '.taskList.' + idx + '.taskName'" :rules="taskListRules.taskName">
                          <el-input v-model="task.taskName" placeholder="请输入任务名称"/>
                        </el-form-item>
                        <el-form-item label="执行结果" required>
                          <el-row :gutter="20" type="flex" justify="space-between">
                            <el-col :span="8">
                              <el-form-item :prop="'partsList.' + index + '.taskList.' + idx + '.outcome'" :rules="taskListRules.outcome">
                                <el-select v-model="task.outcome" style="width: 100%" placeholder="请选择执行结果" clearable>
                                  <el-option v-for="(item, index) in menuOptions" :key="index" :label="item.name" :value="item.name"/>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item :prop="'partsList.' + index + '.taskList.' + idx + '.termOne'" :rules="taskListRules.termOne">
                                <el-select v-model="task.termOne" style="width: 100%" placeholder="请选择" clearable>
                                  <el-option v-for="(item, index) in menuOptions" :key="index" :label="item.name" :value="item.name"/>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item :prop="'partsList.' + index + '.taskList.' + idx + '.valueOne'" :rules="taskListRules.valueOne">
                                <el-input v-model="task.valueOne" placeholder="数值"/>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item :prop="'partsList.' + index + '.taskList.' + idx + '.termTwo'" :rules="taskListRules.termTwo">
                                <el-select v-model="task.termTwo" style="width: 100%" placeholder="请选择" clearable>
                                  <el-option v-for="(item, index) in menuOptions" :key="index" :label="item.name" :value="item.name"/>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-form-item :prop="'partsList.' + index + '.taskList.' + idx + '.valueTwo'" :rules="taskListRules.valueTwo">
                                <el-input v-model="task.valueTwo" placeholder="数值"/>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-form-item>
                        <el-row :gutter="20">
                          <el-col :span="12">
                            <el-form-item label="选择备件" :prop="'partsList.' + index + '.taskList.' + idx + '.spare'" :rules="taskListRules.spare">
                              <el-select v-model="task.spare" style="width: 100%" placeholder="请选择" clearable>
                                <el-option v-for="(item, index) in menuOptions" :key="index" :label="item.name" :value="item.name"/>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="备件数量" :prop="'partsList.' + index + '.taskList.' + idx + '.quantity'" :rules="taskListRules.quantity">
                              <el-input-number v-model="task.quantity" :min="0" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                      <i class="inter el-icon-delete"  v-if="item.taskList.length > 1" @click="deleteInterItems(task, idx)"></i>
                    </el-row>
                  </el-card>
                  <el-button type="primary" icon="el-icon-plus" @click="addInterItems(item, index)" plain style="margin-top: 10px;width: 100%">添加任务项</el-button>
                </el-col>
                <i class="outer el-icon-delete" v-if="form.partsList.length > 1" @click="deleteOuterItems(item, index)"></i>
              </el-row>
            </el-card>
            <!--添加外层内容-->
            <el-button type="primary" plain icon="el-icon-plus" @click="addOuterItems" style="margin-top: 10px;width: 100%">添加部位 & 任务项</el-button>
          </el-form>
</template>
<script>
export default {
  name: 'Template',
  components: {
    ImageUpload
  },
  data() {
    return {
      // 表单参数
      form: {
        equipmentName: undefined, // 设备名称
        templateType: undefined, // 模板类型
        partsList: [
          {
            location: undefined, // 设备部位
            image: undefined, // 图片
            taskList: [
              {
                taskName: undefined, // 任务名称
                outcome: undefined, // 执行结果
                termOne: undefined, // 条件1
                valueOne: undefined, // 条件1的值
                termTwo: undefined, // 条件2
                valueTwo: undefined, // 条件2的值
                spare: undefined, // 备件
                previous: undefined, // 前值
                after: undefined, // 后值
                quantity: 0 // 备件数量
              }
            ]
          }
        ]
      },
      // 表单校验
      rules: {
        equipmentName: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' },
          { max: 30, message: '设备名称不能超过30个字', trigger: 'blur' }
        ],
        templateType: [
          { required: true, message: '模板类型不能为空', trigger: 'blur' },
          { max: 30, message: '模板类型不能超过30个字', trigger: 'blur' }
        ]
      },
      partsListRules: {
        location: [
          { required: true, message: '设备部位不能为空', trigger: 'blur' },
          { max: 30, message: '设备部位不能超过30个字', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '图片不能为空', trigger: 'blur' }
        ]
      },
      taskListRules: {
        taskName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' },
          { max: 30, message: '任务名称不能超过30个字', trigger: 'blur' }
        ],
        outcome: [
          { required: true, message: '执行结果不能为空', trigger: 'blur' },
          { max: 30, message: '执行结果不能超过30个字', trigger: 'blur' }
        ],
        termOne: [
          { required: true, message: '条件1不能为空', trigger: 'blur' },
          { max: 30, message: '条件1不能超过30个字', trigger: 'blur' }
        ],
        valueOne: [
          { required: true, message: '条件1的值不能为空', trigger: 'blur' },
          { max: 30, message: '条件1的值不能超过30个字', trigger: 'blur' }
        ],
        termTwo: [
          { required: true, message: '条件2不能为空', trigger: 'blur' },
          { max: 30, message: '条件2不能超过30个字', trigger: 'blur' }
        ],
        valueTwo: [
          { required: true, message: '条件2的值不能为空', trigger: 'blur' },
          { max: 30, message: '条件2的值不能超过30个字', trigger: 'blur' }
        ],
        spare: [
          { required: true, message: '备件不能为空', trigger: 'blur' },
          { max: 30, message: '备件不能超过30个字', trigger: 'blur' }
        ],
        previous: [
          { required: true, message: '前值不能为空', trigger: 'blur' },
          { max: 30, message: '前值不能超过30个字', trigger: 'blur' }
        ],
        after: [
          { required: true, message: '后值不能为空', trigger: 'blur' },
          { max: 30, message: '后值不能超过30个字', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '备件数量不能为空', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
      /** 添加任务项操作 */
    addInterItems(item, index) {
      console.log(item, index)
      item.taskList.push({
        taskName: undefined, // 任务名称
        outcome: undefined, // 执行结果
        termOne: undefined, // 条件1
        valueOne: undefined, // 条件1的值
        termTwo: undefined, // 条件2
        valueTwo: undefined, // 条件2的值
        spare: undefined, // 备件
        previous: undefined, // 前值
        after: undefined, // 后值
        quantity: 0 // 备件数量
      })
    },
    /** 删除任务项操作 */
    deleteInterItems(task, idx) {
      console.log(task, idx)
      this.form.partsList[idx].taskList.splice(task, 1)
    },
    /** 添加部位&任务项操作 */
    addOuterItems() {
      this.form.partsList.push({
        location: undefined,
        image: undefined,
        taskList: [
          {
            taskName: undefined, // 任务名称
            outcome: undefined, // 执行结果
            termOne: undefined, // 条件1
            valueOne: undefined, // 条件1的值
            termTwo: undefined, // 条件2
            valueTwo: undefined, // 条件2的值
            spare: undefined, // 备件
            previous: undefined, // 前值
            after: undefined, // 后值
            quantity: 0 // 备件数量
          }
        ]
      })
    },
    /** 删除部位&任务项操作 */
    deleteOuterItems(item, index) {
      console.log(item, index)
      this.form.partsList.splice(index, 1)
    },
  }
}
</script>
```
