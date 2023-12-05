<template>
    <div class="background-options">
        <div class="navigation-shop" @click="changeElement">
            <p> SHOP </p>
        </div>

        <div class="options-container">
            <div class="options-button" @click="logout">
                <p>
                    Logout
                </p>
            </div>
            <div class="options-button" @click="save">
                <p>
                    Save
                </p>
            </div>
            <div v-if="role == 2" class="options-button" @click="adminNav">
                <p>
                    Admin
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
    name: 'Options',
    props: {
        user: {
            type: Object,
            required: true,
        },
        role: {
            type: Number,
            required: true,
        }
    },
    mounted() {
        setInterval(this.autoSave, 60000);
    },
    methods: {
        changeElement() {
            this.$emit("changeElement", 2)
        },
        logout() {
            this.save()
            localStorage.setItem('token', null);
            localStorage.setItem('email', '');
            this.$router.push('/');
        },
        async save() {
            try {
                const userData = {
                    ...this.user,
                    nbr_currency: this.user.currency,
                };

                const response_save = await axios.put('http://localhost:8000/user/' + this.user.uuid, userData);

                if (response_save.status === 200) {
                    toast.success("Save Sucess", {
                        autoClose: 2000,
                    });
                } else {
                    console.error('Error saving user:', response_save.status);
                    toast.error("Save Error", {
                        autoClose: 2000,
                    });
                }
            } catch (error) {
                console.error('Error user save call :', error);
            }
        },
        async autoSave() {
            try {
                const userData = {
                    ...this.user,
                    nbr_currency: this.user.currency,
                };

                await axios.put('http://localhost:8000/user/' + this.user.uuid, userData);

            } catch (error) {
                console.error('Error user auto-save call :', error);
            }
        },
        async adminNav() {
            try {
                // const response = await axios.post('http://localhost:8000/authAdmin', { Authorization: localStorage.getItem('token') });

            } catch (error) {
                console.error('Error navigation to admin page:', error);
            }
        },


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
    height: 30%;

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
    height: 30%;
    border: solid 2px black;
    border-radius: 20px;
    cursor: pointer;
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