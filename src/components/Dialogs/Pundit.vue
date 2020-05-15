<template>
  <div>
    <v-btn color="primary" @click.stop="dialog=true">เพิ่มข้อมูล</v-btn>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >{{dialogTitle==0?'เพิ่มข้อมูล':'แก้ไขข้อมูล'}}</v-card-title>

        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <!-- item index == 0 -->
            <v-card color="basil" flat v-if="items.indexOf(item) == 0">
              <v-alert
                class="mx-auto mt-2"
                width="95%"
                :value="alert"
                outlined
                dense
                type="error"
              >{{textAlert}}</v-alert>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="pundit.no" label="ลำดับที่" type="Number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="pundit.id" label="รหัส"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="pundit.title" :items="title" label="คำนำหน้าชื่อ"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="pundit.firstname" label="ชื่อ"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="pundit.lastname" label="นามสกุล"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="pundit.level"
                      :items="level"
                      item-text="text"
                      item-value="value"
                      label="ระดับปริญญา"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="pundit.honour" label="เกียรตินิยม(ถ้ามี)"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="clickSubmit(pundit)">ยืนยัน</v-btn>
                <v-btn color="error" text @click="clickCancel">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card>
            <!-- item index == 0 -->

            <!-- item index == 1 -->
            <v-card color="basil" flat v-if="items.indexOf(item) == 1">
              <v-card-text>
                <input type="file" id="input" />
                <v-checkbox v-model="checkbox" label="ต้องการล้างข้อมูลทั้งหมดหรือไม่"></v-checkbox>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="uploadFile()">ยืนยัน</v-btn>
                <v-btn color="error" text @click="$emit('close')">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card>
            <!-- item index == 1 -->
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import readXlsxFile from "read-excel-file";
export default {
  name: "dialog-pundit",
  data() {
    return {
      checkbox: false,
      tab: null,
      items: ["สร้างใหม่", "อัปโหลด"],
      title: ["นาย", "นาง", "นางสาว"],
      level: ["ปริญญาตรี", "ปริญญาโท"],
      alert: false,
      textAlert: ""
    };
  },
  props: {
    pundit: Object,
    dialogTitle: Number,
    dialog: Boolean,
    pundits: Array
  },
  methods: {
    clickSubmit(pundit) {
      if (
        pundit.no == "" ||
        pundit.id == "" ||
        pundit.title == "" ||
        pundit.firstname == "" ||
        pundit.lastname == "" ||
        pundit.level == ""
      ) {
        (this.alert = true), (this.textAlert = "กรุณากรอกข้อมูลให้ครบถ้วน");
      } else {
        var x = this.pundits.find(el => el.id == pundit.id);
        if (x) {
          this.alert = true;
          this.textAlert = "มีข้อมูลอยู่ในระบบแล้ว";
        } else {
          this.$emit("submit", pundit);
        }
      }
    },
    clickCancel() {
      this.alert = false;
      this.textAlert = "";
      this.$emit("close");
    },
    uploadFile() {
      const input = document.getElementById("input");
      readXlsxFile(input.files[0]).then(rows => {
        this.$emit("dataExcel", rows, this.checkbox);
      });
    }
  }
};
</script>

<style>
</style>