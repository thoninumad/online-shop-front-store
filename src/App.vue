<template>
    <v-app>
        <!-- component header -->
        <c-header />

        <!-- component sidebar -->
        <c-side-bar />

        <!-- konten utama -->
        <v-content>
            <v-slide-y-transition mode="out-in">
                <router-view></router-view>
            </v-slide-y-transition>
        </v-content>

        <!-- component footer -->
        <c-footer />

        <c-alert />

        <keep-alive>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <component :is="currentComponent"></component>
            </v-dialog>
        </keep-alive>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CHeader from '@/components/CHeader.vue'
import CFooter from '@/components/CFooter.vue'
import CSideBar from '@/components/CSideBar.vue'

export default {
    name : 'App',
    components : {
        CHeader,
        CFooter,
        CSideBar,
        CAlert: () => import('@/components/CAlert.vue'),
        Search: () => import('@/views/Search.vue'),
        Login: () => import('@/views/Login.vue'),
        Register: () => import('@/views/Register.vue'),
        Cart: () => import('@/views/Cart.vue'),
        EditProfile: () => import('@/views/EditProfile.vue'),
        ChangePassword: () => import('@/views/ChangePassword.vue')
    },
    methods : {
        ...mapActions({
            setStatusDialog : 'dialog/setStatus',
        }),
    },
    computed : {
        ...mapGetters({
            statusDialog : 'dialog/status',
            currentComponent : 'dialog/component'
        }),
        dialog : {
            get() {
                return this.statusDialog
            },
            set(value) {
                this.setStatusDialog(value)
            }
        },
    },
}
</script>
