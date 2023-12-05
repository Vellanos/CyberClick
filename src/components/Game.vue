<template>
    <div class="background-game">
        <DataClic :currency="user.currency" :gain_passif="gain_passif" v-on:changeElement="changeElement"
            v-on:clicData="clicData" v-show="showElement === 1" />
        <Shop :currency="user.currency" :user="user" :bonus="bonus" :stuff="stuff" v-on:changeElement="changeElement"
            v-show="showElement === 2" @bonusPurchased="handleBonusPurchase" />
        <Options :user="user" :role="user.role" v-on:changeElement="changeElement" v-show="showElement === 3" />
    </div>
</template>

<script>
import DataClic from './DataClic.vue';
import Shop from './Shop.vue';
import axios from 'axios';
import Options from './Options.vue';

export default {
    components: {
        DataClic,
        Shop,
        Options
    },
    data() {
        return {
            user: {
                uuid: '',
                currency: null,
                role: null
            },
            bonus: {
                id: [],
                name: [],
                price: [],
                gain: [],
                img: [],
                number: []
            },
            stuff: {
                id: [],
                name: [],
                price: [],
                img: [],
                statut: []
            },
            showElement: 1,
            gain_passif: 0,
            multiplicateur: 1
        };
    },
    async mounted() {
        this.getDataUser();
        this.startIncrementLoop();
    },
    methods: {
        async getDataUser() {
            let user_email = localStorage.getItem("email")
            let token = localStorage.getItem("token")

            if (token) {
                try {
                    const response = await axios.post('http://localhost:8000/authenticate', { Authorization: localStorage.getItem('token') });

                    if (response.status === 200) {
                        if (user_email) {
                            try { //call user
                                const response_user = await axios.get('http://localhost:8000/user/' + user_email);
                                if (response_user.status === 200) {
                                    const data_user = response_user.data.data;
                                    this.user.currency = data_user.nbr_currency
                                    this.user.uuid = data_user.id
                                    this.user.role = data_user.role
                                } else {
                                    console.error('Error retrieving user information:', response_user.status);
                                }
                            } catch (error) {
                                console.error('Error user call :', error);
                            }

                            try { // call bonus
                                const response_bonus = await axios.get('http://localhost:8000/bonus');
                                if (response_bonus.status === 200) {
                                    const data_bonus = response_bonus.data.data;
                                    this.bonus_max = data_bonus.length
                                    for (let i = 0; i < this.bonus_max; i++) {
                                        this.bonus.id.push(i + 1);
                                        this.bonus.name.push(data_bonus[i].nom);
                                        this.bonus.price.push(data_bonus[i].price);
                                        this.bonus.gain.push(data_bonus[i].gain);
                                        this.bonus.img.push(data_bonus[i].img);
                                    }

                                } else {
                                    console.error('Error collecting bonuses:', response_bonus.status);
                                }
                            } catch (error) {
                                console.error('Error bonus call :', error);
                            }

                            try { //call stuff
                                const response_stuff = await axios.get('http://localhost:8000/stuff');
                                if (response_stuff.status === 200) {
                                    const data_stuff = response_stuff.data.data;
                                    let stuff_max = data_stuff.length
                                    for (let i = 0; i < stuff_max; i++) {
                                        this.stuff.id.push(i + 1)
                                        this.stuff.name.push(data_stuff[i].nom);
                                        this.stuff.price.push(data_stuff[i].price_puce);
                                        this.stuff.img.push(data_stuff[i].img);

                                    }
                                } else {
                                    console.error('Error while retrieving stuff:', response_stuff.status);
                                }
                            } catch (error) {
                                console.error('Error stuff call :', error);
                            }

                            try {//call userhasbonus
                                const response_user_bonus = await axios.get('http://localhost:8000/userhasbonus/' + this.user.uuid);
                                if (response_user_bonus.status === 200) {
                                    const data_user_bonus = response_user_bonus.data.data;
                                    let user_bonus_max = data_user_bonus.length
                                    for (let i = 0; i < user_bonus_max; i++) {
                                        this.bonus.number.push(data_user_bonus[i].number)
                                    }
                                } else {
                                    console.error('Error while retrieving user bonuses:', response_user_bonus.status);
                                }
                            } catch (error) {
                                console.error('Error userhasbonus call :', error);
                            }

                            try {//call userhasstuff
                                const response_user_stuff = await axios.get('http://localhost:8000/userhasstuff/' + this.user.uuid);
                                if (response_user_stuff.status === 200) {
                                    const data_user_stuff = response_user_stuff.data.data;
                                    let user_stuff_max = data_user_stuff.length
                                    for (let i = 0; i < user_stuff_max; i++) {
                                        this.stuff.statut.push(data_user_stuff[i].statut)
                                    }
                                } else {
                                    console.error('Error retrieving user stuff:', response_user_stuff.status);
                                }
                            } catch (error) {
                                console.error('Error userhasbonus call :', error);
                            }

                            this.calculGain()
                        } else {
                            this.$router.push('/login')
                        }
                    }
                } catch (error) {
                    console.error('Error : user not logged in', error);
                    localStorage.setItem('token', null);
                    localStorage.setItem('email', '');
                    this.$router.push('/login');
                }
            }



        },
        startIncrementLoop() {
            this.incrementLoop = setInterval(() => {
                this.incrementScore();
            }, 1000);
        },
        incrementScore() {
            this.user.currency = parseInt(this.user.currency) + parseInt(this.gain_passif)
        },
        clicData(gain) {
            if (gain < 1) {
                gain = 1
            }
            this.user.currency = parseInt(this.user.currency) + parseInt(gain);
        },
        changeElement(element) {
            this.showElement = element
        },
        async calculGain() {
            this.gain_passif = 0
            this.multiplicateur = 1
            let user_email = localStorage.getItem("email")
            const response_user = await axios.get('http://localhost:8000/user/' + user_email);
            if (response_user.status === 200) {
                const data_user = response_user.data.data;
                this.user.currency = data_user.nbr_currency
                this.user.uuid = data_user.id
            }
            const response_user_bonus = await axios.get('http://localhost:8000/userhasbonus/' + this.user.uuid);
            if (response_user_bonus.status === 200) {
                this.bonus.number = []
                const data_user_bonus = response_user_bonus.data.data;
                let user_bonus_max = data_user_bonus.length
                for (let i = 0; i < user_bonus_max; i++) {
                    this.bonus.number.push(data_user_bonus[i].number)
                }
            }
            const response_user_stuff = await axios.get('http://localhost:8000/userhasstuff/' + this.user.uuid);
            if (response_user_stuff.status === 200) {
                this.stuff.statut = []
                const data_user_stuff = response_user_stuff.data.data;
                let user_stuff_max = data_user_stuff.length
                for (let i = 0; i < user_stuff_max; i++) {
                    this.stuff.statut.push(data_user_stuff[i].statut)
                }
            }
            for (let i = 0; i < this.stuff.statut.length; i++) {
                if (this.stuff.statut[i] === true) {
                    this.multiplicateur = parseInt(this.multiplicateur) + 1
                }
            }
            for (let i = 0; i < this.bonus.name.length; i++) {
                this.gain_passif = (parseInt(this.gain_passif) + (parseInt(this.bonus.gain[i]) * parseInt(this.bonus.number[i])) * parseInt(this.multiplicateur))
            }
        },
        handleBonusPurchase() {
            this.calculGain();
        }

    },
    watch: {
        gain_passif() {
        }
    }
}

</script>

<style>
.background-game {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>
