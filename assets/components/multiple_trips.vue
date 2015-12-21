<template>
    <trip-list></trip-list>
    <costs></costs>
</template>

<script>
    import TripList from './trip_list';
    import Costs from './costs';

    export default {
        components: {TripList, Costs}
    }
</script>