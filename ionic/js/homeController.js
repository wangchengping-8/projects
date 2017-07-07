app.controller('homeController',function($scope,$http,$state){
	$scope.imgList = [
		"images/1.jpg",
		"images/2.jpg",
		"images/3.jpg"
	];
	// 声明一个变量，用于判断页数
	var page = 1;
	//声明一个变量，表示每一页获取多少条数据
	var count = 10;
	//声明一个变量，表示数据是否已经完全加载
	$scope.dataList = [];
	//通过接口获取数据，注意，如果需要使用$http,则必须注入$http服务
	function getData(){
		$http({
			url:'data/data.php?type=list&pageNo='+page+"&num="+"count"
		}).then(function(data){
			if (page==1) {
				$scope.dataList = data.data.records;
				console.log($scope.dataList)
				//注意在获取数据成功以后，需要手动将刷新控件结束
				$scope.$broadcast('scroll.refreshComplete')
			}else{
				// concat连接数组
				// 如果是加载则需要将获取的数据加在原来的数据之后
				$scope.dataList = $scope.dataList.concat(data.data.records);
				//如果当前未加载到数据，说明已经获取到全部数据，需要将加载控件移除
				if (data.data.records.length == 0) {
					$scope.haveMore = false;
				}
				// 停止加载的动画
				$scope.$broadcast("scroll.infiniteScrollComplete");
			}
		},function(err){
			console.log(err);
			if (page == 1) {
				//注意在获取数据失败以后，同样需要手动将刷新控件结束
				$scope.$broadcast('scroll.refreshComplete')
			}else{
				// 停止加载的动画
				$scope.$broadcast('scroll.infiniteScrollComplete')
			}
		});
	}
	getData(page);
	$scope.doRefresh =  function(){
		// 加载需要页面变量自增
		page=1;
		// 读取页码对应的数据
		getData(page);
	}
	$scope.loadMore = function(){
		page++;
		getData(page);
	}
	$scope.gotoDetail = function(obj){
		console.log(obj.Name)
		// 用于路由的跳转服务,当跳转到详情页面时,需要传值
		$state.go("detail",{name:obj.Name,city:obj.City,country:obj.Country,age:obj.age});
	}
})