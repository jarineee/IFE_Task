<template>
	<div class="see-more" ref="seeMore">
		<div class="content-wrapper">
			<div class="basic-wrapper">
				<div class="see-more-image">
					<img :src="item.image" alt="">
				</div>
				<div class="see-more-info">
					<h2 class="info-title">{{ item.name }}</h2>
					<div class="info-sell">
						<span class="count">月售{{ item.sellCount }}份</span><span class="rating">好评率{{item.rating}}%</span>
						</div>
					<div class="info-price">
						<span class="price-current">{{ item.price }}</span><span class="price-pass" v-if="item.oldPrice">{{ item.oldPrice }}</span>
						<quantity-ctrl :name="item.name" :price="item.price">
							<span class="add-to-cart" slot="addNew">加入购物车</span>
						</quantity-ctrl>
					</div>
				</div>
			</div>
			<i class="divider"></i>
			<div class="introduction-wrapper">
				<div class="see-more-introduction">
					<h2 class="intro-title">商品介绍</h2>
					<p class="intro-para" v-if="item.description !== ''">
						{{ item.description }}
					</p>
					<p class="intro-para" v-else>
						该商品暂时没有相关介绍。
					</p>
				</div>
			</div>
			<i class="divider"></i>
			<div class="comments-wrapper">
				<div class="see-more-comments">
					<h2 class="title-comments">商品评论</h2>
					<comments-filters @refresh="refreshScroll"></comments-filters>
					<div class="comments-display-list">
						<ul v-if="COMMENTS_COMPUTED.length > 0">
							<li v-for="comment in COMMENTS_COMPUTED" class="comments-display-item">
								<div class="comment-info">
									<span class="time">{{ comment.rateTime }}</span>
									<span class="username">{{ comment.username }}</span>
									<span class="avatar">
										<img :src="comment.avatar" alt="">
									</span>
								</div>
								<p class="comment-content">
									<span class="comment-icon" :class="{'icon-thumb_down': comment.rateType === 1, 'icon-thumb_up': comment.rateType === 0}"></span>
										<span class="comment-text">{{ comment.text }}</span>
								</p>
							</li>
						</ul>
						<p v-else class="comment-empty">
							暂无相关评论！
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapGetters, mapActions } from 'vuex'
  import commentsFilters from './../commentsFilters/commentsFilters'
  import quantityCtrl from './../quantityCtrl/quantityCtrl'

  export default {
    name: 'see-more',
    props: {
      goodsData: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        computedItem: {}
      }
    },
    created () {
      this.$nextTick(() => {
        this._initSeeMoreScroll()
      })
    },
    computed: {
      ...mapGetters('comments', [
        'COMMENTS_COMPUTED'
      ]),
      item () {
        const indexS = this.$route.query.i_S
        const indexF = this.$route.query.i_F
        if (this.goodsData.length !== 0) {
          const itemObj = this.goodsData[indexS].foods[indexF]
          this.computedItem = itemObj
          return itemObj
        }
        return false
      }
    },
    watch: {
      computedItem: function (newVal, oldVal) {
        this.init_comments(newVal.ratings)
        this.refreshScroll()
      }
    },
    methods: {
      ...mapActions('comments', [
        'init_comments'
      ]),
      _initSeeMoreScroll () {
        this.seeMoreScroll = new BScroll(this.$refs.seeMore, {
          click: true
        })
      },
      refreshScroll () {
        this.$nextTick(() => {
          this.seeMoreScroll.refresh()
        })
      }
    },
    components: { commentsFilters, quantityCtrl }
  }
</script>

<style lang="less">
@import "./../../assets/less/mixin";
	.see-more {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		padding-bottom: 48px;
		overflow: hidden;
		background-color: #fff;
		.content-wrapper {
			padding-bottom: 48px;
		}
		.see-more-image {
			position: relative;
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			img {
				object-fit: cover;
				position: absolute;
				width: 100%;
				height: 100%;
			}
		}
		.see-more-info {
			padding: 18px;
			.info-title {
				font-size: 14px;
				font-weight: 700;
				color: rgb(7, 17, 27);
				line-height: 14px;
			}
			.info-sell {
				font-size: 10px;
				color: rgb(147, 153, 159);
				line-height: 10px;
				padding: 8px 0;
				.rating {
					padding-left: 12px;
				}
			}
			.info-price {
				padding-top: 10px;
				font-weight: 700;
				display: flex;
				.quantity-ctrl {
					flex-grow: 1;
					text-align: right;
				}
				.price-current {
					font-size: 14px;
					line-height: 24px;
					color: rgb(240, 20, 20);
					&::before {
						font-size: 10px;
					}
				}
				.price-pass {
					font-size: 10px;
					color: rgb(147, 153, 159);
					text-decoration: line-through;
					padding-left: 12px;
					line-height: 24px;
				}
				[class^="price-"]::before {
					content: '¥';
					font-weight: 200;
				}
			}
		}
		.see-more-introduction {
			padding: 18px;
			.intro-title {
				color: rgb(7, 17, 27);
				padding-bottom: 6px;
			}
			.intro-para {
				padding: 0 8px;
				font-size: 12px;
				line-height: 24px;
				color: rgb(77, 85, 93);
			}
		}
		.see-more-comments {
			.title-comments {
				padding: 18px 18px 0 18px;
				font-size: 14px;
				line-height: 14px;
				color: rgb(7, 17, 27);
			}

			.comments-display-list {
				.comment-empty {
					text-align: center;
					padding: 18px;
					font-size: 12px;
					color: rgb(7, 17, 27);
					line-height: 16px;
					padding-left: 4px;
				}
				.comments-display-item {
					padding: 16px 18px;
					font-size: 0;
					.border-1px;
					&::after {
						position: relative;
						bottom: -16px;
					}
					&:last-child::after{
						content: none;
					}
					.comment-info {
						display: flex;
						font-size: 10px;
						line-height: 12px;
						color: rgb(147, 153, 159);
						justify-content: space-between;
						.avatar {
							height: 12px;
							width: 12px;
							border-radius: 50%;
							overflow: hidden;
							img {
								width: 100%;
								object-fit: cover;
							}
						}
						.time {
							flex-grow: 1;
						}
						.username {
							padding-right: 6px;
						}
					}
					.comment-content {
						padding-top: 6px;
						.comment-icon {
							font-size: 12px;
							color: rgb(147, 153, 159);
							line-height: 16px;
						}
						.icon-thumb_up {
							color: rgb(0, 160, 220);
						}
						.comment-text {
							font-size: 12px;
							color: rgb(7, 17, 27);
							line-height: 16px;
							padding-left: 4px;
						}
					}
				}
			}
		}
	}
</style>