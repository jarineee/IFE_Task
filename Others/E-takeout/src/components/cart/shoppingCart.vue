<template>
<div class="cart-wrapper">
	<div class="shoppingcart" :class="{'order': ORDER_AMOUNT}">
		<div class="left">
			<div class="icon-shoppingcart" @click="toggleCartContent = !toggleCartContent">
				<span class="icon-shopping_cart"></span>
				<span class="shoppingcart-amount" v-show="ORDER_AMOUNT">{{ ORDER_AMOUNT }}</span>
			</div>
			<span class="total">¥ {{ PRICE_TOTAL }}</span>
		</div>
		<div class="center">
			另需配送费 ¥ {{ seller.deliveryPrice }}元
		</div>
		<div class="right" :class="{'checkout': calcLeft <= 0}">
			<span v-if="PRICE_TOTAL === 0">¥ {{ seller.minPrice }}起送</span>
			<span v-else-if="calcLeft > 0">还差 ¥ {{ calcLeft }}起送</span>
			<span v-else>结算</span>
		</div>
	</div>
	<transition name="content-slide">
		<div class="cart-content-wrapper" v-show="showCartContent">
			<div class="cart-content">
				<div class="top">
					<h2 class="title">购物车</h2>
					<span class="empty" @click="empty_Order">清空</span>
				</div>
				<div class="shopping-list-wrapper">
					<div class="shopping-list" ref="shoppingList">
						<ul>
							<li class="shopping-list-item" v-for="(item, index) in ORDER">
								<dl class="item-detail">
									<dt class="title">{{ item.name }}</dt>
									<dd class="price">
										<span class="icon">¥</span><span class="number">{{ item.price }}</span>
									</dd>
									<dd>
										<quantity-ctrl :index="index">
										</quantity-ctrl>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="mask" @click="toggleCartContent = false"></div>
		</div>
	</transition>
	<div class="balls-animate" >
		<transition name="ball-drop"  v-for="(ball, index) in BALLDISPLAY" :key="'ball-' + index"
								@before-enter="beforeEnter" 
								@enter="enter" 
								@after-enter="afterEnter">
			<div class="ball" v-show="ball.show">
				<i class="inner"></i>
			</div>
		</transition>
	</div>
</div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import quantityCtrl from './../quantityCtrl/quantityCtrl'
  import BScroll from 'better-scroll'

  export default {
    name: 'shoppingCart',
    props: {
      seller: Object
    },
    data () {
      return {
        toggleCartContent: false
      }
    },
    created () {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    computed: {
      ...mapState({
        ORDER: state => state.shoppingCart.ORDER,
        BALLDISPLAY: state => state.shoppingCart.BALLSHELL
      }),
      ...mapGetters('shoppingCart', [
        'ORDER_AMOUNT',
        'PRICE_TOTAL'
      ]),
      calcLeft () {
        const result = this.seller.minPrice - this.PRICE_TOTAL
        return result
      },
      showCartContent () {
        if (this.ORDER.length > 0 && this.toggleCartContent === true) {
          this.$nextTick(() => {
            this.shoppingListScroll.refresh()
          })
          return true
        } else {
          this.toggleCartContent = false
          return false
        }
      }
    },
    methods: {
      ...mapActions('shoppingCart', [
        'empty_Order',
        'shift_BallQueue'
      ]),
      _initScroll () {
        this.shoppingListScroll = new BScroll(this.$refs.shoppingList, {
          click: true
        })
      },
      beforeEnter (el) {
        let count = this.BALLDISPLAY.length
        while (count--) {
          let shell = this.BALLDISPLAY[count]
          if (shell.show && shell.target.offsetHeight !== 0) {
            let rect = shell.target.getBoundingClientRect()
            let left = rect.left
            let top = rect.top
            el.style.display = ''
            el.style.transform = `translate3d(0, ${top}px, 0)`
            el.style.webkitTransform = `translate3d(0, ${top}px, 0)`
            let inner = el.children[0]
            inner.style.transform = `translate3d(${left}px, 0, 0)`
            inner.style.webkitTransform = `translate3d(${left}px, 0, 0)`
          }
        }
      },
      enter (el) {
        let wHeight = window.screen.height
        let inner = el.children[0]
        let top = wHeight - 42
        let left = 28
        this.$nextTick(() => {
          el.style.webkitTransform = `translate3d(0, ${top}px, 0)`
          el.style.transform = `translate3d(0, ${top}px, 0)`
          inner.style.webkitTransform = `translate3d(${left}px, 0, 0)`
          inner.style.transform = `translate3d(${left}px, 0, 0)`
        })
      },
      afterEnter (el) {
        this.shift_BallQueue()
        el.style.display = 'none'
      }
    },
    components: { quantityCtrl }
  }
</script>

<style lang="less">
@import "../../assets/less/mixin";

	.shoppingcart {
		position: absolute;
		width: 100%;
		bottom: 0;
		z-index: 20;
		background-color: #141d27;
		display: flex;
		.left {
			padding: 12px 0 12px 68px;
			color: rgba(255, 255, 255, .4);
			.icon-shoppingcart {
				position: absolute;
				bottom: 0;
				left: 0;
				margin-bottom: 2px;
				margin-left: 12px;
			}
			.icon-shopping_cart {
				display: block;
				font-size: 24px;
				line-height: 24px;
				border-radius: 50%;
				overflow: hidden;
				border: 6px solid #141d27;
				background-color: #141d27;
				&::before {
					display: inline-block;
					padding: 10px;
					background-color: rgba(255, 255, 255, .1);
				}
			}
			.total{
				display: inline-block;
				font-size: 16px;
				font-weight: 700;
				line-height: 24px;
				padding-left: 12px;
				
			}
			&::after {
					content: '';
					width: 1px;
					height: 100%;
					background-color: rgba(255, 255, 255, .1);
					display: inline-block;
					vertical-align: middle;
					margin: 0 12px;
				}
		}
		.center {
			flex-grow: 1;
			font-size: 10px;
			line-height: 24px;
			padding: 12px 0;
			color: rgba(255, 255, 255, .4);
		}
		.right {
			font-size: 12px;
			text-align: center;
			max-width: 105px;
			flex-grow: 1;
			flex-basis: auto;
			box-sizing: border-box;
			line-height: 24px;
			color: rgba(255, 255, 255, .4);
			font-weight: 700;
			background-color: rgba(255, 255, 255, .1);
			padding: 12px 8px;
			&.checkout {
			background-color: #00b43c;
			color: #fff;
			}
		}
	}
	.cart-content-wrapper {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		.mask {
			width: 100%;
			height: 100%;
			background-color: rgba(7, 17, 27, .6);
			backdrop-filter: blur(10px);
		}
	}
	.cart-content {
			position: absolute;
			width: 100%;
			box-sizing: border-box;
			bottom: 0;
			padding-bottom: 48px;
			left: 0;
			.top {
				box-sizing: border-box;
				background-color: #f3f5f7;
				position: relative;
				.title {
					padding-left: 18px;
					font-size: 14px;
					font-weight: 200;
					color: rgb(7, 17, 27);
					line-height: 40px;
				}
				.empty {
					padding: 0 18px;
					position: absolute;
					right: 0;
					top: 0;
					font-size: 12px;
					color: rgb(0, 160, 220);
					line-height: 40px;
				}
				.border-1px(rgba(7, 17, 27, .1));
			}
			.shopping-list {
				background-color: #fff;
				max-height: 217px;
			 	overflow: hidden;
				.shopping-list-item {
					padding: 0 18px;
					.item-detail {
						display: flex;
						padding: 12px 0;
						vertical-align: top;
					}
					.title {
						flex-grow: 1;
						font-size: 14px;
						color: rgb(7, 17, 27);
						line-height: 24px;
						font-weight: 700;
					}
					.price {
						line-height: 24px;
						color: rgb(240, 20, 20);
						padding-right: 12px;
						.icon {
							font-size: 10px;
						}
						.number {
							font-size: 14px;
							font-weight: 700;
						}
					}
					.border-1px(rgba(7, 17, 27, .1))
				}
			}
		}
	.shoppingcart.order {
		.left {
			color: #fff;
			.icon-shopping_cart {
				background-color: rgb(0, 160, 220);
				&::before {
					background-color: transparent;
				}
			}
			.shoppingcart-amount {
				position: absolute;
				text-align: center;
				border-radius: 16px;
				background-color: rgb(240, 20, 20);
				min-width: 12px;
				padding: 0 6px;
				font-size: 9px;
				line-height: 16px;
				font-weight: 700;
				top: 0;
				right: 0;
				box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .4)
			}
		}
	}
	.cart-wrapper {
		.content-slide-enter,
		.content-slide-leave-to {
			transform: translateY(40px);
			opacity: 0
		}
		.content-slide-enter-active,
		.content-slide-leave-active {
			transition: all .3s
		}
	}
	.balls-animate {
		position: absolute;
		top: 0;
	}
	.inner {
		display: inline-block;
		width: 18px;
		height: 18px;
		background-color: #00a0dc;
		border-radius: 50%;
		margin: 3px;
	}
	.ball {
		position: fixed;
		z-index: 21;
	}
	.ball-drop-enter-active {
		transition: all .5s cubic-bezier(.49, -0.29, 0.75, 0.41);
		.inner {
			transition: all .5s linear;
		}
	}
</style>