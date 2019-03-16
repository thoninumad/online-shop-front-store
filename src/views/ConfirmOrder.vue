<template>
    <div class="about">
        <v-container>
            <v-card flat>
                <v-container>
                    <v-form ref="form" lazy-validation enctype="multipart/form-data">
                        <v-img :src="imageUrl" max-width="300" v-if="imageUrl"></v-img>
                        <v-text-field label="Select Image" @click='pickFile' v-model='imageName' append-icon='attach_file'></v-text-field>
                        <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked" required>

                        <p>Invoice Number : {{order.invoice_number}}</p>

                        <div class="text-xs-center">
                            <v-btn large color="#bd1544" class="white--text" @click="confirm">
                                konfirmasi
                            </v-btn>
                        </div>
                    </v-form>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>


<style lang="css">
  @import '/css/main.css';
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data () {
            return {
                order : {},
                imageName : '',
                imageUrl : '',
                imageFile : ''
            }
        },
        computed : {
            ...mapGetters({
                user : 'auth/user',
            }),
        },
        methods : {
            ...mapActions({
                setAlert : 'alert/set',
            }),
            pickFile () {
                this.$refs.image.click()
            },
            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0]
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            },
            confirm() {
                let formData = new FormData()
                formData.set('payment_evidence', this.imageFile)
                formData.set('invoice_number', this.order.invoice_number)

                let config = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.user.api_token,
                    },
                }

                this.axios.post('/confirmation', formData, config)
                  .then((response) => {
                      let response_data = response.data
                      if(response_data && response_data.status=='success') {
                          this.$router.push({path: "/my-order"})
                      }

                      this.setAlert({
                          status : true,
                          text : response_data.message,
                          type : response_data.status,
                      })
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
        },
        mounted() {
            let invoice = this.$route.params.invoice_number
            let config = {
                headers : {
                    'Authorization' : 'Bearer ' + this.user.api_token,
                },
            }
            this.axios.get('/confirmation/invoice/'+invoice, config)
              .then((response) => {
                  let order = response.data.data
                  this.order = order
              })
              .catch((error) => {
                  let responses = error.response
                  console.log(responses)
              })
        }
    }
</script>
