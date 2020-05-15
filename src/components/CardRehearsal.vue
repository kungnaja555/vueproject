<template>
  <v-card class="mx-auto mt-4 width-card-list-rehearsal">
    <v-row>
      <v-col>
        <v-card-text style="font-size: 18px">{{form.name}} - ปีการศึกษา {{form.years}}</v-card-text>
        <v-card-text>{{new Date(form.date).getMonth()}}-{{new Date(form.date).getDate()}}-{{new Date(form.date).getFullYear()}}</v-card-text>
      </v-col>
      <v-col cols="2">
        <v-menu :offset-x="true">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">เมนู</v-btn>
          </template>

          <v-list>
            <v-list-item @click="nextPage">
              <v-list-item-title>ดูรายละเอียด</v-list-item-title>
            </v-list-item>
            <v-list-item @click="gotoReport">
              <v-list-item-title>ดูรายงาน</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$emit('edit',form)">
              <v-list-item-title>แก้ไข</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$emit('del',form)">
              <v-list-item-title>ลบ</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
<!-- 
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="nextPage">ดูรายละเอียด</v-btn>
      <v-btn color="primary" text @click="gotoReport">ดูรายงาน</v-btn>
      <v-btn color="primary" text @click="$emit('edit',form)">แก้ไข</v-btn>
      <v-btn color="error" text @click="$emit('del',form)">ลบ</v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  name: "card-rehearsal",
  data() {
    return {};
  },
  props: {
    form: Object
  },
  methods: {
    nextPage() {
      this.$router.push("/rehearsalfaculty/" + this.form._id);
    },
    gotoReport() {
      this.$router.push("/report/" + this.form._id);
    }
  }
};
</script>

<style>
</style>