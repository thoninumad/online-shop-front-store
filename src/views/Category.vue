<template>
    <div class="main category">
        <v-container grid-list-md>

            <v-img v-if="category.image" :src="getImage(category.image)" height="300px">
              <v-container fill-height fluid pa-2>
                <v-layout fill-height align-center>
                  <v-flex xs12 align-end flexbox class="catagory-content">
                    <p class="category-title">{{category.name}}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-subheader>Products by "{{category.name}}" category"</v-subheader>

            <v-layout row wrap>
        <v-flex v-for="(product, index) in products" xs6 lg3 :key="index" >
          <v-card :to="'/product/'+product.slug" color="transparent" height="100%" class="main-card" >
            <v-img :to="'/product/'+product.slug" :src="getImage(product.image)" height="150px" color="transparent"></v-img>
                  <v-flex xs12 align-center flexbox>
                    <p class="black--text text-block" v-text="product.name"></p>
                    <p>Rp. {{product.price.toLocaleString('id-ID')}}</p>
                  </v-flex>
          </v-card>
        </v-flex>
      </v-layout>

            <v-container>
                <div class="text-xs-center">
                    <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="5"></v-pagination>
                </div>
            </v-container>
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
                category : {},
                products : [],
                page : 0,
                lengthPage : 0
            }
        },
        methods : {
            go() {
                let slug = this.$route.params.slug
                let url = '/categories/slug/'+slug
                if(this.page > 0) url = url + '?page='+this.page
                url = encodeURI(url)
                this.axios.get(url)
                  .then((response) => {
                      let response_data  = response.data
                      let category = response_data.data
                      this.category = category
                      this.products = category.products.data
                      this.lengthPage = category.products.last_page
                  })
                  .catch((error) => {
                      console.log(error.response)
                  })
            },
        },
        created() {
            this.go()
        }
    }
</script>
