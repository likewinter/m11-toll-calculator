<style lang="less" scoped>
    div.costs {
        margin-top: 15px;

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
    <div class="row costs">
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
    store,
    vuex: {
      getters: {
        rates: state => state.rates,
        allTripLists: state => state.tripLists,
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