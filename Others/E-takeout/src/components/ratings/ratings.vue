<template>
	<div class="ratings-wrapper" ref="ratingsWrapper">
		<div class="ratings">
			<div class="basic-ratings">
				<div class="basic-ratings-left">
					<dl class="synthesis-rating">
						<dd class="score">{{ sellerR.score }}</dd>
						<dd class="title">综合评分</dd>
						<dd class="compare">高于周边商家{{ sellerR.rankRate}}%</dd>
					</dl>
				</div>
				<div class="basic-ratings-right">
					<dl class="particular-rating">
						<dd class="service-rating">
							<span class="title">服务态度</span>
							<rate-star :size="36" :score="sellerR.serviceScore"></rate-star>
							<span class="score">{{ sellerR.serviceScore }}</span>
						</dd>
						<dd class="food-rating">
							<span class="title">食物品质</span>
							<rate-star :size="36" :score="sellerR.foodScore"></rate-star>
							<span class="score">{{ sellerR.foodScore }}</span>
						</dd>
						<dd class="delivery-rating">
							<span class="title">送达时间</span>
							<span class="time">{{ sellerR.deliveryTime }}分钟</span>
						</dd>
					</dl>
				</div>
			</div>
			<i class="divider"></i>
			<comments-filters typePos="满意" typeNeg="不满意" @refresh="refreshRatingsScroll"></comments-filters>
			<div class="comments-display">
				<ul class="comments-display-list" >
					<li class="comments-display-item" v-for="comment in COMMENTS_COMPUTED">
						<dl class="comment-list">
							<dd class="comment-data-info">
								<div class="avatar">
									<img :src="comment.avatar" alt="">
								</div>
								<div class="info">
									<div class="username">{{ comment.username }}</div>
									<div class="consume-exp">
										<rate-star :size="24" :score="comment.score"></rate-star>
										<span class="delivery-time" v-if="comment.deliveryTime !== ''">{{ comment.deliveryTime }}分钟送达</span>
									</div>
								</div>
								<div class="time">
									{{ comment.rateTime }}
								</div>
							</dd>
							<dd class="comment-data-content">
								<p class="text">{{ comment.text }}</p>
							</dd>
							<dd class="comment-data-recommend">
								<span class="icon" :class="{'icon-thumb_up': comment.rateType === 0, 'icon-thumb_down': comment.rateType === 1}"></span><span class="cuisine" v-for="cuisine in comment.recommend">{{ cuisine }}</span>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
  import rateStar from './../rateStar/rateStar'
  import commentsFilters from './../commentsFilters/commentsFilters'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import BScroll from 'better-scroll'
  import data from './../../../data.json'

  // const ERR_OK = 0
  export default {
    name: 'ratings',
    props: {
      seller: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        counter: 0,
        ratings: []
      }
    },
    created () {
      // this.$http.get('/api/dataRate').then(response => {
      //   if (response.body.errno === ERR_OK) {
      //     this.ratings = response.body.data
      //   }
      // }, response => {})
      // this.$nextTick(() => {
      //   this._initRatingsScroll()
      // })
      this.ratings = data.ratings
      this.$nextTick(() => {
        this._initRatingsScroll()
      })
    },
    computed: {
      ...mapGetters('comments', [
        'COMMENTS_COMPUTED'
      ]),
      ...mapState('comments', {
        NAME: state => state.name
      }),
      sellerR () {
        if (this.seller.name) return this.seller
        return false
      }
    },
    watch: {
      ratings: function (newVal, oldVal) {
        this.init_comments(this.ratings)
        this.refreshRatingsScroll()
      }
    },
    activated () {
      this.init_comments(this.ratings)
      this.refreshRatingsScroll()
    },
    methods: {
      ...mapActions('comments', [
        'init_comments'
      ]),
      _initRatingsScroll () {
        this.ratingsScroll = new BScroll(this.$refs.ratingsWrapper, {
          click: true
        })
      },
      refreshRatingsScroll () {
        this.$nextTick(() => {
          this.ratingsScroll.refresh()
        })
      }
    },
    components: { rateStar, commentsFilters }
  }
</script>

<style lang="less">
	@import "./../../assets/less/mixin";

	.ratings-wrapper {
		height: 100%;
		width: 100%;
		overflow: hidden;
		.basic-ratings {
			display: flex;
			padding: 18px 0;
			.basic-ratings-left {
				text-align: center;
				font-weight: 400;
				max-width: 138px;
				flex-shrink: 1;
				flex-grow: 1;
				position: relative;
				.synthesis-rating {
					display: inline-block;
					vertical-align: middle;
				}
				.score {
					font-size: 24px;
					color: rgb(255, 153, 0);
					line-height: 28px;
				}
				.title {
					font-size: 12px;
					color: rgb(7, 17, 27);
					font-size: 12px;
					padding: 6px 0;
				}
				.compare {
					font-size: 10px;
					line-height: 10px;
					color: rgb(147, 153, 159);
					padding: 2px 0 6px;
				}
				&:after {
					content: '';
					width: 1px;
					display: inline-block;
					position: absolute;
					right: 0;
					background-color: rgba(7, 17, 27, .1);
					height: 100%;
					vertical-align: middle;
					transform: scaleX(.5)
				}
			}
			.basic-ratings-right {
				font-weight: 400;
				flex-grow: 1;
				font-size: 0;
				.particular-rating {
					width: 188px;
					padding: 0 24px;
				}
				@media screen and (max-width: 375px) {
					.particular-rating {
						width: 188px;
						padding: 0;
						margin: 0 auto;
					}
				}
				dd:nth-of-type(2) {
					margin: 8px 0;
				}
				.title {
					display: inline-block;
					vertical-align: middle;
					font-size: 12px;
					color: rgb(7, 17, 27);
					padding-right: 12px;
				}
				.rate-star {
					display: inline-block;
					padding-right: 12px;
					vertical-align: middle;
				}
				.score {
					display: inline-block;
					font-size: 12px;
					color: rgb(255, 153, 0);
					line-height: 18px;
					vertical-align: middle;
				}
				.time {
					display: inline-block;
					font-size: 12px;
					color: rgb(147, 153, 159);
					line-height: 18px;
					vertical-align: middle;
				}
			}
		}
		.comments-display {
			.comments-display-item {
				.border-1px;
				padding: 0 18px;
			}
			.comment-list {
				padding: 18px 0;
				font-weight: 400;
				.comment-data-info {
					display: flex;
					.avatar {
						height: 28px;
						width: 28px;
						border-radius: 50%;
						overflow: hidden;
						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}
					.info {
						padding-left: 12px;
						font-size: 0;
						flex-grow: 1;
						.username {
							font-size: 10px;
							color: rgb(7, 17, 27);
							line-height: 12px;
						}
						.consume-exp {
							padding-top: 4px
						}
						.rate-star {
							display: inline-block;
						}
						.delivery-time {
							font-size: 10px;
							font-weight: 200;
							color: rgb(147, 153, 159);
							line-height: 12px;
							display: inline-block;
							padding-left: 6px;
						}
					}
					.time {
						font-size: 10px;
						font-weight: 200;
						color: rgb(147, 153, 159);
						line-height: 12px;
					}
				}
				.comment-data-content {
					padding-left: 40px;
					padding-top: 6px;
					.text {
						font-size: 12px;
						color: rgb(7, 17, 27);
						line-height: 18px;
					}
				}
				.comment-data-recommend {
					padding-left: 40px;
					display: flex;
					flex-flow: wrap;
					margin-right: -8px;
					.icon {
						font-size: 12px;
						color: rgb(0, 160, 220);
						line-height: 16px;
						margin-right: 8px;
						margin-top: 8px;
					}
					.icon-thumb_down {
						color: rgb(147, 153, 159);
					}
					.cuisine {
						margin-top: 8px;
						margin-right: 8px;
						padding: 0 6px;
						max-width: 62px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 9px;
						color: rgb(147, 153, 159);
						line-height: 16px;
						border: 1px solid rgba(7, 17, 27, .1);
						border-radius: 1px;
						display: inline-block;
						background-color: #fff;
					}
				}
			}
		}
	}
</style>