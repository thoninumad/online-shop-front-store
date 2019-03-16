<template>
  <!-- toolbar vuetify dengan warna primary -->
  <v-toolbar fixed color="#fff">
    <!-- header bagian kiri -->
    <v-toolbar-side-icon v-if="isHome" @click="setSideBar(!sideBar)" ></v-toolbar-side-icon>
    <v-btn v-if="!isHome" icon @click="$router.go(-1)" >
      <v-icon>arrow_back</v-icon>
    </v-btn>

    <!-- header bagian tengah -->
    <img class="main-logo" src="/img/icons/logo-128.png" alt="">

    <!-- separator supaya header bagian kanan posisinya rata kanan -->
    <v-spacer></v-spacer>

     <v-btn icon @click="search()">
        <v-icon>search</v-icon>
    </v-btn>

    <!-- header bagian kanan -->
    <v-btn icon @click="cart()">
      <v-badge left overlap color="#c83131">
        <span slot="badge" v-if="countCart>0">{{countCart}}</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>

    <!-- kolom pencarian di bawah header -->

  </v-toolbar>

</template>

<style lang="css">
  @import '/css/main.css';
</style>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "c-header",
  methods: {
    ...mapActions({
      setSideBar: "setSideBar",
      setStatusDialog: "dialog/setStatus",
      setComponent: "dialog/setComponent"
    }),
    search() {
      this.setStatusDialog(true);
      this.setComponent("search");
      this.setSideBar(false);
    },
    cart() {
      this.setStatusDialog(true);
      this.setComponent("cart");
      this.setSideBar(false);
    }
  },
  computed: {
    ...mapGetters({
      sideBar: "sideBar",
      countCart: "cart/count"
    }),
    isHome() {
      return this.$route.path === "/";
    }
  }
};
</script>
