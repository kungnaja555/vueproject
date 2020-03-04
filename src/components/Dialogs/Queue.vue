<template>
  <v-dialog v-model="dialog" max-width="344">
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-select v-model="faculty" :items="facultys" label="เลือกคณะ" required></v-select>
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
  name: "dialog-queue",
  data() {
    return {
      valid: true
    };
  },
  props: {
    dialog: Boolean,
    faculty: null,
    facultys: Array,
  }
};
</script>

<style>
</style>