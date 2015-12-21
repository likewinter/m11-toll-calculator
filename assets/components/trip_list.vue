<template>
    <div class="row">
        <trip v-for="trip in tripList" :trip="trip" :index="$index" track-by="$index"></trip>
    </div>
    <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-2 col-lg-2 col-xs-offset-8 col-sm-offset-8 col-md-offset-10 col-lg-offset-10">
            <button class="btn btn-success" @click="addTrip">Add new</button>
        </div>
    </div>
</template>

<script>
    import Trip from './trip';
    import store from '../store';
    const {addDefaultTrip: addTrip} = store.actions;

    export default {
        components: {Trip},
        computed: {
            tripList() {
                return store.state.tripList;
            }
        },
        methods: {
            addTrip
        }
    }
</script>