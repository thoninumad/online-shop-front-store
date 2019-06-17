<template>
    <div class="main main-products">
        <v-container grid-list-md>
            <h1 class="main-title">SEMUA PRODUK</h1>

            <v-layout row wrap>
                <v-flex v-for="(product, index) in products" xs6 lg3 :key="index" >
                    <v-card :to="'/product/'+product.slug" color="transparent" height="100%" class="main-card" >
                        <v-img :to="'/product/'+product.slug" :src="'https://dashboard.otomotif-its.id/storage/'+product.image" height="150px" color="transparent">
                        </v-img>
                            <v-flex xs12 align-center flexbox>
                                <p class="black--text text-block" v-text="product.name"></p>
                                <p>Rp. {{product.price.toLocaleString('id-ID')}}</p>
                            </v-flex>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container>
            <div class="text-xs-center">
                <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="5"></v-pagination>
            </div>
        </v-container>

    </div>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

<script>
    export default {
        data() {
            return {
                products : [],
                page : 0,
                lengthPage : 0
            }
        },
        methods : {
            go() {
                let url = '/products'
                if(this.page > 0) url = '/products?page='+this.page
                this.axios.get(url)
                  .then((response) => {
                      let response_data  = response.data
                      let products = response_data.data
                      this.lengthPage = response_data.meta.last_page
                      this.products = products
                  })
                  .catch((error) => {
                      // eslint-disable-next-line
                      console.log(error.response)
                  })
            },
        },
        created() {
            this.go()
        }
    }
</script>
