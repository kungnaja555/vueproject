<template>
  <v-navigation-drawer app clipped>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title @click="setroute(item.name)">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      items: [
        { title: "การซ้อม", icon: "mdi-view-dashboard", name: "rehearsal" },
        { title: "บัณฑิต", icon: "mdi-image", name: "pundit" },
        { title: "คณะ", icon: "mdi-help-box", name: "faculty" }
      ]
    };
  },
  methods: {
    setroute(route) {
      if(this.$route.name != route) {
        this.$router.push({ name: route })
      }  
    }
  }
};
</script>

<style>
</style>