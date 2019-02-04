<template>
    <div class="my-order">
        <v-container>
            <v-list two-line v-if="items.length>0">
                <template v-for="item in items">
                    <v-list-tile :key="item.id">
                        <v-list-tile-content>
                            <v-list-tile-title>INVOICE: {{item.invoice_number}}</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary">Rp. {{item.total_bill.toLocaleString('id-ID')}}</v-list-tile-sub-title>
                            <v-list-tile-sub-title>date: {{item.updated_at}}. courier: {{item.courier_service}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>{{item.status}}</v-list-tile-action-text>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider :key="'div_'+item.id"></v-divider>
                </template>
            </v-list>
        </v-container>
    </div>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
            return {
                items : [],
            }
        },
        computed : {
            ...mapGetters({
                user : 'auth/user',
            })
        },
        methods : {
            ...mapActions({
                setAlert : 'alert/set',
            }),
        },
        mounted() {
            let config = {
                headers : {
                    'Authorization' : 'Bearer ' + this.user.api_token,
                },
            }
            this.axios.get('/my-order', config)
              .then((response) => {
                  let orders = response.data.data
                  this.items = orders
              })
              .catch((error) => {
                  let responses = error.response
                  this.setAlert({
                      status : true,
                      text : responses.data.message,
                      type : 'error',
                  })
              })
        }
    }
</script>
