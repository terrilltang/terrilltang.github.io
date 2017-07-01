
> 这篇文章最早翻译并发在 oschina.net 上，现今搬至此处，文章稍作润色，读起来更浏些。

> 为了便于阅读，以下 Angular 统一代表 Angular2/4 版本，AngularJS 代表 Angular1.x 版本


 
### 文章将告诉你如何使用 TypeScript 在 Angular 项目执行路由转场间动画 

项目代码地址：[https://github.com/cornflourblue/angular2-animation-tutorial-example](https://github.com/cornflourblue/angular2-animation-tutorial-example)

同样这里也有一篇使用 AngularJS 的路由动画示例：[http://jasonwatmore.com/post/2016/01/20/angular-nganimate-tutorial-with-ui-router](http://jasonwatmore.com/post/2016/01/20/angular-nganimate-tutorial-with-ui-router)



### Angular 动画和 AngularJS 动画间的不同

Angular 动画与 AngularJS 中动画在工作方式上是完全不同的，在 AngularJS 中通过 CSS 类这样的钩子来实现视图切入和切出时的元素动画，但在 Angular 中，组件间动画的执行是依靠一个方法的集合来实现的，这些方法包括 ( trigger,state,animate,transition,style ) ，集成在 @angular/animations 模块中。

Angular 中仍然是使用 CSS 属性定义动画，但它们是写在 Typescript 中的一个 JSON 对象（TSON？）中，而不是由 CSS / LESS 直接编写的样式文件，还有一种新的 Angular 动画 DSL（Domain Specific Language），它们的创建用于定义不同的路由状态和路由之间转扬切换。 由于可以在 Angular 官方网站上找到所有这些详情信息，所以不会在文章中过多讲解所有新的动画系统的细节，而是将重点放在教程示例上，以及在路由之间如何进行动画处理。

如果你觉得新的 Angular 动画系统让你痛苦的想撞墙，不要沮丧；很长一段时间内我也是抓耳挠腮很尴尬，但是仍然要掌握它！



### Angular 动画教程示例

这里提供一个可以运行的教程示例应用，标签切换使用淡入淡出的过渡，添加产品和修改产品页面使用滑入滑出的过渡动画。

在 Plunker 中查看示例 [http://plnkr.co/edit/AfIB1i?p=preview](http://plnkr.co/edit/AfIB1i?p=preview)



### 在本地运行 Angular 动画教程示例

1，通过 https://nodejs.org/en/download/ 安装 NodeJS 和 NPM ,命令行运行 node -v 和 npm -v 检测安装版本

2，下载项目源代码：[https://github.com/cornflourblue/angular2-animation-tutorial-example](https://github.com/cornflourblue/angular2-animation-tutorial-example)

3，在项目的根目录 ( package.json 所在的目录)，通过 npm install 命令安装相关依赖的包

4，通过在项目根目录运行 npm start 命令启动应用



### 让我们专注于动画

我尝试制作一个真实领域的应用，所以它包含了少量的 Services 和一些其它的东西；但是在文中将专注于动画和如何把这些动画添加到 Angular 的路由中去。



### 在 app.module.ts 中导入 BrowserAnimationsModule 模块

随着 Angular4 的发布，animations 模块已经从 Angular 核心模块中拆分到他们自己的模块中，所以，你不得不在 app.module.ts 文件顶部中引入 BrowserAnimationsModule 模块。

```typescript
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
```

并且在@NgModule元数据中，把 BrowserAnimationsModule 添加到 imports 列表中。

```typescript
@NgModule({
  imports:[
    ...,
    BrowserANimationsMdoule
  ],
  ...
})
export class AppModule{}
```

第一个导入使 BrowserAnimationsModule 在 app.module.ts 文件中可用，

第二个导入使 BrowserAnimationsModule 中的方法可以在包含在 AppModule 中的其它组件中使用



### 定义你的 Angular 动画

Animations 可以被直接定义在你的组件里，但我更喜欢把它们分离出来到它们自己的文件中，这样可以让这些动画在多处重用，并且可以使得你的组件代码更加清晰，更加易于维护和关注点分离。

在这个例子了中，我把动画放在了 app/_animations 文件夹中，我偏爱为无特征的文件夹加一个下划线前缀 [" _ "],目的是为了和那些特征性文件夹在最顶级目录做区分，特征文件夹用来存放应用的视图或者路由代码，像首页和产品页，无特征文件夹包含那些共享重用的代码，像 services, animations, directives, css等基本一切代码。



### Angular 淡入动画

在示例中，淡入动画被用于主页组件和产品列表组件

```typescript
//从angular animations module 导入需要的动画方法
import {trigger,state,animate,transition,style} from '@angular/animations';
export const fadeInAnimation=
      //触发器名称，附加这个动画到元素上使用[@triggerName]语法
      trigger('fadeInAnimation',[
        //路由 '进入' 过渡
        transition(':enter',[
          //在过渡刚开始时的样式
          style({opacity:0}),
          //动画和过渡结束时的样式
          animate('.3s',style({opacity:1}))
        ])
      ])
```



### Angular 滑入滑出动画

在示例中，滑入滑出动画被用在产品的添加和编辑组件上

```typescript
//从angular animations module 导入需要的动画方法
import {trigger,state,animate,transition,style} from '@angular/animations';
export const slideInOutAnimation=
      //触发器名称，附加这个动画到元素上使用[@triggerName]语法
      trigger('slideInOutAnimation',[
        // 路由容器的最终状态样式 (host)
        state('*', style({
            // 视图覆盖整个屏幕并且半透明背景
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        })),
        // 路由 '进入' 过渡
        transition(':enter', [
            // 过渡开始时的样式
            style({
                // 开始是内容区域相对于右侧的位置
                // -400%代替100%，是由于负位置增加了元素的宽度
                right: '-400%',
                // 开始时背景是全透明的
                backgroundColor: 'rgba(0, 0, 0, 0)'
            })
            // 动画和结束时的样式状态
            animate('.5s ease-in-out', style({
                // 过渡到右侧为0，让内容进入视图
                right: 0,
                // 过渡背景从透明到0.8
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }))
        ]),
 
        // 路由'离开'过渡
        transition(':leave', [
            // 在过渡结束的动画和样式
            animate('.5s ease-in-out', style({
                // 过渡到右侧-400%，加了位移的内容宽度
                right: '-400%',
                // 过渡背景透明度为0淡出
                backgroundColor: 'rgba(0, 0, 0, 0)'
            }))
        ])
      ])
```



### 附加 Angular 动画到你路由的组件上

随着动画清晰的被分离进他们自己的文件，这样更容易附加它们到你的 Angular 路由，你需要做的就是导入动画到你想要添加的组件的 @Component 元数据中。



### Angular 首页组件淡入动画

示例中的添加了淡入动画的首页组件

```typescript
import { Component } from '@angular/core';
// 导入淡入动画
import { fadeInAnimation } from '../_animations/index';
@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
    // 添加使用淡入动画在组件可用
    animations: [fadeInAnimation],
    // 附加淡入动画到组件的最外层元素上
    host: { '[@fadeInAnimation]': '' }
}) 
export class HomeComponent {}
```



### Angular 添加淡入动画的产品列表组件

示例中添加了淡入动画的产品列表组件

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductService, PubSubService } from '../_services/index';
// 导入淡入动画
import { fadeInAnimation } from '../_animations/index';
 
@Component({
    moduleId: module.id.toString(),
    templateUrl: 'product-list.component.html',
    // 使淡入动画在组件中可用
    animations: [fadeInAnimation],
    // 添加淡入动画到组件的最外层元素上
    host: { '[@fadeInAnimation]': '' }
})
 
export class ProductListComponent implements OnInit, OnDestroy {
    products: any[];
    subscription: Subscription;
    constructor(private productService: ProductService,
        private pubSubService: PubSubService) { }
    deleteProduct(id: number) {
        this.productService.delete(id);
        this.loadProducts();
    }
    ngOnInit() {
        this.loadProducts();
        // 当更新时重载产品视图
        this.subscription = this.pubSubService.on('products-updated').subscribe(() => this.loadProducts());
    }
    ngOnDestroy() {
        // 取消订阅避免内存泄漏
        this.subscription.unsubscribe();
    }
    private loadProducts() {
        this.products = this.productService.getAll();
    }
}
```



### Angular 添加滑入滑出效果的产品添加编辑组件

示例中添加滑入滑出效果的产品添加编辑组件

```typescript
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ProductService, PubSubService } from '../_services/index'; 
// 导入滑入滑出动画
import { slideInOutAnimation } from '../_animations/index';
@Component({
    moduleId: module.id.toString(),
    templateUrl: 'product-add-edit.component.html',
    // 使滑入滑出动画在组件中可用
    animations: [slideInOutAnimation],
    // 添加滑入滑出动画到组件最外层的元素上
    host: { '[@slideInOutAnimation]': '' }
})
 
export class ProductAddEditComponent implements OnInit {
    title = 'Add Product';
    product: any = {};
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private pubSubService: PubSubService) { }
    ngOnInit() {
        let productId = Number(this.route.snapshot.params['id']);
        if (productId) {
            this.title = 'Edit Product';
            this.product = this.productService.getById(productId);
        }
    }
    saveProduct() {
        // 保存产品
        this.productService.save(this.product);
        // 重定向到products视图
        this.router.navigate(['products']);
        // 发布产品更新事件
        this.pubSubService.publish('products-updated');
    }
}
```


#### 附注：Angular 动画是基于标准的[Web动画API(Web Animations API)](https://w3c.github.io/web-animations/)构建的，它们在[支持此API的浏览器中](http://caniuse.com/#feat=web-animation)会用原生方式工作。至于其它浏览器，就需要一个填充库(polyfill)了。你可以[从这里获取`web-animations.min.js`](https://github.com/web-animations/web-animations-js)，并把它加入你的页面中。



> 个人翻译的第一篇技术文章，文章归个人所有，著作权归作者所有；转载请联系作者：TERRILLTANG 549697621@qq.com

> 原文地址：http://jasonwatmore.com/post/2017/04/19/angular-2-4-router-animation-tutorial-example
