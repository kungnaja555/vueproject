<template>
  <div>
    <v-dialog v-model="dialog" width="344">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >{{dialogTitle==0?'เพิ่มข้อมูล':'แก้ไขข้อมูล'}}</v-card-title>

        <v-card-text v-if="$route.name=='rehearsal'">
          <v-text-field label="ชื่อ" v-model="form.name"></v-text-field>
          <v-text-field label="ปีการศึกษา" type="Number" v-model="form.years"></v-text-field>
          <v-text-field label="ปีการศึกษา" type="date" v-model="form.date"></v-text-field>
        </v-card-text>

        <v-card-text v-else>
          <v-text-field label="ชื่อย่อ" v-model="form.id"></v-text-field>
          <v-text-field label="ชื่อ" v-model="form.name"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('submit',form)">ยืนยัน</v-btn>
          <v-btn color="error" text @click="$emit('close')">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "dialog-faculty",
  data() {
    return {};
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