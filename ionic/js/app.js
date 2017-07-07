// 配置路由相关事项
// ionic中使用的是ui.router路由服务
var app = angular.module("app",['ionic',"ui.router"]);
// 配置路由
app.config(function($stateProvider,$urlRouterProvider){
	// 通过url.RouterProvider配置地址不在路由表范围内时跳转页面
	$urlRouterProvider.otherwise("/home");
	// 配置路由表
	$stateProvider.state(
		'home',{
			url:'/home',
			templateUrl:'template/home.html',
			controller:"homeController"
		}
	)
	.state('detail',{
		ulr:'/detail/:name/:city/:country/:age',
		templateUrl:"template/detail.html",
		controller:'detailController'
	})
})