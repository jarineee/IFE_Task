<template>
	<div class="seller-wrapper" ref="sellerWrapper">
		<div class="seller">
			<div class="seller-info" >
				<div class="seller-info-top">
					<div class="seller-info-basic">
						<div class="left">
							<h2 class="title">{{ sellerS.name }}</h2>
							<div class="info">
								<rate-star :size="36" :score="sellerS.score"></rate-star>
								<span class="rating-count">({{ sellerS.ratingCount }})</span>
								<span class="sell-count"> 月售{{ sellerS.sellCount }}单</span>
							</div>
						</div>
						<div class="right" @click="toggleFav">
							<span class="icon-favorite" :class="{'active': fav}"></span>
							<span class="text" v-if="fav">已收藏</span>
							<span class="text" v-else>收藏</span>
						</div>
					</div>
				</div>
				<div class="seller-info-bottom">
					<div class="delivery-at">
						<h3 class="title">起送价</h3>
						<span class="text"><span class="number">{{ sellerS.minPrice }}</span>元</span>
					</div>
					<div class="delivery-price">
						<h3 class="title">商家配送</h3>
						<span class="text"><span class="number">{{ sellerS.deliveryPrice }}</span>元</span>
					</div>
					<div class="delivery-time">
						<h3 class="title">平均配送时间</h3>
						<span class="text"><span class="number">{{ sellerS.deliveryTime }}</span>分钟</span>
					</div>
				</div>
			</div>
			<i class="divider"></i>

			<div class="seller-bulletin">
				<h2 class="title">公告与活动</h2>
				<div class="description">
					<p class="text">
						{{ sellerS.bulletin }}
					</p>
				</div>
				<dl class="activities-list" v-if="sellerS.supports">
					<dd class="activities-item" v-for="support in sellerS.supports">
						<span class="icon-item" :class="classMap[support.type]"></span><span class="text-item">{{ support.description }}</span>
					</dd>
				</dl>
			</div>
			<i class="divider"></i>

			<div class="seller-scene" v-if="sellerS.pics">
				<h3 class="title">商家实景</h3>
				<div class="gallery-wrapper" ref="galleryWrapper" >
					<div class="gallery" :style="{'width': sellerS.pics.length * 126 + 'px'}">
						<div class="image-wrapper" v-for="imageUrl in sellerS.pics">
							<img :src="imageUrl" alt="">
						</div>
					</div>
				</div>
			</div>
			<i class="divider"></i>

			<div class="seller-description">
				<h3 class="title">商家信息</h3>
				<ul v-if="sellerS.infos" class="desc-list">
					<li v-for="desc in sellerS.infos" class="desc-item">
						<p class="text">{{ desc }}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import rateStar from './../rateStar/rateStar'
	import { saveToLocal, loadFromLocal } from './../../assets/js/storage'
	import BScroll from 'better-scroll'
	
	export default {
	  name: 'seller',
	  props: {
	    seller: {
	      type: Object,
	      required: true
	    }
	  },
	  data () {
	    return {
	      classMap: [
	        'decrease',
	        'discount',
	        'special',
	        'invoice',
	        'guarantee'
	      ],
	      fav: ''
	    }
	  },
	  computed: {
	    sellerS () {
	      if (this.seller.name) {
	        this.$nextTick(() => {
	          if (!this.sellerScroll) {
	            this._initScroll()
	          } else {
	            this.refreshScroll()
	          }
	        })
	        if (this.seller.id) this.fav = loadFromLocal(this.seller.id, 'fav', false)
	        return this.seller
	      }
	      return false
	    }
	  },
	  methods: {
	    _initScroll () {
	      this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {
	        click: true
	      })
	      this.galleryScroll = new BScroll(this.$refs.galleryWrapper, {
	        click: true,
	        scrollX: true
	      })
	    },
	    refreshScroll () {
	      this.sellerScroll.refresh()
	      this.galleryScroll.refresh()
	    },
	    toggleFav () {
	      this.fav = !this.fav
	      saveToLocal(this.sellerS.id, 'fav', this.fav)
	    }
	  },
	  components: { rateStar }
	}
</script>

<style lang="less">
	@import "./../../assets/less/mixin";
	.seller-wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
		.seller {
			font-weight: 400;
			.title {
				font-size: 14px;
				line-height: 14px;
				color: rgb(7, 17, 27);
			}
			.seller-info {
				padding: 18px;
				.seller-info-top {
					.border-1px;
					.seller-info-basic {
						display: flex;
						justify-content: space-between;
						padding-bottom: 18px;
					}
					.right {
						text-align: center;
						.icon-favorite {
							display: block;
							width: 36px;
							font-size: 24px;
							line-height: 24px;
							color: rgb(147, 153, 159);
							&.active {
								color: rgb(240, 20, 20);
							}
						}
						.text {
							font-size: 10px;
							color: rgb(77, 85, 93);
							line-height: 10px;
							padding-top: 4px;
						}
					}
					.left {
						flex-flow: 1;
						.info {
							font-size: 0;
							padding-top: 8px;
							.rate-star {
								display: inline-block;
								vertical-align: middle;
							}
							.rating-count, .sell-count{
								display: inline-block;
								font-size: 10px;
								color: rgb(77, 85, 93);
								line-height: 18px;
								vertical-align: middle;
							}
							.rating-count { padding-left: 8px; }
							.sell-count { padding-left: 12px; }
						}
					}
				}
				.seller-info-bottom {
					padding-top: 18px;
					display: flex;
					.title {
						font-size: 10px;
						line-height: 10px;
						color: rgb(147, 153, 159);
						padding-bottom: 4px;
					}
					.number {
						font-size: 24px;
					}
					.text {
						font-size: 10px;
						font-weight: 200;
						color: rgb(7, 17, 27);
						line-height: 24px;
					}
					div {
						flex-grow: 1;
						text-align: center;
						position: relative;
						&::after {
							content: '';
							display: inline-block;
							height: 100%;
							width: 1px;
							background-color: rgba(7, 17, 27, .1);
							transform: scaleX(.5);
							position: absolute;
							top: 0;
							right: 0;
						}
						&:last-child::after {
							content: none;
						}
					}
				}
			}
			.seller-bulletin {
				padding: 18px;
				.description {
					.border-1px;
					.text {
						font-size: 12px;
						font-weight: 200;
						line-height: 24px;
						color: rgb(240, 20, 20);
						padding: 8px 0 16px;
					}
				}
				.activities-item {
					padding: 16px 0;
					.border-1px;
					&::after {
						position: relative;
						bottom: -16px;
					}
					&:last-child::after {
						content: none;
					}
					.icon-item {
						display: inline-block;
						vertical-align: middle;
						margin-left: 12px;
						width: 16px;
						height: 16px;
						background-size: 16px 16px;
					}
					.text-item {
						display: inline-block;
						vertical-align: middle;
						padding-left: 6px;
						font-size: 12px;
						font-weight: 200;
						color: rgb(7, 17, 27);
						line-height: 16px;
					}
				}
			}
			.seller-scene {
				padding: 18px;
				padding-right: 0;
				font-size: 0;
				.title {
					padding-bottom: 12px;
				}
				.gallery-wrapper {
					width: 100%;
					overflow: hidden;
				}
				.gallery {
					margin-right: -6px;
				}
				.image-wrapper {
					height: 90px;
					width: 120px;
					display: inline-block;
					margin-right: 6px;
					img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.gallery-detail {
					position: fixed;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					z-index: 100;
					background-color: rgba(7, 17, 27, .5);
				}
			}
			.seller-description {
				padding: 18px;
				padding-bottom: 0;
				.title {
					padding-bottom: 12px;
					.border-1px;
					&::after {
						position: relative;
						bottom: -12px;
					}
				}
				.desc-item {
					.border-1px;
					.text {
						font-size: 12px;
						font-weight: 200;
						color: rgb(7, 17, 27);
						line-height: 16px;
						padding: 16px 12px;
					}
					&:last-child::after {
						content: none;
					}
				}
			}
			.decrease { .image('./decrease_4'); }
			.discount { .image('./discount_4'); }
			.special { .image('./special_4'); }
			.invoice { .image('./invoice_4'); }
			.guarantee { .image('./guarantee_4'); }
		}
	}
</style>