## 笔记 

### jquery的checkbox选中
- （setAttribute）不能控制input的checked状态……  <br/>
只要有checked=""属性设置 无论什么值 都相当于checked。<br/>
	只能用checkebox.checked设置
    
    

		var toggle = document.querySelector('.toggle');
	 	toggle.setAttribute('checked', 'checked');
	 	console.log('checkedAttribute:' + toggle.getAttribute('checked'));
	 	console.log(toggle.checked); //输出true 

	 	toggle.setAttribute('checked', '');
		 console.log('checkedAttribute now is :' + toggle.getAttribute('checked'));
	 	console.log(toggle.checked); //还是输出true，setAttribute不起作用

- $item_toggle.attr('checked', 'checked'|'')这个是无论取啥值都是checked="checked"…… <br/>
- $item_toggle.attr('checked', true|false) 加载的时候倒是可以.
但一点子checkbox就会出错，保存为手动修改后的状态，无法统一设置true/false，相当于只设置了checked-all下面子checkbox的初始状态吧……
$item_toggle.attr，removeAttr效果同上……<br/>
- 只能使用$item_toggle.prop方法  <br/>