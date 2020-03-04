<template>
  <v-app>
    <sidebar />

    <v-app-bar app clipped-left>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {};
</script>
