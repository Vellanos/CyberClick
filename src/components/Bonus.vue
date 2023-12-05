<template>
    <div class="bonus-container">
        <h4>{{ name }}</h4>
        <div class="buy-wrapper">
            <img class="img-shop" :src="getImageUrl(img)" :alt="name">

            <div class="shop-data">
                <p class="bonus-number"> {{ nombre }} </p>

                <div class="price" v-if="nombre < 50">
                    
                    <img src="../assets/data_button.png" />
                    <p>{{ formatNumber(calculPrice(price, nombre)) }}</p>
                </div>
                <button class="button-buy" @click="buyBonus" :disabled="nombre === 50">
                    {{ nombre === 50 ? 'COMPLETE' : 'BUY' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import numeral from 'numeral';
import axios from 'axios';
export default {
    name: 'Bonus',
    props: {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        currency: {
            type: Number,
            required: true,
        },
        user_id: {
            type: String,
            required: true
        },
        bonus_id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            nombre: this.number,
            monnaie: this.currency,
            prix: this.price
        };
    },
    methods: {
        getImageUrl(imageName) {
            return `src/assets/${imageName}`;
        },
        calculPrice(price, number) {
            let final_price = price * 1.40 ** number
            final_price = Math.round(final_price / 5) * 5;

            return parseInt(final_price);
        },
        formatNumber(number) {
            return numeral(number).format('0,0');
        },
        updateNombre() {
            this.nombre = this.number;
            this.monnaie = this.currency
            this.prix = this.calculPrice(this.price, this.nombre)
        },
        async buyBonus() {
            if (parseInt(this.monnaie) >= parseInt(this.prix)) {


                this.nombre = parseInt(this.nombre) + 1;
                this.monnaie = parseInt(this.monnaie) - parseInt(this.prix)
                this.prix = this.calculPrice(this.price, this.nombre)
                try {
                    const userData_bonus = { number: this.nombre };
                    const response_bonus = await axios.put(`http://localhost:8000/userhasbonus/${this.user_id}/${this.bonus_id}`, userData_bonus);

                    if (response_bonus.status === 200) {
                        try {
                            const userData_user = { nbr_currency: this.monnaie };
                            const response_user = await axios.put(`http://localhost:8000/user/${this.user_id}`, userData_user);

                            if (response_user.status === 200) {
                                this.$emit('bonusPurchased');
                            }
                        } catch (error) {
                            console.error('Error update bonus:', error);
                        }
                    }
                } catch (error) {
                    console.error('Error update number bonus:', error);
                }

            }

        }
    },
    watch: {
        number() {
            this.updateNombre();
        },
        currency() {
            this.updateNombre();
        },
        price() {
            this.updateNombre();
        }
    }
};
</script>



<style scoped>
.img-shop {
    width: 4.5em;
    height: 4.5em;
}

.bonus-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.buy-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: space-between;
    gap: 10px;
}

.shop-data {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.button-buy {
    width: 100%;
    background-color: #511c52;
    cursor: pointer;
    border: solid 2px;
    border-color: black;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    font-size: 10px;
}

.price {
    width: 100%;
    font-weight: bold;
    color: white;
    font-size: 0.6em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3px;
}

.price img {
    width: 1em;
    height: 1em;
}

.bonus-number {
    border: solid 1px black;
    border-radius: 50%;
    padding: 5%;
    color: white;
    font-weight: bold;
    font-size: 10px;
    background-color: #4A1587;
}
</style>