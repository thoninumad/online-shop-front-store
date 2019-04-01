<template>
    <div class="about">
        <v-container>
            <v-layout fill-height justify-center style="text-align:center;">
                <p class="main-title">{{product.name}}</p>
            </v-layout>
            <v-layout fill-height justify-center>
                <v-img v-if="product.image" :src="getImage(product.image)" max-width="300"></v-img>
            </v-layout>
            <v-subheader style="margin-top:60px;">Informasi</v-subheader>
            <v-card flat>
                <table class="v-datatable v-table table-hover">
                    <tbody>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Produsen</th><td>{{product.producer}}</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Harga</th><td v-if="product.price">Rp. {{product.price.toLocaleString('id-ID')}}</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Berat</th><td>{{product.weight}} kg</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Stok</th><td>{{product.stock}}</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Kategori</th>
                            <td>
                                <template v-for="category in product.categories" v-key="category.id">{{category.name}}, </template>
                            </td>
                        </tr>
<<<<<<< HEAD
                        <tr ><th class="text-xs-left">Deskripsi</th><td><p v-html="product.description">{{product.description}}</p></td></tr>
=======
                        <tr><th class="text-xs-left">Description</th><td><p v-html="product.description">{{product.description}}</p></td></tr>
>>>>>>> 9c721a65e71b103eaf2b2e24464437010525f073
                    </tbody>
                </table>
            </v-card>

            <div style="position:relative;margin-top:30px;">
                <v-btn block dark color="#bd1544" @click="buy" :disabled="product.stock==0">
                    <v-icon>save_alt</v-icon> &nbsp; BELI
                </v-btn>
            </div>
        </v-container>
    </div>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

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
