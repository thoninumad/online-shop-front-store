<template>
    <div class="payment">
        <v-subheader class="sub-title">Payment Information</v-subheader>
        <v-card flat>
            <v-container>
                <table class="v-datatable v-table table-hover">
                    <tbody>
                        <tr style="border-bottom:1px solid #ddd"><th class="column text-xs-left">Order ID</th><td>{{payment.order_id}}</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="column text-xs-left">Invoice Number</th><td>{{payment.invoice_number}}</td></tr>
                        <tr><th class="column text-xs-left">Total Bill</th><td>{{payment.total_bill.toLocaleString('id-ID')}}</td></tr>
                    </tbody>
                </table>
            </v-container>
        </v-card>

        <v-subheader class="sub-title">Transfer To</v-subheader>
        <v-card flat>
            <v-container>
                <table class="v-datatable v-table table-hover">
                    <tbody>
                        <tr style="border-bottom:1px solid #ddd">
                            <td><img src="img/bca-baru.png" alt="bca"></td>
                            <td>BCA KCP Mulyosari Surabaya - <strong>Fathoni Nur Muhammad</strong> (No. Rek 140897600000)</td>
                        </tr>
                        <tr>
                            <td><img src="img/mandiri-baru.png" alt="mandiri"></td>
                            <td>BANK MANDIRI KCP Surabaya ITS - <strong>Fathoni Nur Muhammad</strong> (No. Rek 1410016378000)</td>
                        </tr>
                    </tbody>
                </table>
            </v-container>
        </v-card>

        <v-subheader></v-subheader>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12 text-xs-center>
                        <v-btn block color="#bd1544" class="white--text" @click="finish">Finish</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed : {
            ...mapGetters({
                payment : 'payment',
            }),
        },
        methods : {
            finish() {
                this.$router.push('/')
            }
        },
    }
</script>
