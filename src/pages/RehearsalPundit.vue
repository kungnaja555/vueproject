<template>
  <div>
    <router-link
      :to="`/rehearsalset/${this.$route.params.re_id}/${this.$route.params.fac_id}`"
    >ย้อนกลับ</router-link>
    <div style="font-size:25px;">{{showCurrentPlace(rehearsal,faculty,set)}}</div>
    <v-row>
      <v-col cols="12" xl="7">
        <v-card class="mx-auto">
          <v-data-table
            :headers="pundits_headers"
            :items="pundits"
            :page.sync="pundits_page"
            :items-per-page="pundits_itemsPerPage"
            hide-default-footer
            class="elevation-1"
            @page-count="pundits_pageCount = $event"
          >
            <template v-slot:item.level="{ item }">{{item.level==1?'ปริญญาตรี':'ปริญญาโท'}}</template>

            <template v-slot:no-data>ไม่พบข้อมูล</template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="pundits_page" :length="pundits_pageCount"></v-pagination>
        </div>
      </v-col>
      <v-col cols="12" xl="5">
        <v-card class="mx-auto">
          <v-data-table
            :headers="times_headers"
            :items="timestamps"
            :page.sync="times_page"
            :items-per-page="times_itemsPerPage"
            hide-default-footer
            class="elevation-1"
            @page-count="times_pageCount = $event"
          >
            <template v-slot:top>
              <v-btn style="margin: 10px" @click="gotoTime">นำเข้าเวลา</v-btn>
              {{showAvg(timestamps)}}
            </template>

            <template
              v-slot:item.no="{ item }"
            >{{ timestamps.map(function(x) {return x._id; }).indexOf(item._id) + 1 }}</template>

            <template
              v-slot:item.time="{ item }"
            >{{ new Date(item.time).toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}) }}</template>

            <template v-slot:item.actions="{ item }">
              <v-icon small @click="moveTimeOut(item)">clear</v-icon>
            </template>

            <template v-slot:no-data>ไม่พบข้อมูล</template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="times_page" :length="times_pageCount"></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pundits_page: 1,
      pundits_pageCount: 0,
      pundits_itemsPerPage: 10,
      pundits_headers: [
        { text: "ลำดับที่", value: "no", sortable: false },
        { text: "รหัส", value: "id", sortable: false },
        { text: "คำนำหน้าชื่อ", value: "title", sortable: false },
        { text: "ชื่อ", value: "firstname", sortable: false },
        { text: "นามสกุล", value: "lastname", sortable: false },
        { text: "ระดับปริญญา", value: "level", sortable: false },
        { text: "เกียรตินิยม", value: "honour", sortable: false }
      ],
      times_page: 1,
      times_pageCount: 0,
      times_itemsPerPage: 10,
      times_headers: [
        { text: "ลำดับที่", value: "no", sortable: false },
        { text: "เวลา", value: "time", sortable: false },
        { text: "เมนู", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    gotoTime() {
      var re_id = this.$route.params.re_id;
      var fac_id = this.$route.params.fac_id;
      var set_id = this.$route.params.set_id;
      this.$router.push(`/time/${re_id}/${fac_id}/${set_id}`);
    },
    moveTimeOut(item) {
      var payout = {
        set_id: this.$route.params.set_id,
        re_id: this.$route.params.re_id,
        time_id: item._id
      };
      this.$store.dispatch("time/moveTimeOut", payout);
    },
    showAvg(timestamps) {
      if (timestamps.length <= 1) return "ข้อมูลไม่เพียงพอ";
      var start = timestamps[0].time;
      var end = timestamps[timestamps.length - 1].time;
      var avg = (new Date(end) - new Date(start)) / 1000;
      avg = avg / (timestamps.length - 1);
      return "เวลาเฉลี่ย " + avg.toFixed(2) + " วินาที";
    },
    showCurrentPlace(rhs, fac, set) {
      var re_id = this.$route.params.re_id;
      var content = set.contents.find(el => el.rehearsal == re_id);
      if (fac.type == 2) {
        if (set.status == 0)
          return `${rhs.name} - ปีการศึกษา ${rhs.years} /${fac.name} / ชุดที่ ${content.name}`;
        return `${rhs.name} - ปีการศึกษา ${rhs.years} / ${fac.name} / ${content.name}`;
      } else {
        if (set.status == 0)
          return `${rhs.name} - ปีการศึกษา ${rhs.years} / ${fac.id} - ${fac.name} / ชุดที่ ${content.name}`;
        return `${rhs.name} - ปีการศึกษา ${rhs.years} / ${fac.id} - ${fac.name} / ${content.name}`;
      }
    }
  },
  created() {
    this.$store.dispatch("time/clearTimestamps", payout);

    var payout = {
      re_id: this.$route.params.re_id,
      fac_id: this.$route.params.fac_id,
      set_id: this.$route.params.set_id
    };
    this.$store.dispatch("pundit/getAllPundit", payout);
    this.$store.dispatch("time/getTimeForReport", payout);
    this.$store.dispatch("rehearsal/getRehearsal", payout.re_id);
    this.$store.dispatch("faculty/getFaculty", payout.fac_id);
    this.$store.dispatch("set/getSet", payout);
  },
  computed: {
    ...mapState("pundit", {
      pundits: "pundits"
    }),
    ...mapState("time", {
      timestamps: "timestamps"
    }),
    ...mapState("rehearsal", {
      rehearsal: "rehearsal"
    }),
    ...mapState("faculty", {
      faculty: "faculty"
    }),
    ...mapState("set", {
      set: "set"
    })
  }
};
</script>

<style>
</style>