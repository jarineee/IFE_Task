<template>
    <div class="quantity-ctrl">
      <transition name="slide-wrapper" mode="out-in">
        <div class="exist" v-if="exist !== -1" key="exist">
          <span class="icon-remove_circle_outline" @click="decrease"></span>
          <span class="item-amount">{{ amount }}</span>
          <span class="icon-add_circle" @click="increase"></span>
        </div>
        <div class="addNew" v-else key="addNew" @click="increase">
          <slot name="addNew"></slot>
        </div>
      </transition>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'quantityCtrl',
    props: {
      index: Number,
      name: {
        type: String
      },
      price: {
        type: Number
      },
      type: {
        type: String
      }
    },
    computed: {
      ...mapState({
        ORDER: state => state.shoppingCart.ORDER
      }),
      exist () {
        let outputIndex = -1
        if (this.index >= 0) return this.index

        this.ORDER.some((el, index) => {
          if (el.name === this.name) {
            outputIndex = index
          }
        })

        return outputIndex
      },
      amount () {
        if (this.exist !== -1) {
          return this.ORDER[this.exist].amount
        }
      }
    },
    methods: {
      ...mapActions({
        add_Order: 'shoppingCart/add_Order',
        plus_Amount: 'shoppingCart/plus_Amount',
        minus_Amount: 'shoppingCart/minus_Amount',
        commit_Pos: 'shoppingCart/commit_Pos',
        commit_Launch: 'shoppingCart/commit_Launch'
      }),
      addNew () {
        let item = {}
        item.name = this.name
        item.price = this.price
        item.amount = 1
        this.add_Order(item)
      },
      increase (e) {
        this.commit_Launch(e.target)
        if (this.exist === -1) {
          this.addNew()
        } else {
          this.plus_Amount(this.exist)
        }
      },
      decrease () {
        this.minus_Amount(this.exist)
      }
    }
  }
</script>

<style lang="less">
  .slide-wrapper-enter, .slide-wrapper-leave {
    opacity: 0;
    transform: translateX(20px);
  }
  .slide-wrapper-enter-active, .slide-wrapper-leave-active {
    transition: .3s all ease;
  }
	.quantity-ctrl {
		font-size: 0;
		color: rgb(0, 160, 220);
    .item-amount {
      display: inline-block;
      text-align: center;
      font-size: 10px;
      font-weight: 200;
      width: 24px;
      line-height: 24px;
      vertical-align: top;
      color: rgb(147, 153, 159);
    }
    [class^= 'icon-'] {
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      height: 24px;
      width: 24px;
    }
    .addNew {
      height: 24px;
    }
    .add-to-cart {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 10px;
      line-height: 12px;
      background-color: rgb(0, 160, 220);
      color: #fff;
      font-weight: 200;
      height: 12px;
    }
	}
</style>