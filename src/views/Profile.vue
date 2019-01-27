<template>
    <div class="about">
        <v-container>
            <v-subheader class="title">My Profile</v-subheader>

            <v-avatar :tile="false" :size="180">
                <img v-if="user.avatar" :src="getImage(user.avatar)">
                <img v-if="!user.avatar" :src="getImage('avatars/user-default.png')">
            </v-avatar>

            <v-subheader>Profile ({{user.email}})</v-subheader>

            <v-card flat>
                <table class="v-datatable v-table table-hover">
                    <tbody>
                        <tr style="border-bottom:1px solid #ddd"><th class="text-xs-left">Name</th><td>{{user.name}}</td></tr>
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
