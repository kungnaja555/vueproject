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

        <v-card-text>
          <v-form v-model="formstatus">
            <v-text-field
              type="Number"
              label="ชุดที่"
              :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
              v-model="form.no"
            ></v-text-field>
            <v-select
              v-model="form.faculty"
              :items="facultys"
              item-text="name"
              item-value="_id"
              :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
              label="คณะ"
              @change="getmajor"
            ></v-select>
            <!-- <v-select
              v-model="form.major"
              :items="majors"
              item-text="name"
              item-value="_id"
              :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
              label="สาขา"
            ></v-select> -->
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$emit('submit',form,formstatus)">ยืนยัน</v-btn>
          <v-btn color="primary" text @click="$emit('close')">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "dialog-list-rehearsal",
  data() {
    return {
      majors: ""
    };
  },
  props: {
    form: Object,
    dialog: Boolean,
    formstatus: Boolean,
    facultys: Array,
  },
  methods: {
    getmajor(faculty) {
        console.log(this.facultys.indexOf(faculty));
    }
  }
};
</script>

<style>
</style>