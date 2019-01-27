<template>
    <div class="about">
        <v-container>
            <v-subheader class="title">{{product.name}}</v-subheader>
            <v-img v-if="product.image" :src="getImage(product.image)" max-width="300"></v-img>

            <v-subheader>Information</v-subheader>
            <v-card flat>
                <table class="v-datatable v-table table-hover">
                    <tbody>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Producer</th><td>{{product.producer}}</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Price</th><td v-if="product.price">Rp. {{product.price.toLocaleString('id-ID')}}</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Weight</th><td>{{product.weight}} kg</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Stock</th><td>{{product.stock}}</td></tr>
                        <tr><th class="text-xs-left">Categories</th>
                            <td>
                                <template v-for="category in product.categories" v-key="category.id">{{category.name}}, </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </v-card>

            <v-subheader>Description</v-subheader>
            <p class="body-2">{{product.description}}</p>

            <div style="position:relative">
                <v-btn block color="success" @click="buy" :disabled="product.stock==0">
                    <v-icon>save_alt</v-icon> &nbsp; BUY
                </v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            product :{},
        }
    },
    methods : {
        ...mapActions({
            addCart : 'cart/add',
            setAlert : 'alert/set',
        }),
        buy() {
            this.addCart(this.product)
            this.setAlert({
                status : true,
                text : 'Added to cart',
                type : 'success',
            })
        }
    },
    created() {
        let slug = this.$route.params.slug
        this.axios.get('/products/slug/'+slug)
          .then((response) => {
              let product = response.data.data
              this.product = product
          })
          .catch((error) => {
              let responses = error.response
              console.log(responses)
          })
    }
}
</script>
