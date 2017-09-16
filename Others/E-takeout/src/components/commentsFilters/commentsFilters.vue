<template>
	<div class="comments-filters">
		<ul class="comments-filters-buttons">
			<li class="filter-all filters-item" @click.capture="setRateType(-1)">
				<span class="title">{{ typeAll }}</span><span class="number">{{ COMMENTS_ALL.length }}</span>
			</li>
			<li class="filter-pos filters-item" @click="setRateType(0)">
				<span class="title">{{ typePos }}</span><span class="number">{{ COMMENTS_POS.length }}</span>
			</li>
			<li class="filter-neg filters-item" @click="setRateType(1)">
				<span class="title">{{ typeNeg }}</span><span class="number">{{ COMMENTS_NEG.length }}</span>
			</li>
		</ul>
		<div class="contents-only" @click="toggleHasContent">
			<span class="icon icon-check_circle" :class="{ 'active': HAS_CONTENT }"></span><span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'comments-filters',
    props: {
      typeAll: {
        type: String,
        default: '全部'
      },
      typePos: {
        type: String,
        default: '推荐'
      },
      typeNeg: {
        type: String,
        default: '吐槽'
      }
    },
    created () {
      this.init_filter()
    },
    computed: {
      ...mapState('comments', {
        COMMENTS_ALL: state => state.COMMENTS_ALL,
        HAS_CONTENT: state => state.HAS_CONTENT
      }),
      ...mapGetters('comments', [
        'COMMENTS_POS',
        'COMMENTS_NEG'
      ])
    },
    methods: {
      ...mapActions('comments', [
        'commit_ratetype',
        'toggle_has_content',
        'init_filter'
      ]),
      setRateType (rateType) {
        this.commit_ratetype(rateType)
        this.$emit('refresh')
      },
      toggleHasContent () {
        this.toggle_has_content()
        this.$emit('refresh')
      }
    }
  }
</script>

<style lang="less">
	@import "./../../assets/less/mixin";

	.comments-filters {
		border-bottom: 1px solid rgba(7, 17, 27, .1);
		padding: 0 18px;
		.comments-filters-buttons {
			font-size: 0;
			.border-1px;
			.filters-item {
				margin: 18px 8px 18px 0;
				font-size: 12px;
				padding: 8px 12px;
				display: inline-block;
				border-radius: 1px;
				.number {
					padding-left: 4px;
					font-size: 8px;
					line-height: 16px;
				}
			}
			.filter-all {
				color: #fff;
				background-color: rgb(0, 160, 220);
			}
			.filter-pos {
				color: rgb(77, 85, 93);
				background-color: rgba(0, 160, 220, .2);
			}
			.filter-neg {
				color: rgb(77, 85, 93);
				background-color: rgba(77, 85, 93, .2);
			}
		}
		.contents-only {
			color: rgb(147, 153, 159);
			padding: 12px 0;
			font-size: 0;
			.icon {
				font-size: 24px;
				line-height: 24px;
				display: inline-block;
				vertical-align: top;
			}
			.icon.active {
				color: #00b43c;
			}
			.text {
				font-size: 12px;
				color: rgb(147, 153, 159);
				line-height: 24px;
				padding-left: 4px;
			}
		}
	}
</style>