<template>
		<div class="header">

			<div class="info">
				<div class="avatar-wrapper">
					<div class="avatar">
						<img :src="seller.avatar" alt="">
					</div>
				</div>  <!-- avatar-wrapper -->
				<div class="description-wrapper">

					<div class="name">
						<span class="icon-name"></span>
						<span class="text">{{ seller.name }}</span>
					</div>
					<div class="desc">
						{{ seller.description }} / {{ seller.deliveryTime }} 分钟送达
					</div>
					<div class="support" v-if="seller.supports">
						<span class="icon-support" :class="classMap[seller.supports[0].type]"></span>
						<span class="text">{{ seller.supports[0].description }}</span>
						<div class="amount" @click="showDetail=true">
							<span>{{ seller.supports.length }}个</span><i class="icon-keyboard_arrow_right"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="bulletin">
				<i class="icon-keyboard_arrow_right" @click="showDetail=true"></i><span class="icon-bulletin"></span><span class="text">{{ seller.bulletin }}</span>
			</div>
			<transition name="slide">
					<div class="detail" v-show="showDetail">
						<h1> {{ seller.name }}</h1>
						<div class="star-wrapper">
							<rate-star :score="seller.score" :size="48" class="seller-rate"></rate-star>
						</div>
						<div class="section-wrapper">
							<div class="title">
								<h2>优惠信息</h2>
							</div>
							<ul v-if="seller.supports" class="supports-list">
								<li v-for="support in seller.supports" class="supports-item">
									<span class="icon-support" :class="classMap[support.type]"></span>
									<span class="text">{{ support.description }}</span>
								</li>
							</ul>
						</div>
						<div class="section-wrapper">
							<div class="title">
								<h2>商家公告</h2>
							</div>
							<p class="bulletin-desc">
								{{ seller.bulletin }}
							</p>
						</div>
						<div class="close">
							<i class="icon-close" @click="showDetail = false"></i>
						</div>
				</div>
			</transition>
			<div class="avatar-blur">
				<img :src="seller.avatar" alt="">
			</div>
		</div> <!-- header -->
</template>

<script>
import rateStar from './../rateStar/rateStar'

export default {
  name: 'header',
  data () {
    return {
      classMap: [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ],
      showDetail: false
    }
  },
  props: {
    seller: Object
  },
  components: {
    rateStar
  }
}
</script>

<style lang="less">
	@import "./../../assets/less/mixin";
	.slide-enter-active, .slide-leave-active {
		transition: all .3s ease;
	}
	.slide-enter, .slide-leave-to {
		opacity: 0;
		transform: translateX(50%);
	}
	.header {
		background-color: rgba(7, 17, 27, .5);
		color: rgb(255, 255, 255);
		font-weight: 200;
		font-size: 0;
		position: relative;
		overflow: hidden;
		.decrease { .image('./decrease_1') }
		.discount { .image('./discount_1') }
		.guarantee { .image('./guarantee_1') }
		.invoice { .image('./invoice_1') }
		.special { .image('./special_1') }
		.info {
		 	padding: 24px 12px 18px 24px;
		 	display: flex;
		 }
		.avatar-wrapper {
			display: inline-block;
			vertical-align: top;
			margin-right: 16px; 
			.avatar{
				width: 64px;
				height: 64px;
				border-radius: 2px;
				overflow: hidden;
			}
			img {
				width: 100%;
				height: 100%;
			}
		}
		.description-wrapper {
			display: inline-block;
			padding: 2px 0;
			flex-grow: 1;
			.name {
				font-size: 0;
				.text {
					font-size: 16px;
					line-height: 18px;
					font-weight: 700;
					padding-left: 6px;
				}
				.icon-name {
					width: 30px;
					height: 18px;
					display: inline-block;
					vertical-align: top;
					background-size: 30px 18px;
					.image('./brand');
				}
			}
			.desc {
				font-size: 12px;
				line-height: 12px;
				margin: 8px 0 3px;
			}
			.support {
				font-size: 0;
				padding-top: 7px;
				position: relative;
				.text {
					font-size: 10px;
					line-height: 12px;
					padding-left: 4px;
					vertical-align: top;
				}
				.icon-support {
					display: inline-block;
					width: 12px;
					height: 12px;
					background-size: 12px 12px;
				}
				.amount {
					position: absolute;
					top: 0;
					right: 0;
					border-radius: 24px;
					font-size: 10px;
					line-height: 12px;
					padding: 7px 8px;
					background-color: rgba(0, 0, 0, .2);
					i {
						vertical-align: middle;
						padding-left: 2px;
					}
				}
			}
		}
		.bulletin {
			position: relative;
			background-color: rgba(7, 17, 27, .2);
			padding-left: 12px;
			padding-right:  26px;
			text-overflow: ellipsis;
			white-space:nowrap;
			overflow: hidden;
			font-size: 10px;
			line-height: 28px;
			.text {
				padding-left: 4px;
			}
			.icon-bulletin {
				width: 22px;
				height: 12px;
				display: inline-block;
				vertical-align: top;
				margin: 8px 0;
				background-size: 22px 12px;
				.image('./bulletin');
			}
			i {
				position: absolute;
				padding-right: 12px;
				right: 0;
				line-height: 28px;
				margin-left: 4px;
			}
		}
		.detail {
			width: 100%;
			box-sizing: border-box;
			min-height: 100%;
			backdrop-filter: blur(10px);
			top: 0;
			left: 0;
			position: fixed;
			z-index: 100;
			padding: 64px 36px 64px;
			background-color: rgba(7, 17, 27, .8);
			h1 {
				font-size: 16px;
				line-height: 16px;
				font-weight: 700;
				text-align: center;
			}
			.star-wrapper {
				text-align: center;
				.seller-rate {
					margin-top: 16px;
				}
			}
			.title {
				display: flex;
				align-items: center;
				margin: 28px 0 24px;
				h2 {
					padding: 0 12px;
					font-size: 14px;
					font-weight: 700;
					vertical-align: middle;
				}
				&::before, &::after {
					content: '';
					flex-grow: 1;
					background-color: rgba(255, 255, 255, .2);
					height: 1px;
					transform: scaleY(.5);
				}
			}
			.supports-list {
				margin-bottom: -12px;
				.supports-item {
					margin-bottom: 12px;
					padding: 0 12px;
					.icon-support {
						display: inline-block;
						vertical-align: middle;
						width: 16px;
						height: 16px;
						background-size: 16px 16px;
					}
					.text {
						font-size: 12px;
						line-height: 12px;
						display: inline-block;
						vertical-align: middle;
						padding-left: 6px;
					}
				}
			}
			.bulletin-desc {
				padding: 0 12px;
				font-size: 12px;
				line-height: 24px;
			}
			.close {
				position: absolute;
				bottom: 32px;
				margin: 0 auto;
				font-size: 32px;
				width: 32px;
				height: 32px;
				left: 0;
				right: 0;
				text-align: center;
				color: rgba(255, 255, 255, .5);
				i {
					display: block;
				}
			}
		}
		.avatar-blur {
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			img {
				width: 100%;
				filter: blur(10px);
			}
		}
	}
</style>