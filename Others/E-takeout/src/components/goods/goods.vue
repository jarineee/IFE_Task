<template>
	<div class="goods">
		<div class="menu">
			<div class="menu-list" ref="menuList">
				<ul>
					<li v-for="(section, index) in goods" class="menu-list-item" :class="{'active': index === currentRange}" @click="anchorTo(index)">
						<span class="title">
							<span class="icon-menu" v-if="section.type !== -1" :class="classMap[section.type]"></span><span class="text">{{ section.name }}</span>
						</span>
					</li>
				</ul>
			</div>
			<div class="menu-detail-wrapper" ref="menuDetailWrapper">
				<div class="menu-detail">
					<div class="kind-section" v-for="(section, indexS) in goods" ref="kindSection">
						<h2 class="title-kind">{{ section.name }}</h2>
						<div class="food-detail-wrapper" v-for="(food, indexF) in section.foods">
							<div class="food-detail">
								<router-link tag="div" :to="{ path: '/goods/food_detail', query: { i_S: indexS, i_F: indexF}}" class="avatar-food" @click="getSeeMoreData(indexS, indexF)">
									<img :src="food.icon" alt="">
								</router-link>
								<div class="info-food">
									<h3 class="info-food-title">{{ food.name }}</h3>
									<p class="info-food-desc" v-if="food.description">
										{{ food.description }}
									</p>
									<div class="info-food-sell">
										<span class="sell-count">月售{{ food.sellCount}}份</span><span class="rating">好评率{{ food.rating }}%</span>
									</div>
									<div class="info-food-price">
										<span class="price-current">¥<span class="price-current-number">{{ food.price }}</span></span><span class="price-pass" v-if="food.oldPrice">¥<span class="price-pass-number">{{ food.oldPrice }}</span></span>
										<quantity-ctrl :name="food.name" :price="food.price">
											<span class="icon-add_circle" slot="addNew"></span>
										</quantity-ctrl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<transition name="slide">
				<router-view :goodsData="goods"></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
  import BScroll from 'better-scroll'
  import quantityCtrl from './../quantityCtrl/quantityCtrl'
  import seeMore from './../seeMore/seeMore'
  import data from './../../../data.json'

  // const ERR_OK = 0
  export default {
    name: 'goods',
    props: {
      seller: Object
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
        goods: [],
        heightMeter: [],
        currentPosY: 0
      }
    },
    created () {
      // this.$http.get('/api/dataGoods').then(response => {
      //   if (response.body.errno === ERR_OK) {
      //     this.goods = response.body.data
      //     this.$nextTick(() => {
      //       this._initScroll()
      //       this._heightMeasure()
      //     })
      //   }
      // }, response => {})
      this.goods = data.goods
      this.$nextTick(() => {
        this._initScroll()
        this._heightMeasure()
      })
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuList, {
          click: true
        })
        this.detailScroll = new BScroll(this.$refs.menuDetailWrapper, {
          probeType: 3,
          click: true
        })
        this.detailScroll.on('scroll', pos => {
          this.currentPosY = Math.round(Math.abs(pos.y))
        })
      },
      _heightMeasure () {
        const kindSection = this.$refs.kindSection
        const vm = this
        let height = 0
        this.heightMeter.push(height)
        kindSection.forEach(el => {
          height += el.clientHeight
          vm.heightMeter.push(height)
        })
      },
      anchorTo (i) {
        const kindSection = this.$refs.kindSection
        this.detailScroll.scrollToElement(kindSection[i], 300)
      },
      getSeeMoreData (indexS, indexF) {
        this.toggleSeeMore = true
        this.seeMoreData = this.goods[indexS].foods[indexF]
      }
    },
    computed: {
      currentRange () {
        const posY = this.currentPosY + 70
        let anchorIndex = 0

        this.heightMeter.forEach((el, index) => {
          const c = posY >= el
          const n = posY < this.heightMeter[index + 1]
          if (c && n) {
            anchorIndex = index
          }
        })
        return anchorIndex
      }
    },
    components: { quantityCtrl, seeMore }
  }
</script>

<style lang="less">
@import "../../assets/less/mixin";

	.goods {
		height: 100%;
		.menu {
			height: 100%;
			overflow: hidden;
			display: flex;
			.menu-list {
				flex-basis: 80px;
				ul {
					width: 80px;
				}
				.menu-list-item {
					display: table;
					font-size: 0;
					background-color: #f3f5f7;
					padding: 0 12px;
					.title {
						width: 56px;
						height: 54px;
						font-size: 12px;
						color: rgb(7, 17, 27);
						line-height: 14px;
						position: relative;
						vertical-align: middle;
						display: table-cell;
						.icon-menu {
							display: inline-block;
							width: 12px;
							height: 12px;
							margin-right: 2px;
							vertical-align: top;
							padding-top: 1px;
							background-origin: content-box;
							background-size: 12px 12px;
						}
						.decrease { .image('./decrease_3') }
						.discount { .image('./discount_3') }
						.special { .image('./special_3') }
						.invoice { .image('./invoice_3') }
						.guarantee {.image('./guarantee_3') }
						.border-1px(rgba(7, 17, 27, .1));
						&::after {
							position: absolute;
							bottom: 0;
						}
					}
					&:last-child .title::after {
						content: none;
					}
				}
				.active {
					background: #fff;
					font-weight: 700;
					position: relative;
					z-index: 10;
					margin-top: -1px;
					& .title::after {
						content: none;
					}
				}
			}
			.menu-detail-wrapper {
				flex-grow: 1;
			}
			.menu-detail {
				overflow: hidden;
				.kind-section {
					.title-kind {
						font-size: 12px;
						color: rgb(147, 153, 159);
						line-height: 26px;
						padding-left: 14px;
						background-color: #f3f5f7;
						border-left: #dedde1 1px solid;
					}
					.food-detail-wrapper {
						.border-1px(rgba(7, 17, 27, .1));
						padding: 0 18px;
						font-size: 0;
						&:last-child::after { content: none;}
					}
					.food-detail {
						padding: 18px 0;
						display: flex;
						.avatar-food {
							flex-shrink: 0;
							width: 57px;
							height: 57px;
							border-radius: 2px;
							overflow: hidden;
							vertical-align: top;
							img {
								width: 100%;
								height: 100%;
							}
						}
						.info-food {
							flex-grow: 1;
							padding-top: 2px;
							padding-left: 10px;
							.info-food-title {
								font-size: 14px;
								color: rbg(7, 17, 27);
								line-height: 14px;
								font-weight: 700;
							}
							.info-food-desc,
							.info-food-sell {
								font-size: 10px;
								line-height: 10px;
								color: rgb(147, 153, 159);
								margin-top: 8px;
							}
							.info-food-sell {
								.sell-count {
									margin-right: 12px;
								}
							}
							.info-food-desc {
								line-height: 14px;
							}
							.info-food-price {
								font-size: 10px;
								color: rgb(240, 20, 20);
								font-weight: 400;
								line-height: 24px;
								position: relative;
								width: 100%;
								.price-current,
								.price-pass {
									display: inline-block;
									vertical-align: top;
								}
								.price-current-number {
									font-size: 14px;
									font-weight: 700;
									line-height: 24px;
								}
								.price-pass {
									color: rgb(147, 153, 159);
									font-weight:  400;
									line-height: 24px;
									padding-left: 8px;
									text-decoration: line-through;
									.price-pass-number {
										font-weight: 400;
									}
								}
								.quantity-ctrl {
									position: absolute;
									top: 0;
									right: 0;
								}
							}
						}
					}
				}
			}
		}
	}
</style>