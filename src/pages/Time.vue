<template>
  <div>
    <router-link
      :to="`/rehearsalpundit/${this.$route.params.re_id}/${this.$route.params.fac_id}/${this.$route.params.set_id}`"
    >ย้อนกลับ</router-link>
    <div
      style="font-size: 25px"
    >{{rehearsal.name}} - ปีการศึกษา {{rehearsal.years}} / {{faculty.id}} - {{faculty.name}} / ชุดที่ {{set.no}}</div>
    <v-row>
      <v-col cols="6"></v-col>
      <v-col>
        <v-text-field v-model="datetime.start" label="ตั้งแต่" type="datetime-local"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="datetime.end" label="ถึง" type="datetime-local"></v-text-field>
      </v-col>
      <v-col>
        <v-btn color="primary" class="mt-2" width="100%" @click="clickSearch">ค้นหา</v-btn>
      </v-col>
      <v-col>
        <v-btn color="primary" class="mt-2" width="100%" @click.stop="dialog=true">นำเข้าเวลา</v-btn>
        <v-dialog v-model="dialog" width="344">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>นำเข้าเวลา</v-card-title>

            <v-card-text>
              <v-text-field v-model="position.start" label="ตำแหน่งเริ่มต้น" type="Number"></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-text-field v-model="position.end" label="ตำแแหน่งสิ้นสุด" type="Number"></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="importTimeMany">ยืนยัน</v-btn>
              <v-btn color="error" text @click="close">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-card class="mx-auto mt-4 width-table">
      <v-data-table
        :headers="headers"
        :items="timestamps"
        class="elevation-1"
        hide-default-footer
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click.stop="dialogClear = true">ล้างข้อมูลทั้งหมด</v-btn>

            <v-dialog v-model="dialogClear" max-width="344">
              <v-card>
                <v-card-title>ล้างข้อมูลทั้งหมด ?</v-card-title>

                <v-card-text>คุณแน่ใจที่จะลบข้อมูลเวลาทั้งหมดหรือไม่</v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="primary" text @click="clearTime">ยืนยัน</v-btn>

                  <v-btn color="error" text @click="dialogClear = false">ยกเลิก</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template
          v-slot:item.no="{ item }"
        >{{ timestamps.map(function(x) {return x._id; }).indexOf(item._id) + 1 }}</template>

        <template
          v-slot:item.time="{ item }"
        >{{ new Date(item.time).toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}) }}</template>

        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-2" small @click="importTimeOne(item)">done</v-icon>
          <v-icon small @click="deleteTime(item)">clear</v-icon>
        </template>

        <template v-slot:no-data>ไม่พบข้อมูล</template>
      </v-data-table>
    </v-card>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 30,
      dialog: false,
      dialogClear: false,
      datetime: {
        start: "",
        end: ""
      },
      defaultdatetime: {
        start: "",
        end: ""
      },
      position: {
        start: "",
        end: ""
      },
      defaultposition: {
        start: "",
        end: ""
      },
      headers: [
        { text: "ลำดับที่", value: "no", sortable: false },
        { text: "เวลา", value: "time", sortable: false },
        { text: "เมนู", value: "actions", sortable: false }
      ],
      interval: ""
    };
  },
  created() {
    this.$store.dispatch("time/clearTimestamps");
    var payout = {
      re_id: this.$route.params.re_id,
      fac_id: this.$route.params.fac_id,
      set_id: this.$route.params.set_id
    };
    this.$store.dispatch("rehearsal/getRehearsal", payout.re_id);
    this.$store.dispatch("set/getSet", payout);

    this.getTimestamps(0, 0, 0);
  },
  computed: {
    ...mapState("rehearsal", {
      rehearsal: "rehearsal"
    }),
    ...mapState("faculty", {
      faculty: "faculty"
    }),
    ...mapState("set", {
      set: "set"
    }),
    ...mapState("time", {
      timestamps: "timestamps"
    })
  },
  methods: {
    clickSearch() {
      var start = this.datetime.start;
      var end = this.datetime.end;
      this.getTimestamps(1, start, end);
      this.close();
    },
    getTimestamps(status, start, end) {
      var payout = {
        start: start,
        end: end
      };
      if (status == 0) {
        this.$store.dispatch("time/getAllTimes");
      } else {
        this.$store.dispatch("time/searchTime", payout);
      }
    },
    importTimeMany() {
      var payout = {
        position: this.position,
        set_id: this.$route.params.set_id,
        re_id: this.$route.params.re_id
      };
      this.$store.dispatch("time/setTimeGroup", payout);
      this.getTimestamps(0, 0, 0);
      this.close();
    },
    importTimeOne(item) {
      var payout = {
        time_id: item._id,
        set_id: this.$route.params.set_id,
        re_id: this.$route.params.re_id
      };
      this.$store.dispatch("time/setOneTimeGroup", payout);
    },
    deleteTime(time) {
      this.$store.dispatch("time/deleteTime", time._id);
    },
    close() {
      this.datetime = Object.assign({}, this.defaultdatetime);
      this.position = Object.assign({}, this.defaultposition);
      this.dialog = false;
    },
    clearTime() {
      this.dialogClear = false;
      this.$store.dispatch("time/clearTimeAll");
    }
  }
};
</script>

<style>
</style>