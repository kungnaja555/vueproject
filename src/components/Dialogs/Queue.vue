<template>
  <v-dialog v-model="dialog" max-width="344">
    <v-card>
      <v-card-title class="headline">เพิ่มคิว</v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-select
            v-model="faculty"
            :items="facultys"
            item-text="name"
            item-value="_id"
            label="เลือกคณะ"
            required
          ></v-select>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="success(1)">ยกเลิก</v-btn>

        <v-btn color="green darken-1" text @click="success(0)">ยืนยัน</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "dialog-queue",
  data() {
    return {
      valid: true,
      faculty: null
    };
  },
  props: {
    dialog: Boolean,
    facultys: Array
  },
  methods: {
    success(status){
      this.$emit('dialogqueue',status,this.faculty)
    }
  }
};
</script>

<style>
</style>