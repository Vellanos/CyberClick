<template>
    <div class="background-home">
        <div class="logo" v-show="showElement === 1">
            <img src="../assets/cyber-click-logo.png" alt="Logo-game" />
        </div>

        <div class="wrapper-button" v-show="showElement === 1">
            <button type="button" class="button-start" @click="isLogged"> Play </button>
            <button type="button" class="button-presentation" @click="incrementeElement"> Rules </button>
        </div>

        <div class="logo-rules" v-show="showElement === 2">
            <img src="../assets/regles.png" alt="Logo-rules" />
        </div>

        <div class="wrapper-rules" v-show="showElement === 2">
            <h1>Game Rules :</h1>
            <ul>
                <li>Earn Data by clicking on the Data button</li>
                <li>Buy bonuses with your Data to earn Data passively</li>
                <li>Purchase equipment to increase your Data multiplier</li>
                <li>A bonus can be bought 50 times</li>
                <li>Equipment can be bought only once</li>
            </ul>
        </div>

        <div class="wrapper-button" v-show="showElement === 2">
            <button type="button" class="button-start" @click="isLogged"> Play </button>
            <button type="button" class="button-presentation" @click="incrementeElement"> Learn more </button>
        </div>

        <div class="logo-rules" v-show="showElement === 3">
            <img src="../assets/gestion-de-projet.png" alt="Logo-rules" />
        </div>

        <div class="wrapper-presentation" v-show="showElement === 3">
            <h2>Project Context</h2>
            <p>
                This project was carried out as part of the DWWM (Web and Mobile Web Development) training at Simplon
                Chambéry. It is the final project presented to the jury to validate the achievement of the title. The main
                idea
                is to propose a simple game that could serve as the basis for a more ambitious project in the future.
            </p>

            <h3>Contact</h3>
            <p>
                My profile <a class="linkedin" href="https://www.linkedin.com/in/david-bakalarz/">LinkedIn</a>
            </p>
        </div>

        <div class="wrapper-button" v-show="showElement === 3">
            <button type="button" class="button-start" @click="isLogged"> Play </button>
            <button type="button" class="button-presentation" @click="decrementElement"> Rules </button>
        </div>


    </div>
</template>

<script>
import axios from "axios";
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
        },
        async isLogged() {
            if (localStorage.getItem('token')) {
                try {
                    const response = await axios.post('http://localhost:8000/authenticate', { Authorization: localStorage.getItem('token') });

                    if (response.status === 200) {
                        this.$router.push('/game');
                    } else {
                        this.$router.push('/login');
                    }
                } catch (error) {
                    console.error('Error login :', error);
                    localStorage.setItem('token', null);
                    localStorage.setItem('email', '');
                    this.$router.push('/login');
                }
            } else {
                this.$router.push('/login');
            }
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
}
</style>