<style scoped>
    p.costs {
        font-size: 3em;
    }
</style>
<template>
    <div class="row text-center">
        <p class="costs">
            <span><span class="glyphicon glyphicon-road"></span> {{costs.total}}&#8381;</span>
            <span v-if="costs.discount"> / {{costs.discount}}&#8381;</span>
        </p>
    </div>
    <div class="row text-center">
        <div class="checkbox">
            <label>
                <input type="checkbox" v-model="price" v-bind:true-value="1" v-bind:false-value="0"> I'm using transponder
            </label>
        </div>
    </div>
</template>

<script>
    import store from '../store';
    import {costs as calculateCosts} from '../utils/calculator';

    export default {
        data() {
            return {
                price: 0
            }
        },
        computed: {
            costs() {
                return calculateCosts(this.tripList, this.rates, {price: this.price});
            },
            rates() {
                return store.state.rates;
            },
            tripList() {
                return store.state.tripList;
            }
        }
    }
</script>