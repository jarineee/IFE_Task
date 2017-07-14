# 响应式网格（栅格化）布局
## 媒体设备及尺寸筛选
### link的media属性
- 可以通过这个属性监测媒体设备。
- media 的值可以是screen、phone、print等设备类型，并且可以用and(width/min-width/max-width: 000px)对媒体设备屏幕大小进行要求。
- 例：<link rel="stylesheet" media="screen and (max-width:768px) " href="./style.css"> 表示在媒体类型为屏幕且宽度小于768像素是调用这份样式表。

### css内部声明@media
-  @media 命令，在样式表内部写入@midia 设备类型 and （尺寸要求），在花括号内直接写入选择器及其相关属性样式。
- 例：@media screen and (min-width:768px) {选择器 {属性：值；}}。

### css内部插入其他样式表@import
- @import 命令，@import url('要插入的样式表路径') 适用媒体类型尺寸
- 例：@import url('./style/style.css') screen;
- 注意，@import 命令需要写在样式表的顶部，url的路径是以 当前样式表 为参照的相对路径。

### 推荐使用第一种和最后一种

## 思路
### 盒子的宽度用百分比设置，栅栏一个12格，col-lg-1 的宽为父盒子的1/12，col-lg-2为2/12，以此类推……给同一个盒子加2个不同的类（col-md-n和col-lg-n），这两个类作用条件根据@media的设置。
### 至少需要使用3个嵌套盒子
- 盒子并列显示用的是float属性（用inline-block会有间隔，导致宽度百分比出错），因为是脱离了文档流，所以最外层需要一个容器去清除浮动（伪元素after）
- 重点是第二层盒子，用于划分宽度，和制造间隔（单个盒子无法设定间隔，间隔设定必须是margin，用padding的话填充背景不会留白，但是用margin设置间隔会导致行宽度不足，所以无法使用单盒子），设置padding为10px，相当于一个遮罩。为了是宽度百分比不增加，设置box-sizing：border-box。
- 第三层盒子是内容盒子，这个盒子才是灰色背景本体，因为第二层盒子有个padding值，所以它自带10像素的间隔
- 然而就算第二层盒子设置了padding：10px，最外边的间距还是不足（最左最右最上最下间距只有10px），为了补足间距，第一层的容器盒子需要设定padding：10px，这样最里面的盒子之间的间距就满足条件了（上下左右都是20px）。
### 参考：http://j4n.co/blog/Creating-your-own-css-grid-system