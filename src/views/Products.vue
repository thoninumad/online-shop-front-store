<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>
                All Products
            </v-subheader>

            <v-layout row wrap>
                <v-flex v-for="(product, index) in products" xs6 lg3 :key="index">
                    <v-card :to="'/product/'+product.slug">
                        <v-img :src="getImage(product.image)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block" v-text="product.name"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-subheader>Rp. {{product.price.toLocaleString('id-ID')}} </v-subheader>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <template>
            <div class="text-xs-center">
                <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="5"></v-pagination>
            </div>
        </template>

    </div>
</template>

<style scoped>
.text-block {
    position:absolute;
    bottom:5px;
    left:5px;
    background-color: black;
    padding-left: 5px;
    padding-right: 5px;
    opacity: 0.7;
    width:100%;
}
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
                      console.log(error.response)
                  })
            },
        },
        created() {
            this.go()
        }
    }
</script>
