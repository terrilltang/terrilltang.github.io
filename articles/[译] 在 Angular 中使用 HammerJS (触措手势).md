
> HammerJS 是一个为 web 应用添加触摸手势的非常受欢迎的库,文中,将看到 Angular 结合 HammerJS 一起使用是多么的简单

*原文示例是针对 Angular 2 版本,经过测试,在目前最新的 Angular 4.x 版本中此教程依然适用,文章将以 Angular 来统一代称 Angular 2.x ,Angular 4.x 版本*



**名词**

swipe: 滑动; 和 pan 类似,但滑动更快速,无粘滞.

swipeleft,swiperight,swipeup,swipedown: 左滑,右滑,上滑,下滑

carousel of avatars: 头像轮播

**简介**

我们将构建一个头像轮播,可以左滑或者右滑来查看每个头像,可以使用下面的地址测试一下(最好在手机上,但也可以通过 chrome 和 firefox 桌面浏览器来模拟手机测试)

https://plnkr.co/edit/LCsiXOtzSedGZDbGQ3f8?p=preview



**应用配置**

让我们看一下我们的目录结构是怎样的,我们有一个 app 目录文件夹,目录下包含了我们的头像切换和启动应用的 main.ts 文件

```typescript
|- app/
    |- app.component.html
    |- app.component.css
    |- app.component.ts
    |- app.module.ts
    |- main.ts
|- index.html
|- tsconfig.json
```


**APP 组件**

让我们从 app 组件开始,在这个组件里,我们将定义头像列表和处理头像显示和隐藏的 swipe 事件.
```typescript
// app/app.component.ts
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent {
    // constant for swipe action: left or right
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    
    // our list of avatars
    avatars = [
        {
            name: 'kristy',
            image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
            visible: true
        },
        {
            name: 'matthew',
            image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
            visible: false
        },
        {
            name: 'chris',
            image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
            visible: false
        },
        {
            name: 'jenny',
            image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
            visible: false
        }
    ];
    
    // action triggered when user swipes
    swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
        // out of range
        if (currentIndex > this.avatars.length || currentIndex < 0) return;
        
        let nextIndex = 0;
        
        // swipe right, next avatar
        if (action === this.SWIPE_ACTION.RIGHT) {
            const isLast = currentIndex === this.avatars.length - 1;
            nextIndex = isLast ? 0 : currentIndex + 1;
        }
    
        // swipe left, previous avatar
        if (action === this.SWIPE_ACTION.LEFT) {
            const isFirst = currentIndex === 0;
            nextIndex = isFirst ? this.avatars.length - 1 : currentIndex - 1;
        }
    
        // toggle avatar visibility
        this.avatars.forEach((x, i) => x.visible = (i === nextIndex));
    }
}
```
**笔记: **

1. 我们处理左滑右滑事件用同样的函数 swipe
2. swipe 有两个参数

 - 第一个参数是当前被选中的头像的索引
 - 第二个参数是可选的,滑动动作,左或者右

3. 你看到我们声明了一个常量 SWIPE_DIRCTION ,这个常量的值是左滑或者右滑

4. 引用 HammerJS 文档,HammerJS 处理5个滑动事件,滑动,左滑,右滑,上滑,下滑,在我们的例子中,我们只用处理左滑和右滑

5. 我们在 HTML 视图中调用 SWIPE 动作



**HTML VIEW**

```html
<!-- app/app.component.html -->
<div>
    <h4>Swipe Avatars with HammerJS</h4>
    <!-- loop each avatar in our avatar list -->
    <div class="swipe-box" *ngFor="let avatar of avatars; let idx=index"
     (swipeleft)="swipe(idx, $event.type)" 
     (swiperight)="swipe(idx, $event.type)" 
     [class.visible]="avatar.visible" 
     [class.hidden]="!avatar.visible">
        <div>
            <img [src]="avatar.image" [alt]="avatar.name">
        </div>
        <div>
            <a class="header">{{avatar.name}}</a>
        </div>
    </div>
</div>
```

**笔记: **

1. 通过 *ngFor 指令循环出每个头像,声明一个本地变量 idx 持有当前画像的索引.


2. 然后,开始处理 swipeleft,swiperight 事件,调用之前声明的 swipe 方法

3. $event 是一个事件对象,我们不需要知道整个 $event 对象的信息,只需要知道 $event.type 返回的字符串是 swipeleft 还是 swiperight

4. 根据 avatar.visible 添加或者移除两个 CSS 类 [class.visible] 或者 [class.hidden] 



**组件样式**

可以使用 semantic-ui 轻松实现样式美化,但对于我们来讲是不必要的,跳过这个部分,下面是需要添加到组件中的自定义 CSS 类

```css
.swipe-box {
    display: block;
    width: 100%;
    float: left;
    margin: 0;
}

.visible {
    display: block;
}

.hidden {
    display: none;
}

```

**笔记:** 

1. 需要所有的画像堆在其它的最上方,因此,使用 .swipe-box 使所有画像浮动

2. .visible 和 .hidden 用来隐藏和显示画像卡




**引入 HammerJS 脚本**

现在已经完成了组件,开始设置 HammerJS , 首先,需要把 HammerJS 脚本文件引入到主视图文件 index.html 文件中

```html
<!-- index.html -->
<head>
...
    <!-- Hammer JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js"></script>
....
</head>
```

默认情况下,桌面浏览器是不支持 touch 事件,HammerJS 有一个扩展叫 touch-emulator.js,提供一个调试工具来模拟实现 touch 支持,你可以像引入 hammer.js 那样引入它

```html
<!-- index.html -->
<head>
...
    <!-- Hammer JS Touch Emulator: Uncomment if for desktop -->
    <script src="http://cdn.rawgit.com/hammerjs/touchemulator/master/touch-emulator.js"></script>
    <script>
    TouchEmulator();
    </script>
...
</head>
```

具体是如何模拟实现,可以查看 hammer.js 的官方文档

由于示例运行在 plunker ,示例中引用了 HammerJS CDN URI,如果想本地管理,可以运行下面的命令.

```cmd
    npm install hammerjs --save
```

然后,在项目中引入JS 文件

*如果没有引入  HammerJS file ,会有一个错误信息抛出: 'Hammer.js is not loaded,can not bind swipeleft event'.*



**应用程序模块**

默认情况,如果没有任何自定义配置,就可以直接使用 HammerJS ,Angular 支持 HammerJS 开箱即用,在应用启动时,不需要包含任何内容,您的应用程序模块看起来像下面这样

```typescript
// app.module.ts

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ ]
})

export class AppModule { }
```


**定制 HammerJS**

如果你想增加一些自定义设置,像速度和阀值什么的,要怎么做呢?

**快速说明**

1. threshold (阀值): 识别 swipe 手势的最小距离值,默认: 10

2. velocity (速度): 识别 swipe 手势的最小速度,单位是 px/ms 默认: 0.3

官方文档上有提供一些其它的自定义配置项

Angular 已经内置提供了一个叫做 HAMMER_GESTURE_CONFIG 的令牌,接受 HammerGestureConfig 类型的对象

简单的方式,可以继承 HammerGestureConfig 像下面这样

```typescript
// app.module.ts

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppComponent }   from './app.component';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20} // override default settings
  }
}

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ { 
                    provide: HAMMER_GESTURE_CONFIG, 
                    useClass: MyHammerConfig 
                } ] // use our custom hammerjs config
})

export class AppModule { }
```


在示例中,仅是想为 swipe 行为重写一些默认配置,如果想有更多的控制,可以像上面那样实现 HammerGestureConfig 类

查看一下 HammerGestureConfig 没那么复杂的源码或者文档,整个类仅有两个属性( events,overrides) 和一个方法( buildHammer )



**总结:** 

Angular 与 HammerJS 集成以实现触摸手势事件检测非常容易.



> 原文地址: https://scotch.io/tutorials/using-hammerjs-touch-gesture-in-angular-2
> HammerJS swipe 配置文档: https://hammerjs.github.io/recognizer-swipe/
> 示例运行地址: https://plnkr.co/edit/LCsiXOtzSedGZDbGQ3f8?p=preview


