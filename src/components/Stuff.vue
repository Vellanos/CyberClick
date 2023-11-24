<template>
    <div class="stuff-container">
        <h4>{{ name }}</h4>
        <div class="buy-wrapper">
            <img class="img-shop" :src="getImageUrl(img)" :alt="name">

            <div class="shop-data">
                <p :class="{ 'stuff-statut-red': !statut, 'stuff-statut-green': statut }"></p>
                <div class="price">
                    <img src="../assets/puce.jpg" />
                    <p>{{ price }}</p>
                </div>
                <button class="button-buy" @click="buyBonus"> ACHETER </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Stuff',
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
        statut: {
            type: Boolean,
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
        stuff_id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            statut_data: this.statut
        };
    },
    methods: {
        getImageUrl(imageName) {
            return `src/assets/${imageName}`;
        },
        updateStatut() {
            this.statut_data = this.statut;
        },
        async buyBonus() {
            this.statut_data = true
            try {
                const userData = { statut: this.statut_data };
                const response = await axios.put(`http://localhost:8000/userhasstuff/${this.user_id}/${this.stuff_id}`, userData);
                console.log(response);
                if (response.status === 200) {
                    this.$emit('bonusPurchased');
                }
            } catch (error) {
                console.error('Error update statut stuff:', error);
            }
        }
    },
    watch: {
        statut() {
            this.updateStatut();
        }
    }
};
</script>



<style scoped>
.img-shop {
    width: 4.5em;
    height: 4.5em;
}

.stuff-container {
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

.stuff-statut-red {
    border: solid 1px black;
    border-radius: 50%;
    padding: 15%;
    background-color: red;
}

.stuff-statut-green {
    border: solid 1px black;
    border-radius: 50%;
    padding: 15%;
    background-color: green;
}
</style>