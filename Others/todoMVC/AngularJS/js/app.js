(function (angular) {
	'use strict';
	// 主要模块————todoMvc
	var myModule = angular.module('todoMvc', []);

	// 注册控制器
	myModule.controller('mainCtrl',['$scope',function($scope){
		//文本框模型
		$scope.text = '';
		//todolist信息对象
		// $scope.todolist = [{id: 001, text: 'doSomething', completed: true|false},{……},{……}]
		//default info
		$scope.todoall = [
			{id: 1, text: 'doSomething', completed: false},
			{id: 2, text: 'doSomethingElse', completed: false},
			{id: 3, text: 'takeABreak', completed: true}
		];
		$scope.todoshow = $scope.todoall; //todoshow 装的是筛选后的列表，这里先初始化一次
		
		//添加
		$scope.add = function() {
			if(!$scope.text)return false;
			$scope.todoall.push({
				id: getID(),
				text: $scope.text,
				completed: false
			});
			$scope.text = '';
		}
		
		//获取id方法
		var getID = function() {
			var id = Math.random();
			for(var i = 0; i < $scope.todoall.length; i++) {
				if(id === $scope.todoall[i].id) {
					getID();
				}
			}
			return id;
		};

		//删除按钮时间
		$scope.remove = function(id){
			for(var i = 0; i < $scope.todoall.length; i++) {
				if($scope.todoall[i].id === id)$scope.todoall.splice(i, 1);
			}
		}

		//删除所有已完成事件
		$scope.delete = function() {
			var result = [];
			for(var i = 0; i < $scope.todoall.length; i++){
				if(!$scope.todoall[i].completed){
					result.push($scope.todoall[i]);
				}
			}
			$scope.todoall = result;
			if($scope.filterSelect == 'completed'){
				$scope.todoshow = [];
			}else{
				$scope.todoshow = $scope.todoall;
			}
		}

	
		//筛选按钮
		$scope.filters = function(filtername) {
			var all = [], active = [], completed = [];
			all = $scope.todoall;

			for(var i = 0; i < $scope.todoall.length; i++) {
				if($scope.todoall[i].completed){
					completed.push($scope.todoall[i]);
				}else{
					active.push($scope.todoall[i]);
				}
		    }
		    $scope.filterSelect = filtername;
			switch(filtername) {
				case 'completed' :
					$scope.todoshow = completed;
					break;
				case 'active' :
					$scope.todoshow = active;
					break;
				default:
					$scope.todoshow = all;
					break;
			}

		}

		//complete是否显示
		$scope.showClearComplete = function() {
			for(var i = 0; i < $scope.todoshow.length; i++) {
				if($scope.todoshow[i].completed) {
					return true;
				}
			}
			return false;
		}
		//checkall
		//双击编辑事件
		$scope.textEditingID = function(id) {
			for(var i = 0; i < $scope.todoshow.length; i++){
				if($scope.todoshow[i].id === id && $scope.todoshow[i].completed){
					return false;
				}
			}
			$scope.editingId = id;
		}
		$scope.removeEditingID = function() {
			$scope.editingId = false;
		}

		//checkall toggle
		var check = false;
		$scope.toggleAll = function(){
			for(var i = 0; i < $scope.todoshow.length; i++){
				$scope.todoshow[i].completed = check;
			}
			check = !check;
			return check
		}

	}])
})(angular);
