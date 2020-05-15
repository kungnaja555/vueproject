<template>
  <div>
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

        <v-card-text>
          <v-form v-model="formStatus">
            <v-text-field v-model="set.name" label="ชุดที่" type="Number"></v-text-field>
            <v-text-field v-model="set.years" label="ปีการศึกษา" type="Number"></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="checkAlert(set)">ยืนยัน</v-btn>
          <v-btn color="error" text @click="cancel">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "dialog-set",
  data() {
    return {
      alert: false,
      textAlert: ""
    };
  },
  props: {
    set: Object,
    dialog: Boolean,
    dialogTitle: Number
  },
  methods: {
    checkAlert(form) {
      if (form.name == "" || form.years == "") {
        this.alert = true;
        this.textAlert = "กรุณากรอกข้อมูลให้ครบถ้วน";
      } else {
        this.$emit("submit", form);
      }
    },
    cancel() {
      this.alert = false;
      this.textAlert = "";
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>