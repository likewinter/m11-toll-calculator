<style lang="less" scoped>
    .time-selector {
        margin-top: 5px;
    }
    div.checkbox {
        margin-top: 0;
    }
</style>

<template>
    <div class="time-selector text-center col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <div class="checkbox" v-if="showCurrentTime">
            <label>
                <input type="checkbox" v-model="useCurrentTime" @change="refreshCurrentTime"> Next hour
            </label>
        </div>
        <div class="row">
            <div class="col-xs-5 col-xs-offset-1 col-sm-3 col-sm-offset-3">
                <select class="form-control input-sm" name="hours" :disabled="useCurrentTime" @change="updateHours">
                    <option :value="hour" v-for="hour in 24" :selected="hour == time.hours">{{hour | zeroPadHours}}</option>
                </select>
            </div>
            <div class="col-xs-5 col-sm-3">
                <select class="form-control input-sm" name="day" :disabled="useCurrentTime" @change="updateDay">
                    <option :value="day" v-for="(day, name) in weekDaysDict" :selected="day == time.day">{{name | capitalize}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
  import {weekDays as weekDaysDict} from 'assets/constants/dates_dict';
  import {zeroPadHours, getNextTime} from 'assets/utils';

  export default {
    data() {
      return {
        weekDaysDict,
        useCurrentTime: true && this.showCurrentTime,
      };
    },
    props: {
      showCurrentTime: {
        type: Boolean,
        default: true,
      },
      time: {
        type: Object,
        required: true,
      },
    },
    filters: {zeroPadHours},
    methods: {
      refreshCurrentTime(e) {
        if (!e.target.checked) return;

        this.updateTime(getNextTime());
      },
      updateHours(e) {
        const hours = parseInt(e.target.value, 10);
        this.updateTime({hours});
      },
      updateDay(e) {
        const day = parseInt(e.target.value, 10);
        this.updateTime({day});
      },
      updateTime(time) {
        this.$dispatch('update-time', time);
      },
    },
  };
</script>