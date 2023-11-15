<template>
    <div class="background-game">
        <!-- <DataClic :currency="currency" v-on:clicData="clicData" /> -->
        <Shop />

    </div>
</template>

<script>
import DataClic from './DataClic.vue';
import Shop from './Shop.vue';
import axios from 'axios';

export default {
    components: {
        DataClic,
        Shop
    },
    data() {
        return {
            currency: null
        };
    },
    mounted() {
        this.getDataUserCurrency();
        this.startIncrementLoop();
    },
    watch: {
        // Exemple 2: Observer la propriété 'currency'
        currency(newValue, oldValue) {
            console.log(`La propriété 'currency' a changé. Nouvelle valeur : ${newValue}, Ancienne valeur : ${oldValue}`);
        }
    },
    methods: {
        async getDataUserCurrency() {
            let user_email = localStorage.getItem("email")
            try {
                const response_user = await axios.get('http://localhost:8000/user/' + user_email);
                if (response_user.status === 200) {
                    const data_user = response_user.data.data;
                    this.currency = data_user.nbr_currency
                } else {
                    console.error('Erreur lors de la récupération des infos du user:', response_user.status);
                }
            } catch (error) {
                console.error('Error user call :', error);
            }

        },
        startIncrementLoop() {
            // Démarre une boucle toutes les 1000 millisecondes (1 seconde)
            this.incrementLoop = setInterval(() => {
                this.incrementScore();
            }, 1000);
        },

        incrementScore() {
            // Incrémente le score à chaque appel
            let gain_test = 10
            this.currency = parseInt(this.currency) + parseInt(gain_test)
        },

        clicData(gain) {
            // Incrémente la devise avec la valeur passée en paramètre
            this.currency = parseInt(this.currency) + parseInt(gain);
        },

    },
}

</script>

<style>
.background-game {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>