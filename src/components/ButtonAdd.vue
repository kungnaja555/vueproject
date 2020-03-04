<template>
  <v-fab-transition>
    <v-btn
      fab
      x-large
      dark
      color="pink"
      class="button-add"
      @click="$emit('clickadd')"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: "button-add",
};
</script>

<style>
</style>