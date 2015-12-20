<style lang="less" scoped>
    div.checkbox {
        margin-top: 0;
    }    
</style>

<template>
    <div class="text-center">
        <div class="checkbox" v-if="showCurrentTime">
            <label>
                <input type="checkbox" v-model="useCurrentTime" @change="refreshCurrentTime"> Next hour
            </label>
        </div>
        <div class="form-inline">
            <select class="form-control input-sm" name="hours" :disabled="useCurrentTime" @change="updateHours">
                <option :value="hour" v-for="hour in 24" :selected="hour == time.hours">{{hour | zeroPadHours}}</option>
            </select>
            <select class="form-control input-sm" name="day" :disabled="useCurrentTime" @change="updateDay">
                <option :value="day" v-for="(day, name) in weekDaysDict" :selected="day == time.day">{{name | capitalize}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    import {weekDays as weekDaysDict} from 'assets/constants/dates_dict';
    import {capitalize} from 'lodash';

    let zeroPad = num => {
        return (num < 10 ? '0' : '') + num;
    }

    let zeroPadHours = hours => {
        return zeroPad(hours) + ':00';
    }

    export default {
        data() {
            return {
                weekDaysDict,
                useCurrentTime: true && this.showCurrentTime
            }
        },
        props: {
            showCurrentTime: {
                type: Boolean,
                default: true
            },
            time: {
                type: Object,
                required: true
            }
        },
        computed: {
            choosenTime() {
                const hours = zeroPadHours(this.time.hours);
                const dayOfWeek = capitalize(this.weekDaysDict[this.time.day]);

                return `${hours} ${dayOfWeek}`;
            }
        },
        filters: {
            zeroPadHours
        },
        methods: {
            refreshCurrentTime() {
                const currentTime = new Date();
                const roundedHours = Math.round(currentTime.getHours() + currentTime.getMinutes() / 60);
                let currentHours = roundedHours;
                let currentDay = currentTime.getDay();

                if (roundedHours === 24) {
                    currentHours = 0;
                    currentDay = (currentDay === 6) ? 0 : currentDay;
                }

                this.updateTime({hours: currentHours, day: currentDay});
            },
            updateHours(e) {
                let hours = parseInt(e.target.value, 10);
                this.updateTime({hours});
            },
            updateDay(e) {
                let day = parseInt(e.target.value, 10);
                this.updateTime({day});
            },
            updateTime(time) {
                this.$dispatch('update-time', time);
            }
        }
    }
</script>