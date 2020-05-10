<template>
  <div>
    <v-dialog v-model="dialog" width="344">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >{{dialogTitle==0?'เพิ่มข้อมูล':'แก้ไขข้อมูล'}}</v-card-title>

        <v-card-text>
          <v-form v-model="formStatus">
            <v-text-field v-model="set.name" label="ชุดที่" type="Number"></v-text-field>
            <v-text-field v-model="set.years" label="ปีการศึกษา" type="Number"></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('submit',set)">ยืนยัน</v-btn>
          <v-btn color="error" text @click="$emit('close')">ยกเลิก</v-btn>
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
      formStatus: false
    };
  },
  props: {
    set: Object,
    dialog: Boolean,
    dialogTitle: Number
  }
};
</script>

<style>
</style>