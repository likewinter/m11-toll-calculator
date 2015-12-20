<style lang="less" scoped>
    .swap-directions {
        text-align: center;
        padding-top: 1.8em;
    }
</style>

<template>
    <div class="col-lg-5 col-md-5 col-sm-5">
        <form>
            <div class="form-group">
                <label for="direction-start">From</label>
                <select class="form-control" @change="updateFrom">
                    <option v-for="name in directions | removeItem direction.to" :value="name" :selected="name == direction.from">{{name}}</option>
                </select>
            </div>
        </form>
    </div>
    <div class="col-lg-2 col-md-2 col-sm-2 swap-directions">
        <button class="btn btn-primary" @click="swap">Swap</button>
    </div>
    <div class="col-lg-5 col-md-5 col-sm-5">
        <form>
            <div class="form-group">
                <label for="direction-end">To</label>
                <select class="form-control" @change="updateTo">
                    <option v-for="name in directions | removeItem direction.from" :value="name" :selected="name == direction.to">{{name}}</option>
                </select>
            </div>
        </form>
    </div>
</template>

<script>
    import {omit} from 'lodash';

    export default {
        props: {
            directions: {
                type: Array,
                required: true
            },
            direction: {
                type: Object,
                required: true
            }
        },
        methods: {
            swap() {
                this.$dispatch('swap');
            },
            updateDirection(direction) {
                this.$dispatch('update-direction', direction);
            },
            updateFrom(e) {
                this.updateDirection({from: e.target.value});
            },
            updateTo(e) {
                this.updateDirection({to: e.target.value});
            }
        },
        filters: {
            removeItem(arr, remove) {
                return arr.filter(item => item !== remove);
            }
        }
    }
</script>