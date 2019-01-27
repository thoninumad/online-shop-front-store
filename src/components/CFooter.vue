<template>
    <v-footer dark height="auto">
        <v-flex xs12>
            <v-card flat tile class="secondary darken-1 white--text text-xs-center">

                <!-- menu icon media sosial -->
                <v-card-text v-if="isHome">
                    <v-btn v-for="social in socials" :key="social" :href="social.url" target="_blank" class="mx-3 white--text" icon>
                        <v-icon size="24px">{{social.logo}}</v-icon>
                    </v-btn>
                </v-card-text>

                <!-- deskripsi aplikasi -->
                <v-card-text v-if="isHome" class="white--text pt-0">
                    Pusat Inovasi dan Pengujian Produk Otomotif <br>
                    Lembaga Bengkel Mahasiswa Mesin  <br>
                    Kampus ITS Sukolilo, Surabaya 60111
                </v-card-text>

                <v-layout justify-center row wrap>
                    <!-- link menu halaman aplikasi -->
                    <v-btn v-for="link in links" :key="link" :href="link.route" :to="{name: link.route}" color="white" flat round>{{link.title}}</v-btn>

                    <!-- teks copyright -->
                    <v-flex secondary darken-2 py-3 text-xs-center white--text xs12>
                        &copy; 2019 - PIPPO LBMM ITS
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-footer>
</template>

<script>
    export default {
        data : () => ({
            //variael icon sosial media yang ingin ditampilkan
            socials : [
                {logo: 'fab fa-facebook', url: 'https://www.facebook.com/lbmmits/'},
                {logo: 'fab fa-twitter', url: 'https://twitter.com/its_lbmm'},
                {logo: 'fab fa-youtube', url: 'https://www.youtube.com/channel/UCeUe9wOBCmpJXy_mhzDY5og'},
                {logo: 'fab fa-instagram', url: 'https://www.instagram.com/lbmmits/?hl=id'},
            ],
            //variabel link halaman yang ingin ditampilkan
            links : [
                {title: 'Home', route: 'home'},
                {title: 'About Us', route: 'about'},
                {title: 'Team', route: 'team'},
                {title: 'Services', route: 'services'},
                {title: 'Contact Us', route: 'contact'},
            ]
        }),
        computed : {
            isHome() {
                return (this.$route.path==='/')
            },
        }
    }
</script>
