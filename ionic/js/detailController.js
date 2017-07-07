// 需要接收路由传递进来的参数，所以需要注入$stateParams服务
app.controller("detailController",function($scope,$stateParams){
	console.log($scope.obj)
	$scope.obj = {
		Name:$stateParams.name,
		City:$stateParams.city,
		Country:$stateParams.country,
		Age:$stateParams.age
	}

	$scope.goBack = function(){
		window.history.back();
	}
})