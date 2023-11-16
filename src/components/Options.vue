<template>
    <div class="background-options">
        <div class="navigation-shop" @click="changeElement">
            <p> SHOP </p>
        </div>

        <div class="options-container">
            <div class="options-button" @click="loggout">
                <p>
                    Déconnexion
                </p>
            </div>
            <div class="options-button">
                <p>
                    Sauvegarde
                </p>
            </div>
            <div class="options-button">
                <p>
                    TEST
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Options',
    methods: {
        changeElement() {
            this.$emit("changeElement", 2)
        },
        loggout() {
            localStorage.setItem('token', null);
            localStorage.setItem('email', '');
            this.$router.push('/');
        }

    },
};
</script>

<style scoped>
.background-options {
    height: 100vh;
    background-image: url("../assets/DreamShaper_v5_A_game_background_arcade_gaming_shop_cyberpunk_3.jpg");
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

.options-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60%;

}

.options-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #511c52;
    color: white;
    font-size: 1em;
    font-weight: bolder;
    width: 50%;
    height: 20%;
    border: solid 2px black;
    border-radius: 20px;
}

.navigation-shop {
    position: absolute;
    top: 0;
    border: 3px solid;
    border-top-style: none;
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