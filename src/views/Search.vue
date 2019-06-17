<template>
    <v-card>
        <v-toolbar dark color="#bd1544">
            <v-btn icon dark @click.native="close">
                <v-icon>close</v-icon>
            </v-btn>

            <v-text-field v-model="keyword" @input="doSearch" hide-details flat label="Search"
            prepend-inner-icon="search" solo-inverted ref="txtSearch"></v-text-field>

        </v-toolbar>

        <v-divider></v-divider>

        <v-subheader v-if="keyword.length>0">Result search "{{keyword}}"</v-subheader>

        <v-alert :value="items.length==0 && keyword.length>0" color="#f5f5f5" class="black--text">Sorry, but no results were found</v-alert>

        <!-- Hasil pencarian -->
        <v-list two-line v-if="items.length>0">
            <template v-for="(item) in items">
                <v-list-tile :key="item.id" avatar @click="close" :to="'/product/'+item.slug">
                    <v-list-tile-avatar>
                        <img :src="'https://dashboard.otomotif-its.id/storage/'+item.image">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.name"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name : 'search',
    data () {
        return {
            keyword : '',
            items : []
        }
    },
    methods : {
        ...mapActions({
            setStatusDialog : 'dialog/setStatus',
        }),
        close() {
            this.setStatusDialog(false)
        },
        doSearch() {
            let keyword = this.keyword
            if(keyword.length>0) {
                this.axios.get('/products/search/'+keyword)
                .then((response) => {
                    let products = response.data.data
                    this.items = products
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error)
                })
            }
        },
    },
    computed : {
        ...mapGetters({
            statusDialog : 'dialog/status',
        }),
    },
    mounted() {
        if(this.$refs.txtSearch != undefined) {
            this.$nextTick(() => this.$refs.txtSearch.focus())
        }
    }
}

</script>
