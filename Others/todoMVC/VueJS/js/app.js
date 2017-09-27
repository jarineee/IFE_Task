(function (window) {
	'use strict';
	// Your starting point. Enjoy the ride!
	var vm = new Vue({
		el: '#app',
		data: {
			todoList: [
				{content: 'Buy a Unicorn', completed: false, createDate: 123},
				{content: 'Buy a Rainbow', completed: false, createDate: 456},
				{content: 'Buy a flutterShy', completed: false, createDate: 789}
			],
			filter: 0,
			newTodo: '',
			completedConut: 0,
			allComp: false,
			documentQuit: false
		},
		computed: {
			computedList: function () {
				let max = this.todoList.length;
				let result_comp = [];
				let result_act = [];
				let output = [];

				for (var i = 0; i < max; i++) {
					let item = this.todoList[i];
					if (item.completed) {
						result_comp.push(item);
					} else {
						result_act.push(item);
					}
				}

				this.completedCount = result_comp.length;

				switch (this.filter) {
					case 0: 
						output = this.todoList;
						break;
					case 1:
						output = result_act;
						break;
					case 2:
						output = result_comp;
						break;
				}
				// 完成事项的条数与全部事项条数一致且完成事项长度不为0？ 显示全选 ： 取消全选；
				this.allComp = this.completedCount === this.todoList.length;
				return output;
			}
		},
		methods: {
			setFilter: function (num) {
				this.filter = num;
			},
			addNew: function () {
				let todoObj = {};
				todoObj.content = this.newTodo;
				todoObj.completed = false;
				todoObj.createDate = new Date().getTime();
				this.newTodo = '';
				this.todoList.unshift(todoObj);
			},
			updateCont: function (cd, ct) {
				let max = this.todoList.length;
				while (max--) {
					if (this.todoList[max].createDate === cd) {
						this.todoList[max].content = ct;
						break;
					}
				}
			},
			updateComp: function (cd, c) {
				let max = this.todoList.length;
				while (max--) {
					if (this.todoList[max].createDate === cd) {
						this.todoList[max].completed = c;
						break;
					}
				}
			},
			deleteItem: function (cd) {
				let max = this.todoList.length;
				while (max--) {
					if (this.todoList[max].createDate === cd) {
						this.todoList.splice(max, 1);
						break;
					}
				}
			},
			toggleAll: function () {
				let max = this.todoList.length;
				while (max--) {
					this.todoList[max].completed = !this.allComp;
				}
				this.allComp = !this.allComp;
			},
			clrcp: function () {
				let max = this.todoList.length;
				while (max--) {
					if (this.todoList[max].completed) {
						this.todoList.splice(max, 1);
					}
				}
			}
		},
		components: {
			todoItem: {
				props: {
					content: {
						type: String,
						required: true
					},
					createDate: {
						type: Number
					},
					completed: {
						type: Boolean
					}
				},
				template: '<li :class="{ completed: completed, editing: isEdit }">'
							+ '<div class="view">'
								+ '<input class="toggle" type="checkbox" @click="compThis" :checked="completed">'
								+ '<label @dblclick="editThis()">{{ content }}</label>'
								+ '<button class="destroy" @click="delItem"></button>'
							+ '</div>'
							+ '<input class="edit" :value="content" v-model="todoContent" v-show="isEdit" @keyup.13="quitEdit" :ref="createDate">'
						+ '</li>',
				data: function () {
					return {
						editing: '',
						isEdit: false,
						todoContent: this.content
					}
				},
				methods: {
					editThis: function () {
						if (!this.completed) this.isEdit = true;
						let addEvent = document.addEventListener || document.attachEvent;
						addEvent('click', this.docListener);
					},
					docListener: function (e) {
						let event = e || window.event;
						let target = event.target || event.srcElement;
						if (target !== this.$refs[this.createDate]) {
							this.quitEdit()
						}
					},
					quitEdit: function () {
						this.isEdit = false;
						let removeEvent = document.removeEventListener || document.detachEvent;
						removeEvent('click', this.docListener);

						if (this.todoContent === '') {
							this.todoContent = this.content;
							return
						}
						this.$emit('update:cont', this.createDate, this.todoContent);
					},
					compThis: function () {
						this.isComp = !this.isComp;
						this.$emit('update:comp', this.createDate, !this.completed);
					},
					delItem: function () {
						this.$emit('delete', this.createDate,);
					}
				}
			}
		}
	})
})(window);
