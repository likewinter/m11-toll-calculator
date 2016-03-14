<style lang="less" scoped>
    @width: 300px;

    div.costs {
        position: fixed;
        left: 50%;
        width: @width;
        margin-left: -@width/2;
        top: 68px;
        z-index: 10000;

        &.stick {
          top: 0 !important;
          opacity: 0.8;

          p {
            border-radius: 0 0 5px 5px;
          }
        }

        p.info {
            padding-top: 10px;
            padding-bottom: 15px;
            font-size: 1.8em;

            span {
                position: relative;

                sub {
                    position: absolute;
                    left: -0.2em;
                    font-size: 0.4em;
                }
            }
        }
    }
</style>
<template>
    <div class="costs" :class="classObject">
        <p class="text-center bg-info info">
            {{costs.total}}&#8381; / <span>{{costs.transponderTotal}}&#8381; <sub><em>транспондер</em></sub></span>
        </p>
    </div>
</template>

<script>
  import store from '../store';
  import { calculateCosts } from '../utils/calculator';

  export default {
    props: ['listName'],
    data() {
      return {
        classObject: {
          stick: false,
        },
      };
    },
    store,
    vuex: {
      getters: {
        rates: state => state.rates,
        allTripLists: state => state.tripLists,
      },
    },
    ready() {
      window.addEventListener('scroll', this.stickPanel);
    },
    methods: {
      stickPanel() {
        const height = this.$el.offsetHeight;
        const stick = document.body.scrollTop > height;

        this.classObject.stick = stick;
        if (!stick) {
          this.$el.style.top = `${height - document.body.scrollTop}px`;
        }
      },
    },
    computed: {
      costs() {
        return calculateCosts(this.tripList, this.rates);
      },
      tripList() {
        return this.allTripLists[this.listName];
      },
    },
  };
</script>