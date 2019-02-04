<template class="main-cart">
    <v-card class="main">
        <v-toolbar color="#fff">
            <v-btn icon @click="close">
                <v-icon>close</v-icon>
            </v-btn>

            <v-toolbar-title>Your Shopping Cart</v-toolbar-title>
            <v-spacer/>
        </v-toolbar>
        <div v-if="countCart===0">
            <v-alert value="true" color="#f5f5f5" class="black--text" icon="new_releases">Keranjang belanja kosong!</v-alert>
        </div>
        <div v-else>
            <v-list two-line>
                <template v-for="item in carts">
                    <v-list-tile :key="item.id" avatar>
                        <v-list-tile-avatar>
                            <img :src="getImage(item.image)">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.name"></v-list-tile-title>
                            <v-list-tile-sub-title>
                                Rp. {{item.price.toLocaleString('id-ID')}}
                                <span style="float:right">
                                    <v-btn icon small rounded depressed @click.stop="removeCart(item)">
                                        <v-icon dark color="error">remove_circle</v-icon>
                                    </v-btn>
                                    {{item.quantity}}
                                    <v-btn icon small rounded depressed @click.stop="addCart(item)">
                                        <v-icon dark color="success">add_circle</v-icon>
                                    </v-btn>
                                </span>
                            </v-list-tile-sub-title>
                            <v-list-tile-sub-title>
                                <v-divider/>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{item.weight}} kg</v-list-tile-action-text>
                        </v-list-tile-action>
                    </v-list-tile>

                </template>
            </v-list>
            <v-card>
                <v-layout row wrap>
                    <v-flex xs6 text-xs-center>
                        Total Price ({{totalQuantity}} items)
                        <div class="title">{{totalPrice.toLocaleString('id-ID')}}</div>
                    </v-flex>
                    <v-flex xs6 text-xs-center>
                        <v-btn color="#bd1544" dark @click="checkout">
                            <v-icon>check_circle</v-icon> &nbsp;
                            Checkout
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </div>
    </v-card>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name : 'cart',
        computed : {
            ...mapGetters({
                carts : 'cart/carts',
                countCart : 'cart/count',
                totalPrice : 'cart/totalPrice',
                totalQuantity : 'cart/totalQuantity',
                totalWeight : 'cart/totalWeight',
            }),
        },
        methods : {
            ...mapActions({
                setStatusDialog : 'dialog/setStatus',
                setAlert : 'alert/set',
                addCart : 'cart/add',
                removeCart : 'cart/remove',
                setCart : 'cart/set',
            }),
            close() {
                this.setStatusDialog(false)
            },
            checkout() {
                this.close()
                this.$router.push({path : "/checkout"})
            }
        },
    }
</script>
