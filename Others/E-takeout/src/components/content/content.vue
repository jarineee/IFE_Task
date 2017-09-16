<template>
	<div class="content">
		<div class="nav">
			<ul>
				<router-link to="/goods" tag="li" :class="{'active': this.$route.path === '/'}">商品</router-link>
				<router-link to="/ratings" tag="li">评价</router-link>
				<router-link to="/seller" tag="li">商家</router-link>
			</ul>
		</div>
		<div class="content-display">
			<keep-alive>
				<router-view :seller="seller"></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'content',
    props: {
      seller: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="less">
@import "../../assets/less/mixin";

	.content {
		.nav {
			font-weight: 400;
			border-bottom: rgba(7, 17, 27, .1) solid 1px;
			ul {
				display: flex;
				font-size: 14px;
				color: rgb(77, 85, 93);
				justify-content: space-around;
				background-color: #fff;
				line-height: 14px;
				height: 40px;
				align-items: center;
				li.active {
					color: rgb(240, 20, 20)
				}
			}
		}
		.content-display {
			position: absolute;
			left: 0;
			right: 0;
			top: 175px;
			bottom: 48px;
		}
	}
</style>