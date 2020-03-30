<template>
  <div>
    <v-fab-transition>
      <v-btn fab x-large dark color="pink" class="button-add" @click.stop="dialog = true">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialog" width="344">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title></v-card-title>

        <v-card-text v-if="$route.name=='rehearsal'">
          <v-form v-model="formStatus">
            <v-text-field label="ชื่อ" :rules="[v => !!v || 'กรุณากรอกข้อมูล']" v-model="form.name"></v-text-field>
            <v-text-field
              label="ปีการศึกษา"
              type="Number"
              :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
              v-model="form.years"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-text v-else>
          <v-form v-model="formStatus">
            <v-text-field
              label="ชื่อย่อ"
              :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
              v-model="form.id"
            ></v-text-field>
            <v-text-field label="ชื่อ" :rules="[v => !!v || 'กรุณากรอกข้อมูล']" v-model="form.name"></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('submit',form,formStatus)">ยืนยัน</v-btn>
          <v-btn color="primary" text @click="$emit('close')">ยกเลิก</v-btn>
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
    formStatus: Boolean
  }
};
</script>

<style>
</style>