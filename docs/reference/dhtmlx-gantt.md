---
hideComments: false
---
# 在Vue中使用`dhtmlx-gantt`

## 安装

```bash
npm install dhtmlx-gantt
```

## 模块导入

```javascript
import gantt from "dhtmlx-gantt"; // 引入模块
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";    //引入甘特图样式
```

## 使用

```vue
<!--HTML-->
<template>
  <div class="gunter">
    <div ref="gantt" class="gunter-content" />
  </div>
</template>
<script>
import gantt from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import { parseTime } from '@/utils' // 引入自定义时间格式化方法

export default {
  name: 'GanttTask',
  data() {
    return {
      // 甘特图配置
      tasks: {
        data: [
          {
            id: 11, // 任务标识
            text: '任务1', // 文本，任务的显示文字
            start_date: '18-04-2018', // 开始时间
            end_date: '19-04-2018', // 结束时间
            type: gantt.config.types.task, // 任务类型，有三种，object，task，milestone
            progress: 1 // 项目的进度，用颜色深浅显示
          }, {
            id: 12,
            text: '任务2',
            type: gantt.config.types.task,
            start_date: '19-04-2018',
            end_date: '22-04-2018',
            progress: 0.6
          }, {
            id: 13,
            text: '任务3',
            start_date: '22-04-2018',
            end_date: '30-04-2018',
            type: gantt.config.types.task,
            progress: 0
          }, {
            id: 14,
            text: '任务4',
            type: gantt.config.types.task,
            start_date: '25-04-2018',
            end_date: '28-04-2018',
            progress: 0.8
          }, {
            id: 15,
            text: '任务5',
            type: gantt.config.types.task,
            start_date: '29-04-2018',
            end_date: '02-05-2018',
            progress: 0.2
          }, {
            id: 16,
            text: '任务6',
            start_date: '02-05-2018', // 开始时间
            end_date: '03-05-2018', // 结束时间
            type: gantt.config.types.task,
            progress: 0
          }, {
            id: 17,
            text: '任务7',
            start_date: '02-05-2023', // 开始时间
            end_date: '03-05-2023', // 结束时间
            type: gantt.config.types.task,
            progress: 0
          }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      // 自动延长时间刻度
      gantt.config.fit_tasks = true
      // 允许拖放
      gantt.config.drag_project = true
      //甘特图右侧表头的高度
      gantt.config.scale_height = 80
      // 甘特图的行高
      gantt.config.row_height = 60
      //task高度
      gantt.config.bar_height = 40
      // 设置滚动条宽/高度
      // gantt.config.scroll_size = 10
      //使用中文
      gantt.i18n.setLocale('cn')
      //自适应甘特图的尺寸大小, 使得在不出现滚动条的情况下, 显示全部任务
      gantt.config.autosize = true
      //只读模式
      gantt.config.readonly = true
      //是否显示左侧树表格
      gantt.config.show_grid = true
      // 拖拽调整行高
      gantt.config.resize_rows = false
      // 调整网格宽
      gantt.config.grid_resize = true
      // 调整网格内列宽
      gantt.config.grid_elastic_columns = true
      //时间轴图表中，如果不设置，只有行边框，区分上下的任务，设置之后带有列的边框，整个时间轴变成格子状
      gantt.config.show_task_cells = false
      // 是否显示错误
      gantt.config.show_errors = false
      // 表头可排序
      // gantt.config.sort = true
      // 任务条上弹出提示框
      gantt.plugins({
        tooltip: true
      })
      // 自定义提示框的内容
      gantt.templates.tooltip_text = function(start, end, task) {
        return `<div>
          <div>任务：${task.text}</div>
          <div>开始时间：${parseTime(task.start_date, '{y}-{m}-{d}')}</div>
          <div>结束时间：${parseTime(task.end_date, '{y}-{m}-{d}')}</div>
          <div>进度：${task.progress * 100}%</div>
        </div>`
      }
      // 时间线任务条样式自定义
      gantt.templates.task_class = function(start, end, task) {
        // task.state值为default/unfinished/finished/canceled其中一种
        console.log(task.type, task.colorType, task.status, task.parent)
        return `gantt_${task.type}`
      }
      // 日期网格配置
      gantt.templates.date_grid = function(date, task, column) {
        console.log('日期网格', date, task, column)
        if (task && gantt.isUnscheduled(task) && gantt.config.show_unscheduled) {
          return gantt.templates.task_unscheduled_time(task)
        } else {
          return gantt.templates.grid_date_format(date)
        }
      }

      // 突出周末颜色
      gantt.templates.timeline_cell_class = function(item, date) {
        console.log(item, date)
        if (date.getDay() === 0 || date.getDay() === 6) {
          return 'weekend'
        }
      }
      // 配置任务内部显示元素
      gantt.templates.task_text = function(start, end, task) {
        return `${task.text}`
      }
      // 控制网格区域的样式（类名）
      // gantt.templates.grid_row_class = function (start, end, task) {
      //   console.log("网格class", start, end, task);
      // };
      // 定义时间格式
      gantt.config.scales = [
        { unit: 'month', step: 1, date: '%F, %Y' },
        { unit: 'day', step: 1, date: '%j, %D' }
      ]
      //表格列设置
      gantt.config.columns = [
        { name: 'text', label: '任务内容', width: '120', align: 'center' }
      ]
      // 添加弹窗属性
      gantt.config.lightbox.sections = [
        {
          name: 'description',
          height: 70,
          map_to: 'text',
          type: 'textarea',
          focus: true
        },
        { name: 'type', type: 'typeselect', map_to: 'type' },
        { name: 'time', type: 'duration', map_to: 'auto' }
      ]
      // 初始化
      gantt.init(this.$refs.gantt)
      // 数据解析
      gantt.parse(this.tasks)
    }
  }
}
</script>

<style lang="scss">
.gantt_task {
  border: none;
  background: #79bbff;
}
.gantt_task_row.gantt_selected {
  background: #f0f3f9;
}
.gantt_grid_data .gantt_row.gantt_selected {
  background: #f0f3f9;
}
.gantt_grid_data .gantt_row.odd.gantt_selected {
  background: #f0f3f9;
}
.gantt_grid_data .gantt_row.odd:hover, .gantt_grid_data .gantt_row:hover {
  background: #f0f3f9;
}
.gantt_task .gantt_task_progress {
  background: #53a8ff;
}
.gantt_task.gantt_selected {
  background: #53a8ff;
}
</style>

```

## 效果图

![image-20230106093426490](https://raw.githubusercontent.com/chnjames/cloudImg/main/blog/202301060948702.png)