<template>
  <div>
    <v-fab-transition>
      <v-btn fab x-large dark color="pink" class="button-add" @click.stop="dialog = true">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

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
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-switch v-model="disabledHonour" label="เกียรตินิยม"></v-switch>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="pundit.honour"
                      label="อันดับเกียรตินิยม"
                      :disabled="!disabledHonour"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="clickSubmit()">ยืนยัน</v-btn>
                <v-btn color="primary" text @click="$emit('close')">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card>
            <!-- item index == 0 -->

            <!-- item index == 1 -->
            <v-card color="basil" flat v-if="items.indexOf(item) == 1">
              <v-card-text>
                <input type="file" id="input" />
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="uploadFile()">ยืนยัน</v-btn>
                <v-btn color="primary" text @click="$emit('close')">ยกเลิก</v-btn>
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
      tab: null,
      items: ["สร้างใหม่", "อัปโหลด"],
      title: ["นาย", "นาง", "นางสาว"],
      level: ["ปริญญาตรี", "ปริญญาโท"],
      disabledHonour: false,
      form: {
        no: "",
        id: "",
        title: "",
        firstname: "",
        lastname: "",
        level: "",
        honour: ""
      },
      defaultform: {
        no: "",
        id: "",
        title: "",
        firstname: "",
        lastname: "",
        level: "",
        honour: ""
      },
      fileData: []
    };
  },
  props: {
    pundit: Object,
    dialogTitle: Number,
    facultys: Array,
    dialog: Boolean
  },
  methods: {
    clickSubmit() {
      if (!this.disabledHonour) {
        this.pundit.honour = "";
      }
      this.$emit("submit", this.pundit);
    },
    clickCancel() {
      this.$emit("close");
    },
    uploadFile() {
      const input = document.getElementById("input");
      readXlsxFile(input.files[0]).then(rows => {
        this.$emit("dataExcel", rows);
      });
    }
  }
};
</script>

<style>
</style>