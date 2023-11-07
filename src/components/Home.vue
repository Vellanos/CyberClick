<template>
    <div class="background-home">
        <div class="logo" v-show="showElement === 1">
            <img src="../assets/cyber-click-logo.png" alt="Logo" />
        </div>

        <div class="wrapper-button" v-show="showElement === 1">
            <button type="button" class="button-start" @click="$router.push('login')"> Jouer </button>
            <button type="button" class="button-presentation" @click="incrementeElement"> Règles </button>
        </div>

        <div class="logo-rules" v-show="showElement === 2">
            <img src="../assets/regles.png" alt="Logo" />
        </div>

        <div class="wrapper-rules" v-show="showElement === 2">
            <h1>Règles du jeu :</h1>
            <ul>
                <li>Gagner de la Data en cliquant sur le Data-bouton</li>
                <li>Acheter des bonus avec vos Data pour gagner de la Data passivement</li>
                <li>Acheter de l'équipement pour augmenter votre multiplicateur de Data</li>
                <li>Un bonus peut être acheté 50 fois</li>
                <li>Un équipement peut être acheté qu'une fois</li>
                <li>Les puces peuvent être achetées 100 fois</li>
            </ul>
        </div>

        <div class="wrapper-button" v-show="showElement === 2">
            <button type="button" class="button-start" @click="$router.push('login')"> Jouer </button>
            <button type="button" class="button-presentation" @click="incrementeElement"> En savoir plus </button>
        </div>

        <div class="logo-rules" v-show="showElement === 3">
            <img src="../assets/gestion-de-projet.png" alt="Logo" />
        </div>

        <div class="wrapper-presentation" v-show="showElement === 3">
            <h2>Contexte du Projet</h2>
            <p>
                Ce projet a été réalisé dans le cadre de la formation DWWM (Dévellopement Web et Web Mobile) de Simplon Chambéry. Il s'agît du projet de fin de formation présenter au jury pour valider le passage du titre. L'idée principale est de proposé un jeu simple qui pourrait être un base d'un projet plus ambitieux à l'avenir. 
            </p>

            <h3>Contact</h3>
            <p>
                Mon profil <a class="linkedin" href="https://www.linkedin.com/in/david-bakalarz/"> Linkedin </a>
            </p>
        </div>

        <div class="wrapper-button" v-show="showElement === 3">
            <button type="button" class="button-start" @click="$router.push('login')"> Jouer </button>
            <button type="button" class="button-presentation" @click="decrementElement"> Règles </button>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            showElement: 1
        };
    },
    methods: {
        incrementeElement() {
            this.showElement = this.showElement + 1
        },
        decrementElement() {
            this.showElement = this.showElement - 1
        }
    }
};
</script>

<style>
.background-home {
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
}

.logo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: solid 2px;
    border-color: black;
    overflow: hidden;
}

.logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;

}

.logo-rules {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: solid 2px;
    border-color: black;
    overflow: hidden;
    background-color: rgb(96, 43, 117);
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-rules img {
    width: 70%;
    height: 70%;
    object-fit: contain;
}

.wrapper-rules {
    width: 80%;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 4%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
}

.wrapper-presentation {
    width: 80%;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 4%;
    border-radius: 20px;
    text-align: justify;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
}

.wrapper-rules h1 {    
    font-size: 2.5em;
    text-align: center;
}

.wrapper-presentation h2 {
    font-size: 2.5em;
    text-align: center;
}

.wrapper-presentation h3 {
    font-size: 1.5em;
    text-align: center;
}

.wrapper-rules ul {
    font-size: 1em;
}

.wrapper-button {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.linkedin {
    cursor: pointer;
    font-weight: bolder;
    text-decoration: none;
    color: black;
    font-size: 1.2em;
}

.button-start {
    width: 150px;
    height: 56.8px;
    padding: 10px 20px;
    background-color: #511c52;
    cursor: pointer;
    border: solid 2px;
    border-color: black;
    border-radius: 20px;
    color: white;
    font-weight: bolder;
}

.button-presentation {
    width: 150px;
    height: 56.8px;
    padding: 10px 20px;
    background-color: #3a26aa;
    cursor: pointer;
    border: solid 2px;
    border-color: black;
    border-radius: 20px;
    color: white;
    font-weight: bolder;
}</style>