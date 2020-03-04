<template>
  <v-dialog v-model="dialog" max-width="344">
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-text-field v-model="form.id" label="รหัส" required></v-text-field>
          <v-text-field v-model="form.title" label="ชื่อย่อ" required></v-text-field>
          <v-text-field v-model="form.name" label="คณะ" required></v-text-field>
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
  name: "dialog-faculty",
  data() {
    return {
      valid: true,
      
    };
  },
  props: {
    dialog: Boolean,
    form: Object
  }
};
</script>

<style>
</style>