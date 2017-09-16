<template>
	<div :class="'size-' + size" class="rate-star">
		<span v-for="item in computedStar" :class="item"></span>
	</div>
</template>

<script>
  export default {
    name: 'rate-star',
    props: {
      score: {
        required: true
      },
      size: Number
    },
    computed: {
      computedStar () {
        let starClass = []
        let i = 0
        const computedScore = (Math.floor(this.score * 2) / 2).toString()
        const integer = Math.floor(computedScore)
        const dot = computedScore.indexOf('.')

        for (i; i < integer; i++) {
          starClass.push('on')
        }
        if (dot !== -1) {
          starClass.push('half')
          i += 1
        }
        if (i < 5) {
          for (i; i < 5; i++) {
            starClass.push('off')
          }
        }
        return starClass
      }
    }
  }
</script>

<style lang="less">
@import "./../../assets/less/mixin";
.rate {
	font-size: 0;
	display: inline-block;
}
.size-48 {
	margin-right: -20px;
	span {
		height: 20px;
		width: 20px;
		margin-right: 20px;
		display: inline-block;
		background-size: 20px 20px;
	}
	.on { .image('./star48_on'); }
  .off { .image('./star48_off'); }
	.half { .image('./star48_half'); }
}
.size-36 {
	margin-right: -6px;
	span {
		height: 15px;
		margin-right: 6px;
		width: 15px;
		display: inline-block;
		background-size: 15px 15px;
	}
	.on { .image('./star36_on'); }
	.off { .image('./star36_off'); }
	.half { .image('./star36_half'); }
}
.size-24 {
	margin-right: -3px;
	span {
		height: 10px;
		width: 10px;
		margin-right: 3px;
		display: inline-block;
		background-size: 10px 10px;
	}
	.on { .image('./star24_on'); }
	.off { .image('./star24_off'); }
	.half { .image('./star24_half'); }
}
</style>