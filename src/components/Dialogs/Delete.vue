<template>
  <v-dialog v-model="dialog" width="344">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>ลบ{{title}}</v-card-title>

      <v-card-text>คุณแน่ใจที่จะลบหรือไม่</v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('sure')">ยืนยัน</v-btn>
        <v-btn color="primary" text @click="$emit('close')">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "dialog-delete",
  props: {
    dialog: Boolean,
    title: String
  }
};
</script>

<style>
</style>