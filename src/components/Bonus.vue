<template>
    <div class="bonus-container">
        <h4>{{ name }}</h4>
        <div class="buy-wrapper">
            <img class="img-shop" :src="getImageUrl(img)" :alt="name">

            <div class="shop-data">
                <p class="bonus-number"> 56 </p>
                <div class="price">
                    <img src="../assets/data_button.png" />
                    <p>{{ price }}</p>
                </div>
                <button class="button-buy"> ACHETER </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Bonus',
    props: {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        gain: {
            type: Number,
            required: true
        },
        img: {
            type: String,
            required: true
        }
    },
    methods: {
        getImageUrl(imageName) {
            // Assurez-vous que le chemin relatif est correct ici pour accéder à vos images
            return `src/assets/${imageName}`;
            src/assets
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