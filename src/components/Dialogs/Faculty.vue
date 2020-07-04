<template>
  <div>
    <v-btn class="button-add" width="100px" @click.stop="dialog = true" color="primary">+ เพิ่ม</v-btn>
    <v-dialog v-model="dialog" width="344">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >{{dialogTitle==0?'เพิ่มข้อมูล':'แก้ไขข้อมูล'}}</v-card-title>

        <v-alert
          class="mx-auto mt-2"
          width="90%"
          :value="alert"
          outlined
          dense
          type="error"
        >{{textAlert}}</v-alert>

        <v-card-text v-if="$route.name=='rehearsal'">
          <v-text-field label="ชื่อ" v-model="form.name"></v-text-field>
          <v-text-field label="ปีการศึกษา" type="Number" v-model="form.years"></v-text-field>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="form.date"
                label="วันที่ (ปปปป/ดด/วว)"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="form.date" @input="menu = false"></v-date-picker>
          </v-menu>
        </v-card-text>

        <v-card-text v-else>
          <v-text-field label="รหัส" v-model="form.id"></v-text-field>
          <v-text-field label="คณะ" v-model="form.name"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="checkAlert(form)">ยืนยัน</v-btn>
          <v-btn color="error" text @click="cancel">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "dialog-faculty",
  data() {
    return {
      alert: false,
      textAlert: "",
      menu: false
    };
  },
  methods: {
    checkAlert(form) {
      if (this.$route.name == "faculty") {
        if (form.id == "" || form.name == "") {
          this.alert = true;
          this.textAlert = "กรุณากรอกข้อมูลให้ครบถ้วน";
        } else {
          this.$emit("submit", form);
        }
      } else {
        if (form.name == "" || form.years == "" || form.date == "") {
          this.alert = true;
          this.textAlert = "กรุณากรอกข้อมูลให้ครบถ้วน";
        } else {
          this.$emit("submit", form);
        }
      }
    },
    cancel() {
      this.alert = false;
      this.textAlert = "";
      this.$emit("close");
    }
  },
  props: {
    form: Object,
    dialog: Boolean,
    dialogTitle: Number
  }
};
</script>

<style>
</style>