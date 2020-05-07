<template>
  <div>
    <router-link :to="`/set/${this.$route.params.fac_id}`">ย้อนกลับ</router-link>
    <div style="font-size:25px;">{{showCurrentPlace(faculty,set)}}</div>
    <v-card class="mx-auto mt-4 width-table-pundit">
      <v-data-table
        :headers="pundits_headers"
        :items="pundits"
        :page.sync="pundits_page"
        :items-per-page="pundits_itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pundits_pageCount = $event"
        :search="pundits_search"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
              <v-text-field
                v-model="pundits_search"
                label="ค้นหา"
                full-width="50%"
              ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="clearPundit">ล้างทั้งหมด</v-btn>
          </v-toolbar>
        </template>
        <!-- <template v-slot:top>
          <v-text-field v-model="pundits_search" label="ค้นหา" class="width-search-table-pundit"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn>ล้างทั้งหมด</v-btn>
        </template>-->

        <template v-slot:item.level="{ item }">{{item.level==1?'ปริญญาตรี':'ปริญญาโท'}}</template>

        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-2" small @click="edit(item)">mdi-pencil</v-icon>
          <v-icon small @click="del(item)">mdi-delete</v-icon>
        </template>

        <template v-slot:no-data>ไม่พบข้อมูล</template>
      </v-data-table>
    </v-card>
    <div class="text-center pt-2">
      <v-pagination v-model="pundits_page" :length="pundits_pageCount"></v-pagination>
    </div>

    <dialog-pundit
      :dialog="dialog"
      :pundit="pundit"
      :dialogTitle="dialogTitle"
      :file="file"
      @dataExcel="dataExcel"
      @submit="submit"
      @close="close"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pundits_page: 1,
      pundits_pageCount: 0,
      pundits_itemsPerPage: 10,
      pundits_search: "",
      pundits_headers: [
        { text: "ลำดับที่", value: "no", sortable: false },
        { text: "รหัส", value: "id", sortable: false },
        { text: "คำนำหน้าชื่อ", value: "title", sortable: false },
        { text: "ชื่อ", value: "firstname", sortable: false },
        { text: "นามสกุล", value: "lastname", sortable: false },
        { text: "ระดับปริญญา", value: "level", sortable: false },
        { text: "เกียรตินิยม", value: "honour", sortable: false },
        { text: "เมนู", value: "actions", sortable: false }
      ],
      dialog: false,
      dialogTitle: 0,
      file: [],
      pundit: {
        no: "",
        id: "",
        title: "",
        firstname: "",
        lastname: "",
        level: "",
        honour: ""
      },
      defaultpundit: {
        no: "",
        id: "",
        title: "",
        firstname: "",
        lastname: "",
        level: "",
        honour: ""
      }
    };
  },
  methods: {
    edit(item) {
      this.dialogTitle = 1;
      this.pundit = Object.assign({}, item);
      this.dialog = true;
    },
    del(item) {
      var payout = {
        set_id: this.$route.params.set_id,
        pundit: item
      };
      this.$store.dispatch("pundit/deletePundit", payout);
    },
    clearPundit() {
      var payout = {
        set_id: this.$route.params.set_id,
      };
      this.$store.dispatch("pundit/clearPunditBySet", payout);
    },
    submit(item) {
      var payout = {
        set_id: this.$route.params.set_id,
        pundit: item
      };
      if (this.dialogTitle == 0) {
        this.$store.dispatch("pundit/addPundit", payout);
        this.close();
      } else {
        this.$store.dispatch("pundit/editPundit", payout);
        this.close();
      }
    },
    close() {
      this.dialog = false;
      this.dialogTitle = 0;
      this.pundit = Object.assign({}, this.defaultpundit);
    },
    showCurrentPlace(fac, set) {
      var content = set.contents.find(el => el.rehearsal == null);
      return `${fac.id} - ${fac.name} / ชุดที่ ${content.name} - ปีการศึกษา ${content.years}`;
    },
    dataExcel(data) {
      var payout = {
        set_id: this.$route.params.set_id,
        data: data
      };
      this.$store.dispatch("pundit/uploadFile", payout);
    }
  },
  created() {
    var payout = {
      set_id: this.$route.params.set_id
    };
    this.$store.dispatch("pundit/getAllPundit", payout);
    this.$store.dispatch("set/getSet", payout);
    this.$store.dispatch("faculty/getFaculty", this.$route.params.fac_id);
  },
  computed: {
    ...mapState("pundit", {
      pundits: "pundits"
    }),
    ...mapState("set", {
      set: "set"
    }),
    ...mapState("faculty", {
      faculty: "faculty"
    })
  }
};
</script>

<style>
</style>