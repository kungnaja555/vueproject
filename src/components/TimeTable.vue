<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">ตำแหน่งที่</th>
          <th class="text-left">เวลา</th>
          <th class="text-left">คณะ</th>
          <th class="text-left">สาขา</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in desserts" :key="item._id" @click="$emit('getdessert',item)">
          <td>{{ index+1 }}</td>
          <td>{{ new Date(item.time).toLocaleString('th-TH',{timeZone:'Asia/Bangkok'}) }}</td>
          <td><div v-if="item.faculty != undefined">{{ item.faculty.name }}</div></td>
          <td><div v-if="item.major != undefined">{{item.major.name}}</div></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "time-table",
  props: {
    desserts: Array
  },
  methods: {
  }
};
</script>