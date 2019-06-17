<template>
  <div class="main home">
    <v-carousel hide-delimiters height="550" class="img-carousel">
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" >
        <v-layout fill-height justify-center align-center>
          <div class="desc-header">
            <h2>Selamat datang di STP Otomotif ITS</h2>
            <h1>pusatnya alat-alat keren</h1>
            <v-btn color="#bd1544" class="white--text" large depressed to="/products">Lihat Katalog</v-btn>
          </div>
        </v-layout>
      </v-carousel-item>
    </v-carousel>
    <!-- Bagian Category -->
    <v-container class="main-container">

      <v-layout row wrap fill-height justify-center align-center>
        <v-flex v-for="category in categories" xs6 lg3 :key="category.id">
          <v-card :to="'/category/'+category.slug" class="card-random" elevation="0">
            <v-img :src="'https://dashboard.otomotif-its.id/storage/'+category.image" height="190px" class="img-category">
              <v-container fill-height fluid pa-2>
                <v-layout fill-height align-center>
                  <v-flex xs12 align-end flexbox class="catagory-content">
                    <p class="catagory" v-text="category.name"></p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Bagian product -->
    <v-container grid-list-md class="main-product">

      <h1 class="main-title">PRODUK TERBARU</h1>

      <v-layout row wrap>
        <v-flex v-for="(product, index) in products" xs6 lg3 :key="index" >
          <v-card :to="'/product/'+product.slug" color="transparent" height="100%" class="main-card">
            <v-img :to="'/product/'+product.slug" :src="'https://dashboard.otomotif-its.id/storage/'+product.image" height="150px" color="transparent"></v-img>
            <!-- <v-img :to="'/product/'+product.slug" :src="getImage(product.image)" height="150px" color="transparent"></v-img> -->
            <v-flex xs12 align-center flexbox>
              <p class="black--text text-block" v-text="product.name"></p>
              <p>Rp. {{product.price.toLocaleString('id-ID')}}</p>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
      <div class="btn-product">
        <v-btn class="white--text" color="#bd1544"  large depressed to="/products">SEMUA PRODUK</v-btn>
      </div>
    </v-container>
  </div>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

<script>
export default {
  data: () => ({
    categories: [],
    products: [],
    items: [
      {
        src:
        "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      },
      {
        src:"https://images.unsplash.com/photo-1514443031610-8c063c7a9822?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      }
    ]
  }),
  created() {
    let count = 4;

    this.axios.get("/categories/random/" + count)
      .then(response => {
        let categories = response.data.data;
        this.categories = categories;
      })
      .catch(error => {
        let responses = error.response;
        // eslint-disable-next-line
        console.log(responses);
      });

    count = 8;
    this.axios.get("products/top/" + count)
      .then(response => {
        let products = response.data.data;
        this.products = products;
      })
      .catch(error => {
        let responses = error.response;
        // eslint-disable-next-line
        console.log(responses);
      });
  }
};
</script>
