(function (window) {
	'use strict';

	//Your starting point. Enjoy the ride!


	var todoMVC = function () {

		var bindEvent = function () {

			//私有成员
			var $clrcompl = $('button.clear-completed'),
				$footer = $('.footer'),
				$main = $('.main');


			//私有方法
	
			//用于更新剩余条数显示的函数,并返回一个布尔值
			var $hasItem = function () {
				var item_l = $('.todo-list').find('li').length;
				if (item_l === 0) return false;
				$('.todo-count').find('strong').html(item_l);
				return true;
			};
			//dom树上的先统计一下……
			$hasItem(); 
			//判断主干部分是否显示（涉及列表项的操作都需要执行该功能）
			var $displayMF = function () {
				var flag = $hasItem();
				if ( flag ) {
					$footer.show();
					$main.show();
				} else {
					$footer.hide();
					$main.hide();
				}
			};
			//是否需要勾上全选或取消全选的checkbox
			var $isAllCompleted = function () {
				var libox = $('ul.todo-list').find('li');
				libox.filter('.completed').length === libox.length ?
				$('#toggle-all').prop('checked', true) : 
				$('#toggle-all').prop('checked', false);
			};
			//清除完成项按钮是否显示；
			var $toggleClrCompl = function () {
				var $libox = $('ul.todo-list').find('li');
				$libox.hasClass('completed') ? 
				$clrcompl.show() : $clrcompl.hide();
			};



			// 全局绑定


			// 全选全不选按钮
			$('#toggle-all').on('click',function () {
				var $item_toggle = $('input.toggle'),
					$item = $('ul.todo-list').find('li');

				if (this.checked === true) {
					$item_toggle.prop('checked', true);  
					$item.addClass('completed');
				} else {
					$item_toggle.prop('checked', false);
					$item.removeClass('completed');
				}
				$toggleClrCompl();
			});
	
			// 筛选按钮事件绑定
			var $filters = function () {
				var $filters = $('ul.filters').find('li');
				var $getSelected = function (filter) {
					$(filter).addClass('selected')
							.parent().siblings().find('a').removeClass('selected');
				}

				//all按钮
				$filters.eq(0).find('a').on('click', function () {
					$('.todo-list').find('li').show();
					$getSelected(this);
				});
				//active按钮
				$filters.eq(1).find('a').on('click', function () {
					$('.todo-list').find('li').show()
									.filter('.completed').hide();
					$getSelected(this);
				});
				// comleted按钮
				$filters.eq(2).find('a').on('click', function () {
					$('.todo-list').find('li').hide()
									.filter('.completed').show();
					$getSelected(this);
				});
			}();

			//清空完成项按钮事件绑定
			$clrcompl.on('click', function () {
				$('ul.todo-list').find('li.completed').remove();
				$displayMF();
				$(this).hide();
			});


			//list子元素接口
			var $checkCompleted = function (item) {
				item.find('input.toggle').prop('checked') === true ?
				item.addClass('completed') : item.removeClass('completed');
				$isAllCompleted();
				$toggleClrCompl();
			};
			var $deleteItem = function (item) {
				item.remove();
				$isAllCompleted(); //是否处于全选
				$toggleClrCompl();	//是否有完成项
				$displayMF();	//列表是否为空
			};
			var $getEditing = function (e) {
				var flag = $(this).hasClass('completed'),
					$input_c = $(this).find('input.edit'),
					input_d = this.getElementsByTagName('input')[1],
					$label_c = $(this).find('label'),
					$that = $(this);
				var $quitEditing = function (e) {
					var e = e || window.event,
						tar = e.target || e.srcElement,
						key = e.keyCode || e.which || e.charCode;

					e.stopPropagation();
					if ( key == 13 || tar !== input_d ) {
						$that.removeClass('editing');
						$that.val() === '' ? '' : $label_c.text($input_c.val());
						$(document).off('click');
					}
				};
				if ( flag ) {
					return false;
				} else {
					$(this).addClass('editing');

					$input_c.val($label_c.text()).focus();
					$(document).on('click', $quitEditing);
					$input_c.on('keypress', $quitEditing);
				}
			};

			return function (item) {
				var destroybtn = item.find('button.destroy'),
					checkbtn = item.find('input.toggle');

				//checkbox状态检验html中的，并绑定单击事件
				$checkCompleted(item);
				checkbtn.on('click', function () {
					$checkCompleted(item);
				});

				//删除按钮绑定事件
				destroybtn.on('click', function () {
					$deleteItem(item);
				});

				//编辑状态事件绑定
				item.on('dblclick', $getEditing);

				//更新list item数；
				$hasItem();
			};

		}(); //bindEvent fn

		var createNew = function ()	{
			var $input_n = $('input.new-todo');
			var appendNew = function (val) {
				var $list = $('.todo-list'),
					$li = $(document.createElement('li')),
					str = '';

					str +=	'<div class="view">';
					str +=		'<input class="toggle" type="checkbox">';
					str +=		'<label>' + val +'</label>';
					str +=		'<button class="destroy"></button>';
					str +=	'</div>';
					str +=	'<input class="edit" value="Rule the web">';

				$li.html(str);
				$list.prepend($li);

				bindEvent($li);
			};
			$input_n.on('keypress', function (e) {
				var e = e || window.event,
					key = e.keyCode || e.which || e.charCode,
					val = $(this).val();
				if ( key == 13 && val !== '') {
					appendNew(val);
					$(this).val('');
				}
			})
		}();  //createNew fn

		var activateOld = function() {
			var libox = $('.todo-list').find('li');
			libox.each(function(index, elem){
				bindEvent($(elem));
			});
		}(); //activateOld


	}();  //todoMVC fn
	
})(window);
