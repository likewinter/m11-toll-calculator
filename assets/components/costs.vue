<style scoped>
    p.costs {
        font-size: 3em;
    }
</style>
<template>
    <div class="row text-center">
        <p class="costs">
            <span><span class="glyphicon glyphicon-road"></span> {{costs.total}}&#8381;</span>
            <span> / {{costs.transponderTotal}}&#8381;</span>
        </p>
    </div>
</template>

<script>
    import store from '../store';
    import {costs as calculateCosts} from '../utils/calculator';

    export default {
        computed: {
            costs() {
                return calculateCosts(this.tripList, this.rates);
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