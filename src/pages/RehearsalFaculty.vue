<template>
  <div>
    <router-link :to="`/rehearsal`">ย้อนกลับ</router-link>
    <div style="font-size:25px;">{{rehearsal.name}} - ปีการศึกษา {{rehearsal.years}}</div>
    <div v-for="fac in myfacultys" :key="fac._id">
      <v-card class="mx-auto mt-4" width="40%">
        <v-row>
          <v-col>
            <v-card-text style="font-size: 18px" v-if="fac.type == 2">{{fac.name}}</v-card-text>
            <v-card-text style="font-size: 18px" v-else>{{fac.id}} - {{fac.name}}</v-card-text>
          </v-col>
          <v-col cols="3">
            <v-icon class="mt-4 mr-2" @click="nextPage(fac)">visibility</v-icon>
            <v-icon class="mt-4 mr-2" v-if="fac.type == 2" @click="edit(fac)">mdi-pencil</v-icon>
            <v-icon class="mt-4" @click="del(fac)">mdi-delete</v-icon>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <v-btn class="button-add" width="100px" @click.stop="dialog = true" color="primary">+ เพิ่ม</v-btn>

    <v-dialog v-model="dialog" scrollable width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >{{dialogTitle==0?'เพิ่มข้อมูล':'แก้ไขข้อมูล'}}</v-card-title>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
          v-if="dialogTitle==0"
        >
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" v-if="dialogTitle==0">
          <v-tab-item v-for="item in items" :key="item">
            <!-- item index == 0 -->
            <v-card color="basil" flat v-if="items.indexOf(item) == 0">
              <v-card-text style="height: 300px;">
                <div v-if="facultys.length==0">ไม่พบข้อมูล</div>
                <v-checkbox
                  v-model="chooseall"
                  label="เลือกทั้งหมด"
                  @change="changeValueCheckbox(facultys)"
                  v-if="facultys.length > 0"
                ></v-checkbox>
                <div v-for="fac in facultys" :key="fac._id">
                  <v-checkbox v-model="form.facultys" :label="fac.name" :value="fac._id"></v-checkbox>
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
            <v-text-field class="mt-4 mx-auto" style="width:80%" v-model="form.name" label="ชื่อ"></v-text-field>
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
      chooseall: false,
      dialog: false,
      tab: null,
      items: ["เลือกทีมี", "สร้างใหม่"],
      form: {
        name: "",
        facultys: []
      },
      dialogTitle: 0
    };
  },
  computed: {
    ...mapState("faculty", {
      facultys: "facultys",
      myfacultys: "myfacultys"
    }),
    ...mapState("rehearsal", {
      rehearsal: "rehearsal"
    })
  },
  methods: {
    edit(fac) {
      this.dialogTitle = 1;
      this.form = Object.assign({}, fac);
      this.dialog = true;
    },
    del(fac) {
      this.form = Object.assign({}, fac);
      this.dialogDel = true;
    },
    async sure() {
      var payout = {
        re_id: this.$route.params.re_id,
        form: this.form
      };
      if (this.form.type == 2) {
        await this.$store.dispatch("faculty/deleteGroup", payout);
      } else {
        await this.$store.dispatch("faculty/removeRehearsalInFaculty", payout);
      }
      this.close();
    },
    async submit(status) {
      var payout = {
        re_id: this.$route.params.re_id,
        form: this.form
      };
      if (status == 1) {
        await this.$store.dispatch("faculty/updateSomeAttrRehearsal", payout);
        this.close();
      } else if (status == 2) {
        if (this.form.name == "") {
          this.alert = true;
          this.textAlert = "กรุณากรกอกข้อมูลให้ครบถ้วน";
        } else {
          await this.$store.dispatch("faculty/addFacultyInRehearsal", payout);
          this.close();
        }
      } else {
        if (this.form.name == "") {
          this.alert = true;
          this.textAlert = "กรุณากรกอกข้อมูลให้ครบถ้วน";
        } else {
          await this.$store.dispatch("faculty/editGroup", payout);
          this.close();
        }
      }
    },
    close() {
      this.alert = false;
      this.textAlert = "";
      this.dialogDel = false;
      this.chooseall = false;
      this.tab = null;
      this.dialogTitle = 0;
      this.form.name = "";
      this.form.facultys = [];
      this.dialog = false;
    },
    nextPage(fac) {
      var re_id = this.$route.params.re_id;
      var fac_id = fac._id;
      this.$router.push(`/rehearsalset/${re_id}/${fac_id}`);
    },
    changeValueCheckbox(facultys) {
      if (this.chooseall) {
        facultys.forEach(el => {
          this.form.facultys.push(el._id);
        });
      } else {
        this.form.facultys = [];
      }
    }
  },
  created() {
    var payout = {
      re_id: this.$route.params.re_id
    };
    this.$store.dispatch("faculty/getFacultysByRehearsal", payout);
    this.$store.dispatch("rehearsal/getRehearsal", payout.re_id);
  }
};
</script>

<style>
</style>