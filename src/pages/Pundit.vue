<template>
  <div>
    <table-pundit :headers="headers" :desserts="desserts" />
    <button-add @clickadd="clickadd" />
    <dialog-pundit :dialog="dialog" :form="form" :title="title" :faculty="faculty" :major="major" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "รหัส", value: "id" },
        { text: "คำนำหน้า", value: "title" },
        { text: "ชื่อ", value: "first_name" },
        { text: "นามสกุล", value: "last_name" },
        { text: "คณะ", value: "faculty" },
        { text: "สาขา", value: "major" },
        { text: "เมนู", value: "action" }
      ],
      desserts: [
        {
          id: "59160001",
          title: "นาย",
          first_name: "ยุต",
          last_name: "จัน",
          faculty: "วิทยาการสารสนเทศ",
          major: "เทคโนโลยีสารสนเทศ"
        },
        {
          id: "59160002",
          title: "นาย",
          first_name: "จักกริช",
          last_name: "ชื่นบุญ",
          faculty: "วิทยาการสารสนเทศ",
          major: "วิทยาการคอมพิวเตอร์"
        }
      ],
      form: {
        id: "",
        title: "",
        first_name: "",
        last_name: "",
        faculty: "",
        major: ""
      },
      title: ["นาย", "นาง", "นางสาว"],
      faculty: ["วิทยาการสารสนเทศ"],
      major: ["วิทยาการคอมพิวเตอร์", "เทคโนโลยีสารสนเทศ"]
    };
  },
  methods: {
    clickadd() {
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style>
</style>