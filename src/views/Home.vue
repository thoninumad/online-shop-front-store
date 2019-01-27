<template>
    <div>
        <!-- Bagian Category -->
        <v-container grid-list-md>
            <v-subheader>
                Random Category
                <v-spacer></v-spacer>
                <router-link to="/categories">See All</router-link>
            </v-subheader>

            <v-layout row wrap>
                <v-flex v-for="category in categories" xs6 lg3 :key="category.id">
                    <v-card :to="'/category/'+category.slug">
                        <v-img :src="getImage(category.image)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block" v-text="category.name"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn>See Category</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- Bagian product -->
        <v-container grid-list-md>
            <v-subheader>
                Top Products
                <v-spacer></v-spacer>
                <router-link to="/products">See All</router-link>
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
export default{
    data : () => ({
        categories: [],
        products: []
    }),
    created() {
        let count = 4

        this.axios.get('/categories/random/'+count)
            .then((response) => {
                let categories = response.data.data
                this.categories = categories
            })
            .catch((error) => {
                let responses = error.response
                console.log(responses)
            })

        count = 8
        this.axios.get('products/top/'+count)
            .then((response) => {
                let products = response.data.data
                this.products = products
            })
            .catch((error) => {
                let responses = error.response
                console.log(responses)
            })
    }
}
</script>
