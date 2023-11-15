<template>
    <div class="background-dataclic">
        <div class="gain">
            <p> 150000 </p>
            <img src="../assets/data_button.png" />
            <p> / sec</p>
        </div>

        <div class="data-button" @click="appliquerAnimation" ref="dataButton">
            <img class="data-button-img" src="../assets/data_button.png" />
        </div>

        <div class="currency-dynamic">
            <p>{{ currency }}</p>
            <img src="../assets/data_button.png" />
        </div>

        <div class="navigation-shop" @click="changeElement">
            <p> SHOP </p>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'DataClic',
    props: {
        currency: {
            type: Number,
            required: true,
        }
    },
    methods: {
        appliquerAnimation() {
            this.$refs.dataButton.classList.add('animation-cliquee');

            setTimeout(() => {
                this.$refs.dataButton.classList.remove('animation-cliquee');
            }, 100);
            this.clicData()
        },
        clicData() {
            this.$emit("clicData", 100); // Remplacez 100 par la valeur que vous souhaitez transmettre
        },
        changeElement() {
            this.$emit("changeElement", 2) 
        }

    },
};
</script>

  
<style scoped>
.background-dataclic {
    height: 100vh;
    background-image: url("../assets/Default_Cyberpunk_city_background_for_a_game_1.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.gain {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 80%;
    gap: 8px;
}

.gain p {
    font-size: 1.2em;
    color: white;
    font-weight: bolder;
}

.gain img {
    width: 1.2em;
    height: 1.2em;

}

.data-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 10px 5px 5px black;
}

.data-button img {
    width: 100%;
    height: 100%;
}

.animation-cliquee {
    transform: scale(0.8);
}

.currency-dynamic {
    font-size: 1.2em;
    color: white;
    font-weight: bolder;
    display: flex;
    gap: 8px;
}

.currency-dynamic img {
    width: 1.2em;
    height: 1.2em;

}

.navigation-shop {
    position: absolute;
    bottom: 0;
    border: 3px solid;
    border-bottom-style: none;
    border-color: black;
    font-size: 1.2em;
    color: white;
    font-weight: bolder;
    background-color: #453F3F;
    width: 75%;
    display: flex;
    justify-content: center;
    cursor: pointer;
}
</style>
  