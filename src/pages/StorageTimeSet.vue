<template>
  <div>
    <div style="width: 80%">
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="mx-auto elevation-1"
        style="width: 60%"
        hide-default-footer
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
      >
        <template
          v-slot:item.no="{ item }"
        >{{ desserts.map(function(x) {return x.id; }).indexOf(item.id) + 1 }}</template>
        <template v-slot:item.actions="{  }">
          <v-icon small>mdi-delete</v-icon>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>

    <v-card class="time-menu">
      <v-card-text>
        <div style="margin: 15px">เวลาเฉลี่ย 1.53 วินาที</div>
        <v-divider></v-divider>
        <div style="margin: 15px">
          <v-form ref="formMany" v-model="validmany" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  type="Number"
                  label="ตั้งแต่"
                  :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field type="Number" label="ถึง" :rules="[v => !!v || 'กรุณากรอกข้อมูล']"></v-text-field>
              </v-col>
            </v-row>
            <v-text-field label="คำตอบ" disabled></v-text-field>
            <v-btn color="primary" width="100%" @click="$refs.formMany.validate()">หาค่าเฉลี่ย</v-btn>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 30,
      headers: [
        { text: "ลำดับที่", value: "no" },
        { text: "เวลา", value: "time" },
        { text: "ชุดที่", value: "set" },
        { text: "เมนู", value: "actions", sortable: false }
      ],
      desserts: [
        {
          id: 1,
          time: "12-3-2015 18:30:00",
          set: 1
        },
        {
          id: 2,
          time: "12-3-2015 18:30:02",
          set: 1
        }
      ]
    };
  }
};
</script>

<style>
</style>