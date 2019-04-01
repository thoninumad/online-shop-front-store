<template>
    <v-card>
        <v-toolbar dark color="#bd1544">
            <v-btn icon dark @click="close">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Ubah Password</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="current_password" :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :rules="current_passwordRules" :type="showPassword ? 'text' : 'password'" label="Current Password" hint="At least 6 characters"
                counter @click:append="showPassword = !showPassword"></v-text-field>
                <v-text-field v-model="new_password" :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :rules="new_passwordRules" :type="showPassword ? 'text' : 'password'" label="New Password" hint="At least 6 characters"
                counter @click:append="showPassword = !showPassword"></v-text-field>
                <v-text-field v-model="password_confirmation" :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :rules="password_confirmationRules" :type="showPassword ? 'text' : 'password'" label="Confirm Password" hint="At least 6 characters"
                counter @click:append="showPassword = !showPassword"></v-text-field>

                <div class="text-xs-center">
                    <v-btn color="#bd1544" :disabled="!valid" @click="update" class="white--text" large>
                        Simpan
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name : 'changePassword',
        data () {
            return {
                valid : true,
                showPassword : false,
                current_password : '',
                current_passwordRules : [
                    v => !!v || 'Current Password required.',
                ],
                new_password : '',
                new_passwordRules : [
                    v => !!v || 'New Password required.',
                    v => (v && v.length >= 6) || 'Min 6 characters',
                ],
                password_confirmation : '',
                password_confirmationRules : [
                    v => !!v || 'Password Confirmation required.',
                    v => (v && v.length >= 6) || 'Min 6 characters',
                ],
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
                setStatusDialog : 'dialog/setStatus',
                setAuth : 'auth/set',
            }),
            close() {
                this.setStatusDialog(false)
            },
            update() {
                if(this.$refs.form.validate()) {
                    let formData = new FormData()
                    formData.set('current_password', this.current_password)
                    formData.set('new_password', this.new_password)
                    formData.set('password_confirmation', this.password_confirmation)

                    let config = {
                        headers : {
                            'Authorization' : 'Bearer ' + this.user.api_token,
                        },
                    }

                    this.axios.post('/update-password', formData, config)
                      .then((response) => {
                          this.setAuth(response.data.data)
                          this.setAlert({
                              status : true,
                              text : response.data.message,
                              type : 'success',
                          })
                          this.close()

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
        }

    }
</script>
