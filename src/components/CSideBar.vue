<template>
    <v-navigation-drawer v-model="drawer" fixed clipped>
        <!-- header toolbar pada sidebar supaya lebih cantik -->
        <v-toolbar color="#fff">
            <v-btn icon @click="drawer=false">
                <v-icon color="#000">close</v-icon>
            </v-btn>

            <v-toolbar-title class="black--text">STP OTOMOTIF ITS</v-toolbar-title>

        </v-toolbar>

        <v-list v-if="guest">
            <v-list-tile>
                <!-- tombol register -->
                <v-btn @click="register()" depressed block round color="#e4d9d9" class="black--text">
                    Register <v-icon right dark>person_add</v-icon>
                </v-btn>
            </v-list-tile>
            <v-list-tile>
                <!-- tombol login -->
                <v-btn @click="login()" block round depressed color="#bd1544" class="white--text">
                    Login <v-icon right dark>lock_open</v-icon>
                </v-btn>
            </v-list-tile>
        </v-list>

        <v-list v-if="!guest">
            <v-list-tile>
                <v-list-tile-avatar>
                    <img v-if="user.avatar" :src="getImage(user.avatar)">
                    <img v-if="!user.avatar" :src="getImage('avatars/user-default.png')">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{user.username}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
                <v-btn block round depressed color="#bd1544" class="white--text" @click.stop="logout();">
                    Logout <v-icon small right dark>settings_power</v-icon>
                </v-btn>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <!-- menu navigasi pada properti data items -->
            <!-- eslint-disable-next-line -->
            <v-list-tile v-for="(item, index) in items" :key="index" :href="item.route" :to="{name: item.route}">
                <v-list-tile-action>
                    <v-icon color="#a29999">{{item.icon}}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{item.title}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
// import map getter dan map action dari vuex
import { mapGetters, mapActions } from 'vuex'
export default {
    name : 'c-side-bar',
    data : () => ({
        //variabel berisi daftar menu navigasi aplikasi
        items :[
            {title: 'Home', icon: 'dashboard', route: 'home'},
            {title: 'Profil', icon: 'person', route: 'profile', auth: true},
            {title: 'Order Saya', icon: 'shop_two', route: 'my-order', auth: true},
            {title: 'Tentang Kami', icon: 'question_answer', route: 'about'},
        ]
    }),
    computed : {
        // mapping state sideBar menggunakan map getter
        ...mapGetters({
            sideBar : 'sideBar',
            user : 'auth/user',
            guest : 'auth/guest',
        }),
        // ubah properti data drawer menjadi computed dimana nilainya membaca dari state sideBar
        drawer :{
            get() {
                return this.sideBar
            },
            set(value) {
                this.setSideBar(value)
            }
        },
    },
    methods : {
        // mapping action setSideBar pada store menggunakan map action
        ...mapActions({
            setSideBar : 'setSideBar',
            setStatusDialog : 'dialog/setStatus',
            setComponent : 'dialog/setComponent',
            setAuth : 'auth/set',
            setAlert :'alert/set',
        }),
        login() {
            this.setStatusDialog(true)
            this.setComponent('login')
            this.setSideBar(false)
        },
        register() {
            this.setStatusDialog(true)
            this.setComponent('register')
            this.setSideBar(false)
        },
        logout() {
            let config = {
                headers : {
                    'Authorization' : 'Bearer ' + this.user.api_token,
                },
            }
            this.axios.post('/logout', {}, config)
              .then(() => {
                  this.setAuth({})
                  this.setAlert({
                      status : true,
                      text : 'Logout successfully',
                      type : 'success',
                  })
                  this.setSideBar(false)
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
}
</script>
