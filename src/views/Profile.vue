<template>
    <div class="about main">
        <v-container>
            <v-layout fill-height justify-center>
                <v-subheader style="font-size:35px;">My Profile</v-subheader>
            </v-layout>
            
            <v-layout fill-height justify-center style="margin-top:30px;">
                <v-avatar :tile="false" :size="180">
                    <img v-if="user.avatar" :src="getImage(user.avatar)">
                    <img v-if="!user.avatar" :src="getImage('avatars/user-default.png')">
                </v-avatar>
            </v-layout>

            <v-layout fill-height justify-center style="margin:20px 0px;">
                <p style="font-size:17px;">{{user.name}}</p>
            </v-layout>

            <v-card flat>
                <table class="v-datatable v-table table-hover">
                    <tbody>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Email</th><td>{{user.email}}</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Username</th><td>{{user.username}}</td></tr>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Address</th><td>{{user.address}}</td></tr>
                        <tr><th class="text-xs-left">Phone</th><td>{{user.phone}}</td></tr>
                    </tbody>
                </table>
            </v-card>

            <v-subheader></v-subheader>

            <div class="text-xs-left">
                <v-btn color="primary" @click="editProfile()">
                    Edit Profile <v-icon right dark>edit</v-icon>
                </v-btn>
                <v-btn color="warning" @click="changePassword()">
                    Change Password <v-icon right dark>vpn_key</v-icon>
                </v-btn>
            </div>
        </v-container>
    </div>
</template>

<style lang="css">
  @import '/css/main.css';
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        computed : {
            ...mapGetters({
                sideBar : 'sideBar',
                user : 'auth/user'
            }),
        },
        methods : {
            ...mapActions({
                setAlert : 'alert/set',
                setSideBar : 'setSideBar',
                setStatusDialog : 'dialog/setStatus',
                setComponent : 'dialog/setComponent',
            }),
            editProfile() {
                this.setStatusDialog(true)
                this.setComponent('editProfile')
                this.setSideBar(false)
            },
            changePassword() {
                this.setStatusDialog(true)
                this.setComponent('changePassword')
                this.setSideBar(false)
            },
        }
    }
</script>
