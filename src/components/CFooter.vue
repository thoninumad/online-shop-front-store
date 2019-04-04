<template>
    <v-footer dark height="auto" color="f5f5f5">
        <v-flex xs12>
            <v-card flat tile class="black--text text-xs-center" color="#f5f5f5" style="border-top: 1px solid #e4d9d9;">

                <!-- menu icon media sosial -->
                <v-card-text v-if="isHome">
                    <v-btn v-for="social in socials" :key="social" :href="social.url" target="_blank" class="mx-3 black--text" icon>
                        <v-icon size="24px">{{social.logo}}</v-icon>
                    </v-btn>
                </v-card-text>

                <!-- deskripsi aplikasi -->
                <v-card-text v-if="isHome" class="black--text pt-0">
                    Pusat Inovasi dan Pengujian Produk Otomotif <br>
                    Lembaga Bengkel Mahasiswa Mesin  <br>
                    Kampus ITS Sukolilo, Surabaya 60111
                </v-card-text>

                <v-layout justify-center row wrap>
                    <!-- link menu halaman aplikasi -->
                    <v-btn v-for="link in links" :key="link" :href="link.route" :to="{name: link.route}" color="black" flat round>{{link.title}}</v-btn>

                    <!-- teks copyright -->
                    <v-flex secondary darken-2 py-3 text-xs-center white--text xs12>
                        &copy; 2019 - PIPPO LBMM ITS
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>

        <v-btn class="floating-button"
                v-show="!hidden"
                color="#4ec248"
                dark
                absolute
                bottom
                right
                fab
                href="https://api.whatsapp.com/send?phone=6281556757078&text="
              >
                <v-icon>phone</v-icon>
              </v-btn>
    </v-footer>
</template>

<style scoped>
  .floating-button{
      position: fixed;
    bottom: 0;
    right: 0;
    margin:20px;
  }
</style>

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
                {title: 'Tentang Kami', route: 'about'},
                {title: 'Tim Kami', route: 'team'},
                {title: 'Layanan', route: 'services'},
                {title: 'Hubungi Kami', route: 'contact'},
            ]
        }),
        computed : {
            isHome() {
                return (this.$route.path==='/')
            },
        }
    }
</script>
