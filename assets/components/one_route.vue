<template>
    <costs></costs>
    <div class="row">
        <p class="text-center bg-warning">В разработке</p>
    </div>
</template>

<script>
    import Costs from './costs';
    import store from '../store';

    const {cleanTrips} = store.actions;

    export default {
        components: {Costs},
        ready() {
            this.cleanTrips();
        },
        methods: {
            cleanTrips
        }
    }
</script>