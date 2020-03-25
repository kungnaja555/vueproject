<template>
  <div>
    <v-tabs v-model="tab" background-color="indigo" dark>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <div style="margin-top:15px"></div>
    <v-card v-if="tab==0" flat>
      <dialog-list-rehearsal
        :dialog="dialog"
        :form="form"
        :formstatus="formstatus"
        :facultys="facultys"
        @submit="submit"
        @close="close"
      />
    </v-card>
    <v-card v-if="tab==1" flat>
      <v-card class="mx-auto m-4" width="50%" @click="$router.push({name: 'storagetimefac'})">
        <v-card-text style="font-size: 18px">IF - วิทยาการสารสนเทศ</v-card-text>
        <v-card-text>เวลาเฉลี่ย 1.52 วินาที</v-card-text>
      </v-card>
    </v-card>
    <!-- <v-card class="time-menu">
      <div style="margin: 15px">
        <v-alert text dense color="teal" border="left">เพิ่มชุด</v-alert>
        <v-text-field type="Number" label="ชุดที่"></v-text-field>
        <v-select label="คณะ"></v-select>
        <v-select label="สาขา"></v-select>
        <v-btn color="primary" width="100%">เพิ่ม</v-btn>
      </div>
    </v-card>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tab: null,
      items: ["ชุด", "คณะ"],
      dialog: false,
      dialogStatus: 0,
      formstatus: false,
      form: {
        _id: "",
        no: "",
        faculty: "",
        major: "",
        rehearsal: ""
      },
      defaultform: {
        _id: "",
        no: "",
        faculty: "",
        major: "",
        rehearsal: ""
      }
    };
  },
  methods: {
    edit(fac) {
      this.dialogStatus = 1;
      this.form = Object.assign({}, fac);
      this.dialog = true;
    },
    del(fac) {
      var id = fac._id;
      this.$store.dispatch("set/deleteset", id);
    },
    close() {
      this.dialogStatus = 0;
      this.form = Object.assign({}, this.defaultform);
      this.dialog = false;
    },
    submit(form, status) {
      if (this.dialogStatus == 0 && status) {
        this.$store.dispatch("set/addset", form);
      } else if (this.dialogStatus == 1 && status) {
        this.$store.dispatch("set/editset", form);
      }
      this.close();
    },
    getmajor(fac_id){
      this.$store.dispatch("major/getallmajor",fac_id);      
    }
  },
  created() {
    this.$store.dispatch("faculty/getforselect");
  },
  computed: {
    ...mapState("faculty", {
      facultys: "facultys"
    }),
    ...mapState("major", {
      majors: "majors"
    })
  }
};
</script>