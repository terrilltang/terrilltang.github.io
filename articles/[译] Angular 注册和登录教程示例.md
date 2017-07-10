> 原作者的示例在Angular 2.x / 4.x 版本中都可以跑的通，所以以下文章中 Angular 代表 Angular 2.x / 4.x, AngularJS 代表 Angular 1.x;

4/27/2017---为 Webpack 和 SystemJS 版本示例更新 Angular 版本到 **Angular 4.1.0**

在我（原文作者）的上一篇文章 “如何[使用 AngularJS 创建用户注册和登录](http://jasonwatmore.com/post/2015/03/10/angularjs-user-registration-and-login-example-tutorial)” 获得大量乐趣后，Angular 在最近也终于已经发布，是时候发布一个最新的示例教程，使用 Angular 和 TypeScript.

项目代码可以在 GitHub 上获取： [https://github.com/cornflourblue/angular2-registration-login-example](https://github.com/cornflourblue/angular2-registration-login-example).

GitHub 上还有一个 Webpack 版本的示例：[https://github.com/cornflourblue/angular2-registration-login-example-webpack](https://github.com/cornflourblue/angular2-registration-login-example-webpack)

示例中使用了 HTML5 本地存储来伪造后端存储，切换使用真正的 web 服务，只需要在 app.module.ts 文件中移除注释 ” // 用来创建伪后端的服务提供商 “  下面的代码。

(查看示例代码： [http://plnkr.co/edit/tg25kr?p=preview](http://plnkr.co/edit/tg25kr?p=preview))

更新历史：

- 27/4/2017 - 为 Webpack 和 SystemJS 版本的两个示例更新 Angular 到 Angular 4.1.0
- 16/3/2017 - 创建一个 Webpack 版本的示例 [ Webpack version on github ]( https://github.com/cornflourblue/angular2-registration-login-example-webpack)
- 16/3/2017 - 更新到 Angular 2.4.9
- 24/2/2017 - 使用真正后端接口服务的同样的示例 [MEAN with Angular 2 - User Registration and Login Example & Tutorial](http://jasonwatmore.com/post/2017/02/22/mean-with-angular-2-user-registration-and-login-example-tutorial)
- 8/12/2016 - 更新权限守护和登录组件让用户在登录后跳转回上一个或者最初的地址
- 19/11/2016 - 更新至 Angular 2.2.1



### 本地运行 Angular 用户注册和登录示例

这个版本的示例使用 SystemJS 做为模块加载器

1，从 https://nodejs.org/en/download 安装 NodeJS (> v4) and NPM (> v3) ，你可以通过命令行运行 node -v 和 npm -v 来检测你的安装版本

2，下载项目源代码 [https://github.com/cornflourblue/angular2-registration-login-example](https://github.com/cornflourblue/angular2-registration-login-example)

3，在项目的根目录 ( 项目的 package.json 所在的目录 )，通过命令行运行 npm install 命令来安装需要的 npm 模块

4， 在项目的根目录，通过命令行运行 npm start 运行应用程序



### 本地运行此项目的 Webpack 版本示例

这个版本的示例使用了 Webpack 来打包 Angular 模块到一起，并且完成其它构建任务，结构是基于 Angular 官方的文档介绍 [Angular Webpack 介绍](https://angular.io/docs/ts/latest/guide/webpack.html)

在这个示例中使用 Webpack Dev Server 来做为本地的 web 服务器

1，从 https://nodejs.org/en/download 安装 NodeJS (> v4) and NPM (> v3) ，你可以通过命令行运行 node -v 和 npm -v 来检测你的安装版本

2，下载项目源代码 [https://github.com/cornflourblue/angular2-registration-login-example](https://github.com/cornflourblue/angular2-registration-login-example)

3，在项目的根目录 ( 项目的 package.json 所在的目录 )，通过命令行运行 npm install 命令来安装需要的 npm 模块

4， 在项目的根目录，通过命令行运行 npm start 运行应用程序

5，浏览器中输入 http://localhost:8080 测试查看应用

注意：在项目的根目录运行 npm run build 命令打包输出用于生产模式的优化过的代码到 ”/dist" 目录，你可以通过在 "/dist" 目录运行一个简单的 node http 服务来测试运行生产模式应用，至于如何操作运行的说明，可以查看：[NodeJS - Setup a Simple HTTP Server / Local Web Server](http://jasonwatmore.com/post/2016/06/22/nodejs-setup-simple-http-server-local-web-server).



### Angular 项目结构

我使用 Angular 快速起步项目做为项目的基础，它使用了 TypeScript 编写并且使用 systemjs 加载模块，如果你是使用 Angular 的新用户，我建议您查看快速启动，因为它提供了本文中未涵盖的项目工具和配置文件的详细信息。

项目和代码结构尽可能的遵循官方提供的 Angular 风格指南中的建议，以及我自己在项目中一些地方做的一些调整。

每个功能都有自己的文件夹（home＆login），其他代码如 services ，models ，guards 等都放在带有下划线的文件夹中，以便轻松区分它们，并将它们分组在文件夹结构的顶部。

以下是项目目录结构：

```typescript
|- app
    |- _directives
        |- alert.component.html
        |- alert.component.ts
        |- index.ts
    |- _guards
        |- auth.guard.ts
        |- index.ts
    |- _helpers
        |- fake-backend.ts
        |- index.ts
    |- _models
        |- user.ts
        |- index.ts
    |- _services
        |- alert.service.ts
        |- authentication.service.ts
        |- index.ts
        |- user.service.ts
    |- home
        |- home.component.html
        |- home.component.ts
        |- index.ts
    |- login
        |- index.ts
        |- login.component.html
        |- login.component.ts
    |- register
        |- index.ts
        |- register.component.html
        |- register.component.ts
    |- app.component.html
    |- app.component.ts
    |- app.module.ts
    |- app.routing.ts
    |- main.ts
|- app.css
|- index.html
|- package.json
|- system.config.js
|- tsconfig.json


```



以下是示例应用主要文件的简要描述以及代码，所有的文件都可以在文章顶部项目的 Github 地址中找到。 



### Angular 警告组件模板

路径：/app/_directives/alert.component.html

警告组件模板包含了显示在页面顶部显示的警告信息的 html 元素

```typescript
<div *ngIf="message" [ngClass]="{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }">{{message.text}}</div>
```



### Angular 警告组件

路径：/app/_directives/alert.component.ts

每当从警告 service 接收到消息时，警告组件都会将警告消息传递给模板，它通过订阅警告 service 的getMessage() 方法来返回一个 Observable

```typescript
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/index'; 
@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent {
    message: any;
    constructor(private alertService: AlertService) { }
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
```



### Angular 权限守护

路径：/app/_guards/auth.guard.ts

进程守护用来限制那些未经允许的访问者访问有权限限制的路由，在示例中，它用来在 app.routing.ts 中

保护首页路由，更多关于 Angular 守护的信息，你可以通过查看 thoughtram blog 中的 [一篇文章](http://blog.thoughtram.io/angular/2016/07/18/guards-in-angular-2.html) 来了解

```typescript
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // 有登录，返回
            return true;
        } 
        // 没有登录，则跳转到登录页面。
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
```



### Angular 伪造后端提供商

路径：/app/_helpers/fake-backend.ts

假的后端提供商可以让示例在没有后端的情况下运行，它使用 HTML5 本地存储来存储用户数据，并且提供假的权限实现和 CRUD (增删改查) 方法，在生产阶段，这些将交由真实的接口和数据库来实现。

使用 Angular 模拟后端来替换掉默认的 http 请求的后端服务，模拟后端通过拦截应用中的 http 请求提供假的响应，它仍然用来做单元测试。

```typescript
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // 存储中本地存储中注册用户数据
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    // 配置模拟后端
    backend.connections.subscribe((connection: MockConnection) => {
      	// 包装超时以模拟服务器api调用
        setTimeout(() => {
            // 权限
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // 从POST请求中获取请求的参数get parameters from post request
                let params = JSON.parse(connection.request.getBody());
                // 查找用户是否有登录凭据find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });
                if (filteredUsers.length) {
                    // 如果用户信息存在，返回200成功并且返回用户信息和伪造JWT令牌
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // 或者返回400错误请求
                    connection.mockError(new Error('Username or password is incorrect'));
                }
                return;
            }
            // 获取用户get users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                //检查请求头部的权限令牌并且返回用户是否有效，在真实运行环境中，这部分是在服务端安全执行的。 
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                } else {
                    // 返回401不允许访问，如果令牌为空或者无效
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }
            // 通过ID查找用户get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                //检查请求头部的权限令牌并且返回用户是否有效，在真实运行环境中，这部分是在服务端安全执行的。 
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // 在用户数据中根据ID查找用户
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;
 
                    // 200成功响应并返回用户信息
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    // 返回401不允许访问，如果令牌不存在或者失效
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }
            // 创建用户
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                // 从POST的数据中获取用户对象数据
                let newUser = JSON.parse(connection.request.getBody());
                // 验证
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                }
                // 保存新用户
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                // 返回200成功信息
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                return;
            }
            // 删除用户
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // 检查请求头部的权限令牌并且返回用户是否有效，在真实运行环境中，这部分是在服务端安全执行的。 
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // 在用户信息中通过ID查找用户
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // 删除用户
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }
            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });
        }, 500);
    });
    return new Http(backend, options);
};
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
```



### Angular 用户模型

路径：/app/_models/user.ts

用户模型是一个定义了用户属性的小类

```typescript
export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}
```



### Angular 警告服务

路径：/app/_services/alert.service.ts

警告服务让应用中的任何组件都可以通过使用警告组件在页面顶部显示警告信息。

服务有显示成功和错误消息的方法，并且 getMessage() 方法返回一个可观察对象，用来订阅通知，每当警告组件显示一条消息时。

```typescript
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
    constructor(private router: Router) {
        // 清除警告消息在路由改变时
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // 只保留一个位置的变化
                    this.keepAfterNavigationChange = false;
                } else {
                    // 清除警告
                    this.subject.next();
                }
            }
        });
    }
    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }
    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
```



### Angular 权限服务

路径：/app/_services/authentication.service.ts

权限服务用来在应用中登录和登出，发送用户凭据到接口并且检查 JWT 令牌的响应，如果存在就意味着权限许可成功，并且把用户信息中的令牌信息保存到本地存储中。

登录的用户详细信息存储在本地存储中，以便用户在刷新浏览器以及浏览器会话之前将保持登录状态，直到注销。 如果您不希望用户在刷新或会话之间保持登录，则可以通过将用户详细信息存储在较不持久的位置（如会话存储）或认证服务的属性中来轻松更改行为。

```typescript
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
```



### Angular 用户服务

用户服务包含标准的增删改查方法集合来管理用户，它包含一个 jwt() 方法，用来添加 JWT 令牌从本地存储到每个http 请求的头信息的 Authorization字段中

```typescript
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';
@Injectable()
export class UserService {
    constructor(private http: Http) {}
    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }
    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }
    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }
    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    } 
    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
```



### Angular 首页组件模板

路径：/app/home/home.component.html

首页组件里包含 html 以及 angular 模板语法 ，用于展示一个简单的欢乐信息，用户列表和拿出链接

```typescript
<div class="col-md-6 col-md-offset-3">
    <h1>Hi {{currentUser.firstName}}!</h1>
    <p>You're logged in with Angular 2!!</p>
    <h3>All registered users:</h3>
    <ul>
        <li *ngFor="let user of users">
            {{user.username}} ({{user.firstName}} {{user.lastName}})
            - <a (click)="deleteUser(user.id)">Delete</a>
        </li>
    </ul>
    <p><a [routerLink]="['/login']">Logout</a></p>
</div>
```



### Angular 首页组件

路径：/app/home/home.component.ts

首页组件从本地存储里获取当前用户，从用户服务里获取所有用户，并且展示在模板中。

```typescript
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
}) 
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = []; 
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ngOnInit() {
        this.loadAllUsers();
    }
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
```



### Angular 登录组件模板

路径：/app/login/login.component.html

登录组件模板包含一个带有用户名和密码的登录表单，当提交按钮点击时，无效的字段会有相应的验证消息提醒，

提交的 Login() 方法会在表单有效时被调用。

```typescript
<div class="col-md-6 col-md-offset-3">
    <h2>Login</h2>
    <form name="form" (ngSubmit)="f.form.valid && login()" #f="ngForm" novalidate>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
            <label for="username">Username</label>
            <input type="text" class="form-control" name="username" [(ngModel)]="model.username" #username="ngModel" required />
            <div *ngIf="f.submitted && !username.valid" class="help-block">Username is required</div>
        </div>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
            <label for="password">Password</label>
            <input type="password" class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel" required />
            <div *ngIf="f.submitted && !password.valid" class="help-block">Password is required</div>
        </div>
        <div class="form-group">
            <button [disabled]="loading" class="btn btn-primary">Login</button>
            <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            <a [routerLink]="['/register']" class="btn btn-link">Register</a>
        </div>
    </form>
</div>
```



### Angular 登录组件

路径：/app/login/login.component.ts

登录组件使用权限服务登录和登出应用，它在初始化时自动记录用户（ngOnInit），因此登录页面也可以用于登出。

```typescript
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
```



### Angular 注册组件模板

注册组件模板包含一个简单的注册表单，其中包含名字，姓氏，用户名和密码的字段。当单击提交按钮时，它会显示无效字段的验证消息。如果表单有效，则提交 register() 方法。

```typescript
<div class="col-md-6 col-md-offset-3">
    <h2>Register</h2>
    <form name="form" (ngSubmit)="f.form.valid && register()" #f="ngForm" novalidate>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" name="firstName" [(ngModel)]="model.firstName" #firstName="ngModel" required />
            <div *ngIf="f.submitted && !firstName.valid" class="help-block">First Name is required</div>
        </div>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" name="lastName" [(ngModel)]="model.lastName" #lastName="ngModel" required />
            <div *ngIf="f.submitted && !lastName.valid" class="help-block">Last Name is required</div>
        </div>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
            <label for="username">Username</label>
            <input type="text" class="form-control" name="username" [(ngModel)]="model.username" #username="ngModel" required />
            <div *ngIf="f.submitted && !username.valid" class="help-block">Username is required</div>
        </div>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
            <label for="password">Password</label>
            <input type="password" class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel" required />
            <div *ngIf="f.submitted && !password.valid" class="help-block">Password is required</div>
        </div>
        <div class="form-group">
            <button [disabled]="loading" class="btn btn-primary">Register</button>
            <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            <a [routerLink]="['/login']" class="btn btn-link">Cancel</a>
        </div>
    </form>
</div>
```



### Angular 注册组件

路径：/app/register/register.component.ts

注册组件有一个 register() 方法，在注册表单提交时通过调用用户服务用来创建新用户。

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
}) 
export class RegisterComponent {
    model: any = {};
    loading = false;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
```



### Angular 应用组件模板

路径：/app/app.component.html

应用组件模板是一个应用的根组件模板，它包含了一个路由指令 router-outlet , 目的是为了展示每个当前路由的视图，并且在系统中展示警告信息中警告指令 alert

```typescript
<div class="jumbotron">
    <div class="container">
        <div class="col-sm-8 col-sm-offset-2">
            <alert></alert>
            <router-outlet></router-outlet>
        </div>
    </div>
</div>
```



### Angular 应用组件

路径：/app/app.comonent.ts

应用组件是应用程序的根组件，它将应用程序的根标记定义为具有选择器属性的<app> </ app>。 将moduleId属性设置为允许将相对路径用于templateUrl

```typescript
import { Component } from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent {}
```



### Angular 应用模块

路径：/app/app.module.ts

应用模块定义了应用的根模块，并且定义了关于模块的元数据，更多关于 Angular 模块的信息可以查看官方文档[这个页面](https://angular.io/docs/ts/latest/guide/ngmodule.html)

这是伪造的后端提供商添加到应用程序的地方，如果切换到一个真实的后端，只需删除位于注释“//提供者用于创建伪造后端”下的提供者

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
// 用来创建伪造的后端
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index'; 
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        // 提供者用于创建伪造后端
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```



### Angular 应用路由

路径：/app/app.routing.ts

文件定义了应用的路由，每个路由包含一个路径和相关组件，首页路由通过添加路由的权限守护的 canActivate属性来保证访问性安全

```typescript
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // 其它路由均跳转到首页
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);
```



### Angular 主启动文件

路径：/app/main.ts

主文件是通过 Angular 启动和引导应用程序使用的入口点

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; 
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
```



> 个人原创翻译，转载请注明作者：TERRILLTANG 
>
> 原文地址：http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial