<template>
  <v-dialog v-model="dialog" max-width="344">
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-text-field v-model="form.id" label="รหัส" required></v-text-field>
          <v-select v-model="form.title" :items="title" label="คำนำหน้า" required></v-select>
          <v-text-field v-model="form.first_name" label="ชื่อ" required></v-text-field>
          <v-text-field v-model="form.last_name" label="นามสกุล" required></v-text-field>
          <v-select v-model="form.faculty" :items="faculty" label="คณะ" required></v-select>
          <v-select v-model="form.major" :items="major" label="สาขา" required></v-select>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

        <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "dialog-pundit",
  data() {
    return {
      valid: true
    };
  },
  props: {
    dialog: Boolean,
    form: Object,
    title: Array,
    faculty: Array,
    major: Array
  }
};
</script>

<style>
</style>