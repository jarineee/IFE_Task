(function (window) {
	'use strict';
	// Your starting point. Enjoy the ride!
	var myEventHandler = function () {
		if (window.addEventListener) {
			return function (tar, e, fn) {
				tar.addEventListener(e, fn);
			}
		} else {
			return function () {
				tar.attachEvent('on' + e, fn);
			}
		}
	}();
	//事件绑定器 返回list item需要绑定的函数对象。
		var bind_event = function () {
			var list = document.getElementById('list'),
				toggle_all = document.getElementById('toggle-all'),
				clrcompl = document.getElementById('clear-completed');

			//筛选器--全局方法 执行一次就行
			//active类
			var filters = function () {
				var filters = document.getElementById('filters').getElementsByTagName('li'),
					all_btn = filters[0].getElementsByTagName('a')[0],
					active_btn = filters[1].getElementsByTagName('a')[0],
					completed_btn = filters[2].getElementsByTagName('a')[0],
					i;
				var getSelected = function (e) {
					//清除样式（class筛选器改改可能更好）
					classOperator(all_btn).removeClass('selected');
					classOperator(active_btn).removeClass('selected');
					classOperator(completed_btn).removeClass('selected');

					var target_elem = e.target || e.srcElement;
					classOperator(target_elem).addClass('selected');

				}
				var allFilter = function (status) {
					var libox = list.getElementsByTagName('li'),
						max = libox.length,
						status = status;
					typeof status === 'string' ? status = status : status = 'block';
					for (i = 0; i < max; i += 1) {
						libox[i].style.display = status;
					}
				};
				var completedFilter = function () {
					var result = classOperator().hasClass('completed');
					allFilter('none');
					if ( result[0] ) {
						for (i = 0; i < result.length; i += 1) {
							result[i].style.display = 'block';
						}
					}
				};
				var activeFilter = function () {
					var result = classOperator().hasClass('completed');
					allFilter('block');
					if (result[0]) {
						for (i = 0; i < result.length; i += 1) {
							result[i].style.display = 'none';
						}
					}
				};
				// 绑定
				myEventHandler(all_btn, 'click', function (e) {
					allFilter();
					getSelected(e);
				});
				myEventHandler(active_btn, 'click', function (e) {
					activeFilter();
					getSelected(e);
				});
				myEventHandler(completed_btn, 'click', function (e) {
					completedFilter();
					getSelected(e);
				});
			}();
			
			// clear completed 全局方法 执行一次即可
			var clearCompleted = function () {
				var result = classOperator().hasClass('completed'),
					i,
					max = result.length;
				for (i = 0; i < max; i += 1) {
					list.removeChild(result[i]);
				}
				clrcompl.style.display = 'none';
				hasItem();
				allCompleted();
				
			};
			myEventHandler(clrcompl, 'click', clearCompleted);

			// 隐藏clear completed 按钮
			var clrcompl_display = function () {
				classOperator().hasClass('completed')[0] ? clrcompl.style.display = 'block' :
				clrcompl.style.display = 'none'; 
			}

			//为全选全不选checkbox，添加事件监视  --全局方法 执行一次即可
			var toggleAll = function () {
				var listbox = list.getElementsByTagName('li'),
					i ,
					max = listbox.length;
				if (toggle_all.checked === true) {
					classOperator().addClass('completed');
					for (i = 0; i < max; i += 1) {
						listbox[i].getElementsByTagName('input')[0].checked = true;
					}
				} else {
					classOperator().removeClass('completed');
					for (i = 0; i < max; i += 1) {
						listbox[i].getElementsByTagName('input')[0].checked = false;
					}
				}
				clrcompl_display();
			}
			myEventHandler(toggle_all, 'click', toggleAll);

			//校验列表是否为空，footer和section是否需要隐藏,更新剩余项数 
			var hasItem = function () {
				var	footer = document.getElementsByTagName('footer')[0],
					main_section = document.getElementsByTagName('section')[1],
					count_item = footer.getElementsByTagName('span')[0];

				return function () {
					var libox = list.getElementsByTagName('li');
					if (libox[0]) {
						footer.style.display = 'block';
						main_section.style.display = 'block';
						count_item.innerHTML = '<span class="todo-count"><strong>' + libox.length + '</strong> item left</span>';
					} else {
						footer.style.display = 'none';
						main_section.style.display = 'none';
					}
				};
			}();


			// 遍历类筛选, 返回含有类的li数组 -全局方法
			var classOperator = function (item, classname) {
				var i = 0,
					list_item = item || list.getElementsByTagName('li'),
					max = list_item.length,
					result = [];
				// 有li参数result返回li 
				// li参数不存在的情况下收集所有含有该类的li，放到result数组中
				var hasClass = function (classname) {
					if (item) {
						list_item.className.indexOf(classname) !== -1 ? result.push(list_item) : '' ;
					} else {
						for (i = 0; i < max; i +=1) {	
							if (list_item[i].className.indexOf(classname) !== -1) {
								result.push(list_item[i]);
							} 
						}
					}
					return result;
				};

				var addClass = function (classname) {
					if (item) {
						var c_str = list_item.className,
							index = c_str.indexOf(classname);
						if (index === -1) {
							c_str === '' ? c_str = classname : c_str += ' ' + classname;
						}
						list_item.className = c_str;
					} else {
						for (i = 0; i < max; i += 1 ) {
							var c_str = list_item[i].className,
							index = c_str.indexOf(classname);
							if (index === -1) {
								c_str === '' ? c_str = classname : c_str += ' ' + classname;
							}
						list_item[i].className = c_str;
						}
					}
				};

				//移除该含有该类的数组方法
				var removeClass = function (classname) {
					if(result[0] === undefined) hasClass(classname);
					for (i = 0; i < result.length; i += 1) {
						var c_str = result[i].className,
							index = c_str.indexOf(classname);
						index === 0 ? c_str = c_str.replace(classname, '') : c_str = c_str.replace(' ' + classname, '');
						result[i].className = c_str;
					}
				};
				return {removeClass, hasClass, addClass};
			};


			//completed状态绑定  --局部方法新建li时需要绑定
			
			// 校验目前是否处于全选状态 
			var allCompleted = function () {
				classOperator().hasClass('completed').length === list.getElementsByTagName('li').length ? 
				toggle_all.checked = true : toggle_all.checked = false;
			};
			
			

			
			//第一次执行后 仍然可以使用的功能
			return function (item) {
				var check = item.getElementsByTagName('input')[0],
					destroybtn = item.getElementsByTagName('button')[0];

				var completed_checked = function (item) {
					if (check.checked === true) {
						classOperator(item).addClass('completed');

					} else {
						classOperator(item).removeClass('completed');
					}
					allCompleted();
					clrcompl_display();
				};
				myEventHandler(check, 'click', function () {
						completed_checked(item);
				});
				completed_checked(item);
				hasItem();

			//双击事件添加编辑类
				var getEditing = function () {
					var	that = this,
						current_input = this.getElementsByTagName('input')[1],
						current_label = this.getElementsByTagName('label')[0];
					// 先清除其他类的editing样式
					if ( item.className.indexOf('completed') === -1) {
						classOperator().removeClass('editing');
						classOperator(this).addClass('editing');
						// 自动获取焦点
						current_input.focus();
						//input 同步 label
						current_input.value = current_label.innerHTML;
						myEventHandler(current_input, 'keypress', removeEditing);
						myEventHandler(document, 'click', removeEditing);
					}

					function removeEditing (e) {
						var e = e || window.event,
							key = e.keyCode || e.which || e.charCode,
							target_elem = e.target || e.srcElement;
						if (target_elem !== current_input || e.keyCode == 13) {
							if(current_input.value !== '') {
								current_label.innerHTML = current_input.value;
								classOperator(that).removeClass('editing');
							} else {
								return false;
							}
						}
					}
				};
				myEventHandler(item, 'dblclick', getEditing);
				//删除按钮绑定 --需要绑定到li
				var destroy = function () {
					item.parentNode.removeChild(item);
					clrcompl_display();
					hasItem();
					allCompleted();
				};
				myEventHandler(destroybtn, 'click', destroy);
			};
		}();

		var appendLi = function (e) {
			var input_area = document.getElementById('append_new'),
				list = document.getElementById('list'),
				list_item = list.getElementsByTagName('li'),
				i = 0,
				max = list_item.length;

			for(i; i < max ; i += 1) {
				bind_event(list_item[i]);
			}

			var appendNew = function (content) {
				if (content === '') return false;
				var li_elem = document.createElement('li'),
					str = '';

					str += '<div class="view">';
						str += '<input class="toggle" type="checkbox">';
						str += '<label>' + content + '</label>';
						str += '<button class="destroy"></button>';
					str += '</div>';
					str += '<input class="edit" value="Rule the web">';
				//写入到列表项中
				li_elem.innerHTML = str;

				//插入到html中并清空文本框
				if (list_item) {
					list.insertBefore(li_elem, list_item[0]);
				} else {
					list.appendChild(li_elem);
				}
				input_area.value = '';

				//为新元素绑定事件
			
				bind_event(li_elem);
			};

			myEventHandler(input_area, 'keypress', function (e) {
				var e = e || window.event,
					key = e.keyCode || e.which || e.charCode;
				if (key == 13) {
					appendNew(input_area.value);
				}
			});
		}();
})(window);
