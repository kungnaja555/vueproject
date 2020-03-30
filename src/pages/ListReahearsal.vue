<template>
  <div>
    <v-tabs v-model="tab" background-color="indigo" dark>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <div style="margin-top:15px"></div>
    <v-card v-if="tab==0" flat>
      <div v-for="set in sets" :key="set._id">
        <card-list-rehearsal :form="set" :tab="tab" @edit="edit" @del="del" />
      </div>
      <dialog-list-rehearsal
        :dialog="dialog"
        :form="form"
        :formStatus="formStatus"
        :facultys="facultys"
        :majors="majors"
        @submit="submit"
        @close="close"
      />
    </v-card>
    <v-card v-if="tab==1" flat>
      <!-- <v-card class="mx-auto m-4" width="50%" @click="$router.push({name: 'storagetimefac'})">
        <v-card-text style="font-size: 18px">IF - วิทยาการสารสนเทศ</v-card-text>
        <v-card-text>เวลาเฉลี่ย 1.52 วินาที</v-card-text>
      </v-card>-->
      <card-list-rehearsal :form="set" :tab="tab" />
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
      formStatus: false,
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
    edit(item) {
      this.dialogStatus = 1;
      this.form = Object.assign({}, item);
      this.dialog = true;
    },
    del(item) {
      var id = item._id;
      this.$store.dispatch("set/deleteset", id);
    },
    close() {
      this.dialogStatus = 0;
      this.form = Object.assign({}, this.defaultform);
      this.dialog = false;
    },
    submit(form, status) {
      var payout = {
        id: this.$route.params.id,
        form: form
      };
      if (this.dialogStatus == 0 && status) {
        this.$store.dispatch("set/addset", payout);
      } else if (this.dialogStatus == 1 && status) {
        this.$store.dispatch("set/editset", payout);
      }
      this.close();
    }
  },
  created() {
    this.$store.dispatch("faculty/getforselect");
    this.$store.dispatch("major/getForSelect");
    this.$store.dispatch("set/getallset", this.$route.params.id);
  },
  computed: {
    ...mapState("faculty", {
      facultys: "facultys"
    }),
    ...mapState("set", {
      sets: "sets"
    }),
    ...mapState("major", {
      majors: "majors"
    }),
  }
};
</script>