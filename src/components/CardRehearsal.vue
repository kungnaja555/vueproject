<template>
  <v-card class="mx-auto mt-4 width-card-list-rehearsal">
    <v-row>
      <v-col>
        <v-card-text style="font-size: 18px">{{form.name}} - ปีการศึกษา {{form.years}}</v-card-text>
        <v-card-text>{{new Date(form.date).getMonth()}}-{{new Date(form.date).getDate()}}-{{new Date(form.date).getFullYear()}}</v-card-text>
      </v-col>
      <v-col cols="1">
        <v-menu max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
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
        <!-- <v-icon @click="nextPage">visibility</v-icon>
        <v-icon class="mt-2" @click="gotoReport">fas fa-book-open</v-icon>
        <v-icon class="mt-2" @click="$emit('edit',form)">mdi-pencil</v-icon>
        <v-icon class="mt-2" @click="$emit('del',form)">mdi-delete</v-icon>-->
      </v-col>
    </v-row>
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