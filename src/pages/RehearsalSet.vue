<template>
  <div>
    <router-link :to="`/rehearsalfaculty/${this.$route.params.re_id}`">ย้อนกลับ</router-link>
    <div style="font-size:25px;">{{showCurrentPlace(rehearsal,faculty)}}</div>
    <div v-for="set in mysets" :key="set._id">
      <v-card class="mx-auto mt-4" width="40%">
        <v-row>
          <v-col>
            <v-card-text style="font-size: 18px">{{showMember(set)}}</v-card-text>
          </v-col>
          <v-col cols="3">
            <v-icon class="mt-4 mr-2" @click="nextPage(set)">visibility</v-icon>
            <v-icon class="mt-4 mr-2" v-if="set.status == 1" @click="edit(set)">mdi-pencil</v-icon>
            <v-icon class="mt-4" @click="del(set)">mdi-delete</v-icon>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <v-btn class="button-add" width="100px" @click.stop="dialog = true" color="primary">+ เพิ่ม</v-btn>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >{{dialogTitle==0?'เพิ่มข้อมูล':'แก้ไขข้อมูล'}}</v-card-title>

        <v-card color="basil" flat v-if="dialogTitle==0 && factype == 2">
          <v-alert
            class="mx-auto mt-2"
            width="90%"
            :value="alert"
            outlined
            dense
            type="error"
          >{{textAlert}}</v-alert>
          <v-card-text>
            <v-text-field class="mt-4 mx-auto" style="width:80%" v-model="form.name" label="ชื่อ"></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submit(2)">ยืนยัน</v-btn>
            <v-btn color="primary" text @click="close">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
          v-if="dialogTitle==0 && factype != 2"
        >
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" v-if="dialogTitle==0 && factype != 2">
          <v-tab-item v-for="item in items" :key="item">
            <!-- item index == 0 -->
            <v-card color="basil" flat v-if="items.indexOf(item) == 0">
              <v-card-text>
                <div v-if="sets.length==0">ไม่พบข้อมูล</div>
                <v-checkbox
                  v-model="chooseall"
                  label="เลือกทั้งหมด"
                  @change="changeValueCheckbox(sets)"
                  v-if="sets.length > 0"
                ></v-checkbox>
                <div v-for="set in sets" :key="set._id">
                  <v-checkbox v-model="form.sets" :label="labelCheckbox(set)" :value="set._id"></v-checkbox>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="submit(1)">ยืนยัน</v-btn>
                <v-btn color="error" text @click="close">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card>
            <!-- item index == 0 -->

            <!-- item index == 1 -->
            <v-card color="basil" flat v-if="items.indexOf(item) == 1">
              <v-alert
                class="mx-auto mt-2"
                width="90%"
                :value="alert"
                outlined
                dense
                type="error"
              >{{textAlert}}</v-alert>
              <v-card-text>
                <v-text-field
                  class="mt-4 mx-auto"
                  style="width:80%"
                  v-model="form.name"
                  label="ชื่อ"
                ></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="submit(2)">ยืนยัน</v-btn>
                <v-btn color="error" text @click="close">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card>
            <!-- item index == 1 -->
          </v-tab-item>
        </v-tabs-items>

        <v-card color="basil" flat v-if="dialogTitle==1">
          <v-alert
            class="mx-auto mt-2"
            width="90%"
            :value="alert"
            outlined
            dense
            type="error"
          >{{textAlert}}</v-alert>
          <v-card-text>
            <v-text-field class="mt-4 mx-auto" style="width:80%" v-model="editname" label="ชื่อ"></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submit(3)">ยืนยัน</v-btn>
            <v-btn color="error" text @click="close">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <dialog-delete :dialog="dialogDel" @sure="sure" @close="close" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      alert: false,
      textAlert: "",
      dialogDel: false,
      dialog: false,
      chooseall: false,
      tab: null,
      items: ["เลือกทีมี", "สร้างใหม่"],
      form: {
        name: "",
        sets: []
      },
      defaultform: {
        name: "",
        sets: []
      },
      dialogTitle: 0,
      editname: "",
      factype: 0
    };
  },
  computed: {
    ...mapState("set", {
      sets: "sets",
      mysets: "mysets"
    }),
    ...mapState("rehearsal", {
      rehearsal: "rehearsal"
    }),
    ...mapState("faculty", {
      faculty: "faculty"
    })
  },
  methods: {
    edit(set) {
      var re_id = this.$route.params.re_id;
      this.dialogTitle = 1;
      this.form = Object.assign({}, set);
      var content = set.contents.find(el => el.rehearsal == re_id);
      this.editname = content.name;
      this.dialog = true;
    },
    del(set) {
      this.form = Object.assign({}, set);
      this.dialogDel = true;
    },
    sure() {
      var payout = {
        re_id: this.$route.params.re_id,
        fac_id: this.$route.params.fac_id,
        form: this.form
      };
      if (this.form.status == 0) {
        this.$store.dispatch("set/removeContentInSet", payout);
      } else {
        this.$store.dispatch("set/deleteNewContentInSet", payout);
      }
      this.close();
    },
    submit(status) {
      var payout = {
        re_id: this.$route.params.re_id,
        fac_id: this.$route.params.fac_id,
        form: this.form,
        editname: this.editname
      };
      if (status == 1) {
        this.$store.dispatch("set/addSomeContentInSet", payout);
        this.close();
      } else if (status == 2) {
        if (this.form.name == "") {
          this.alert = true;
          this.textAlert = "กรุณากรอกข้อมูลให้ครบถ้วน";
        } else {
          this.$store.dispatch("set/addNewContentInSet", payout);
          this.close();
        }
      } else {
        if (this.editname == "") {
          this.alert = true;
          this.textAlert = "กรุณากรอกข้อมูลให้ครบถ้วน";
        } else {
          this.$store.dispatch("set/editNewContentInSet", payout);
          this.close();
        }
      }
    },
    close() {
      this.tab = null;
      this.dialogTitle = 0;
      this.form = Object.assign({}, this.defaultform);
      this.dialog = false;
      this.dialogDel = false;
    },
    nextPage(set) {
      var re_id = this.$route.params.re_id;
      var fac_id = this.$route.params.fac_id;
      var set_id = set._id;
      this.$router.push(`/rehearsalpundit/${re_id}/${fac_id}/${set_id}`);
    },
    labelCheckbox(set) {
      var content = set.contents.find(el => el.rehearsal == null);
      return "ชุดที่ " + content.name;
    },
    showMember(set) {
      var re_id = this.$route.params.re_id;
      var content = set.contents.find(el => el.rehearsal == re_id);
      if (set.status == 0) return "ชุดที่ " + content.name;
      return content.name;
    },
    showCurrentPlace(rhs, fac) {
      this.factype = fac.type;
      if (fac.type == 2) {
        return `${rhs.name} - ปีการศึกษา ${rhs.years} / ${fac.name}`;
      } else {
        return `${rhs.name} - ปีการศึกษา ${rhs.years} / ${fac.id} - ${fac.name}`;
      }
    },
    changeValueCheckbox(sets) {
      if (this.chooseall) {
        sets.forEach(el => {
          this.form.sets.push(el._id);
        });
      } else {
        this.form.sets = [];
      }
    }
  },
  created() {
    var payout = {
      re_id: this.$route.params.re_id,
      fac_id: this.$route.params.fac_id
    };
    this.$store.dispatch("set/getSetsByFaculty", payout);
    this.$store.dispatch("rehearsal/getRehearsal", payout.re_id);
    this.$store.dispatch("faculty/getFaculty", payout.fac_id);
  }
};
</script>

<style>
</style>