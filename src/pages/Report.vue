<template>
  <div>
    <router-link :to="`/rehearsal`">ย้อนกลับ</router-link>
    <div style="font-size:25px;">{{rehearsal.name}} - ปีการศึกษา {{rehearsal.years}}</div>
    <v-row v-for="name in names" :key="name._id">
      <v-col></v-col>
      <v-col>
        <div v-if="name.status==0">- ชุดที่ {{name.name}}</div>
        <div v-else-if="name.status==1">- {{name.name}}</div>
        <div style="font-size: 20px" v-else-if="name.type==2">{{name.name}}</div>
        <div style="font-size: 20px" v-else>{{name.id}} - {{name.name}}</div>
      </v-col>
      <v-col>
        <div style="text-align:right;" v-if="name.type==undefined">{{showTimeAvg(name,set_times)}}</div>
        <div style="font-size: 20px; text-align:right;" v-else>{{showTimeAvg(name,fac_times)}}</div>
      </v-col>
      <v-col>
        <div
          style="text-align:right;"
          v-if="name.status==0 || name.status==1"
        >{{showTimePerMinute(name,set_times)}}</div>
        <div style="font-size: 20px; text-align:right;" v-else>{{showTimePerMinute(name,fac_times)}}</div>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row>
      <v-col></v-col>
      <v-col>
        <div style="font-size: 20px">เวลาเฉลี่ยรวม</div>
      </v-col>
      <v-col>
        <div style="font-size: 20px; text-align:right;">{{allTimeAvg(fac_times)}}</div>
      </v-col>
      <v-col>
        <div style="font-size: 20px; text-align:right;">{{allTimePerMinute(fac_times)}}</div>
      </v-col>
      <v-col></v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    showTimeAvg(name, times) {
      var x = times.find(el => el._id == name._id);

      if (x.time >= 0) return x.time + " วินาที / คน";
      return 0.0 + " วินาที / คน";
    },
    showTimePerMinute(name, times) {
      var x = times.find(el => el._id == name._id);

      if (x.minutePerPundit == undefined) return 0 + " คน / นาที";
      return x.minutePerPundit + " คน / นาที";
    },
    allTimeAvg(times) {
      var sum = 0;
      var count = 0;
      for (var i = 0; i < times.length; i++) {
        if (times[i].time >= 0) {
          sum = sum + times[i].time;
          count++;
        }
      }
      var avg = sum / parseFloat(count);

      if (avg >= 0) return avg + " วินาที / คน";
      return 0.0 + " วินาที / คน";
    },
    allTimePerMinute(times) {
      var sum = 0;
      var count = 0;
      for (var i = 0; i < times.length; i++) {
        if (times[i].minutePerPundit != undefined) {
          sum = sum + times[i].minutePerPundit;
          count++;
        }
      }
      var avg = sum / parseFloat(count);

      if (avg >= 0) return avg + " คน / นาที";
      return 0.0 + " คน / นาที";
    }
  },
  created() {
    this.$store.dispatch("faculty/resetReport");
    var payout = {
      re_id: this.$route.params.re_id
    };
    this.$store.dispatch("rehearsal/getRehearsal", payout.re_id);
    this.$store.dispatch("faculty/report", payout);
    this.$store.dispatch("faculty/reportName", payout);
  },
  computed: {
    ...mapState("rehearsal", {
      rehearsal: "rehearsal"
    }),
    ...mapState("faculty", {
      names: "names",
      fac_times: "fac_times",
      set_times: "set_times"
    })
  }
};
</script>

<style>
</style>