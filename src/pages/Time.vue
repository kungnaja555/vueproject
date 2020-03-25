<template>
  <div>
    <div style="width:80%">
      <div>
        <v-form ref="formTime" v-model="validtime" lazy-validation>
          <v-row>
            <v-col></v-col>
            <v-col></v-col>
            <v-col></v-col>
            <v-col cols="1">
              <div>ตั้งแต่</div>
            </v-col>
            <v-col>
              <v-text-field
                type="datetime-local"
                label="วันที่"
                v-model="datestart"
                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <div>ถึง</div>
            </v-col>
            <v-col>
              <v-text-field
                type="datetime-local"
                label="วันที่"
                v-model="dateend"
                :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                class="mt-3"
                width="100%"
                @click="$refs.formTime.validate()"
              >ค้นหา</v-btn>
              <!-- <v-btn color="primary" class="mt-3" @click="search">ค้นหา</v-btn> -->
            </v-col>
          </v-row>
        </v-form>
      </div>
      <div>
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="mx-auto elevation-1"
          style="width:50%"
          hide-default-footer
          :page.sync="page"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <template
            v-slot:item.no="{ item }"
          >{{ desserts.map(function(x) {return x.id; }).indexOf(item.id) + 1 }}</template>

          <template v-slot:item.actions="{  }">
            <v-icon class="mr-2" small @click="dialog = true">done</v-icon>
            <v-icon small>clear</v-icon>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </div>

      <!-- <time-table :desserts="desserts" @getdessert="getdessert" /> -->
    </div>
    <v-card class="time-menu">
      <v-container>
        <div style="margin: 15px">เวลาเฉลี่ย 10 ล่าสุด: 3.00 วินาที</div>
        <v-divider></v-divider>
        <div style="margin: 15px">
          <v-form ref="formMany" v-model="validmany" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  type="Number"
                  label="ตั้งแต่"
                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field type="Number" label="ถึง" :rules="[v => !!v || 'กรุณากรอกข้อมูล']"></v-text-field>
              </v-col>
            </v-row>
            <v-select
              label="การซ้อม"
              :items="['การซ้อมครั้งที่ 1']"
              :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
            ></v-select>
            <v-select
              type="Number"
              label="ชุดที่"
              :items="setItem"
              :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
            ></v-select>
            <v-btn color="primary" width="100%" @click="$refs.formMany.validate()">จัดกลุ่ม</v-btn>
          </v-form>
        </div>

        <div class="text-center">
          <v-dialog v-model="dialog" width="344">
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>เพิ่มข้อมูล</v-card-title>

              <v-card-text>
                <v-form ref="formOne" v-model="validone" lazy-validation>
                  <v-select
                    label="การซ้อม"
                    :items="['การซ้อมครั้งที่ 1']"
                    :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                  ></v-select>
                  <v-select
                    type="Number"
                    label="ชุดที่"
                    :items="setItem"
                    :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                  ></v-select>
                  <v-btn color="primary" width="100%" @click="$refs.formOne.validate()">จัดกลุ่ม</v-btn>
                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">ตกลง</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 30,
      checkboxformone: true,
      checkboxformmany: false,
      setItem: [1, 2, 3],
      dialog: false,
      headers: [
        { text: "ลำดับที่", value: "no" },
        { text: "เวลา", value: "time" },
        { text: "เมนู", value: "actions", sortable: false }
      ],
      desserts: [
        {
          id: 1,
          time: "12-3-2015 18:30:00"
        },
        {
          id: 2,
          time: "12-3-2015 18:30:02"
        }
      ]
    };
  }
};
// import { mapState, mapGetters } from "vuex";
// export default {
//   data() {
//     return {
//       datestart: null,
//       dateend: null,
//       indexstart: "",
//       indexend: "",
//       editform: {
//         id: "",
//         date: "",
//         faculty: "",
//         major: "",
//         disabled: true
//       },
//       many: {
//         datestart: "",
//         dateend: "",
//         faculty: "",
//         major: "",
//         disabled: true
//       }
//     };
//   },
//   methods: {
//     search() {
//       var date = {
//         start: this.datestart,
//         end: this.dateend
//       };

//       this.$store.dispatch("time/gettimestamps", date);
//     },

//     getdessert(item) {
//       this.editform.id = item._id;
//       this.editform.date = item.time;
//       this.editform.faculty = item.faculty;
//       this.editform.major = item.major;
//     },

//     getmajor(status) {
//       if (status == 0) {
//         this.editform.disabled = false;
//         this.$store.dispatch("faculty/getfaculty", this.editform.faculty);
//       } else {
//         this.many.disabled = false;
//         this.$store.dispatch("faculty/getfaculty", this.many.faculty);
//       }
//     },

//     updatetime() {
//       var data = {
//         start: this.datestart,
//         end: this.dateend,
//         form: this.editform
//       };
//       this.$store.dispatch("time/updatetimestamp", data);
//     },

//     deletetime() {
//       var data = {
//         start: this.datestart,
//         end: this.dateend,
//         form: this.editform
//       };
//       this.$store.dispatch("time/deletetimestamp", data);
//     },

//     updatetimemany() {
//       this.many.datestart = this.desserts[this.indexstart - 1].time;
//       this.many.dateend = this.desserts[this.indexend - 1].time;
//       var data = {
//         start: this.datestart,
//         end: this.dateend,
//         form: this.many
//       };
//       this.$store.dispatch("time/deletetimestamp", data);
//     },

//     formattime(time) {
//       return new Date(time).toLocaleString("th-TH", {
//         timeZone: "Asia/Bangkok"
//       });
//     }
//   },
//   computed: {
//     ...mapState("time", {
//       desserts: "timestamps"
//     }),

//     ...mapGetters("time", {}),

//     ...mapState("faculty", {
//       facultys: "facultys",
//       majors: "majors"
//     })
//   },
//   created() {
//     this.$store.dispatch("faculty/getallfaculty");
//   }
// };
</script>

<style>
</style>