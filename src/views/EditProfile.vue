<template>
    <v-card class="main">
        <v-toolbar dark color="#bd1544">
            <v-btn icon dark @click="close">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Profile</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>

        <v-container fluid>
            <v-form ref="form" lazy-validation enctype="multipart/form-data">
                <v-text-field v-model="name" :counter="100" label="Name" required append-icon="person"></v-text-field>
                <v-text-field v-model="username" disabled label="Username" required append-icon="person_pin"></v-text-field>
                <v-textarea label="Address" v-model="address" :counter="200" required auto-grow rows="3"></v-textarea>
                <v-text-field v-model="phone" :counter="12" label="Phone" required append-icon="phone"></v-text-field>
                <v-select v-model="province_id" :items="provinces" item-text="province" item-value="id" label="Province"
                persistent-hint single-line></v-select>
                <v-select v-model="city_id" v-if="province_id>0" :items="citiesByProvince" item-text="city_name" item-value="id" label="City"
                persistent-hint single-line></v-select>
                <v-text-field v-model="email" disabled label="Email" required append-icon="email"></v-text-field>

                <v-img :src="imageUrl" max-width="300" v-if="imageUrl"></v-img>
                <v-text-field label="Select Image" @click='pickFile' v-model='imageName' append-icon='attach_file'></v-text-field>
                <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">

                <div class="text-xs-center">
                    <v-btn large color="#bd1544" class="white--text" @click="update">
                        simpan
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
        name : 'editProfile',
        data () {
            return {
                name : '',
                username : '',
                email : '',
                address : '',
                phone : '',
                province_id : 0,
                city_id : 0,
                imageName : '',
                imageUrl : '',
                imageFile : ''
            }
        },
        computed : {
            ...mapGetters({
                user : 'auth/user',
                provinces : 'region/provinces',
                cities : 'region/cities',
            }),
            citiesByProvince() {
                let province_id = this.province_id
                return this.cities.filter(function(city) {
                    if(city.province_id == province_id) return city
                })
            },
        },
        methods : {
            ...mapActions({
                setAlert : 'alert/set',
                setStatusDialog : 'dialog/setStatus',
                setAuth : 'auth/set',
                setProvinces : 'region/setProvinces',
                setCities : 'region/setCities',
            }),
            close() {
                this.setStatusDialog(false)
            },
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
            update() {
                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('address', this.address)
                formData.set('phone', this.phone)
                formData.set('province_id', this.province_id)
                formData.set('city_id', this.city_id)
                formData.set('avatar', this.imageFile)

                let config = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.user.api_token,
                    },
                }

                this.axios.post('/update-profile', formData, config)
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
        },
        created() {
            this.name = this.user.name
            this.username = this.user.username
            this.email = this.user.email
            this.address = this.user.address
            this.phone = this.user.phone
            this.city_id = this.user.city_id
            this.province_id = this.user.province_id

            if(this.provinces.length==0) {
                this.axios.get('/provinces')
                .then((response) => {
                    this.setProvinces(response.data.data)
                })

                this.axios.get('/cities')
                .then((response) => {
                    this.setCities(response.data.data)
                })
            }
        }
    }
</script>
