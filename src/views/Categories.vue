<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>
                All Category
            </v-subheader>

            <v-layout row wrap>
                <v-flex v-for="category in categories" xs6 lg3 :key="category.id">
                    <v-card :to="'/category/'+category.slug">
                        <v-img v-if="category.image" :src="getImage(category.image)" height="150px">
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

        <template>
            <div class="text-xs-center">
                <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="5"></v-pagination>
            </div>
        </template>

    </div>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

<script>
    export default {
        data() {
            return {
                categories : [],
                page : 0,
                lengthPage : 0
            }
        },
        methods : {
            go() {
                let url = '/categories'
                if(this.page > 0) url = '/categories?page='+this.page
                this.axios.get(url)
                  .then((response) => {
                      let response_data  = response.data
                      let categories = response_data.data
                      this.lengthPage = response_data.meta.last_page
                      this.categories = categories
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
