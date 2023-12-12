<template>
    <div class="background-home">
        <img @click="$router.push('/')" class="logo-login" src="../assets/cyber-click-logo.png" alt="Logo-jeu">
        <div class="contener-form">
            <h2>Sign up</h2>
            <form class="form-login" @submit.prevent="handleSubmit">
                <input class="champs-form" placeholder="Email" type="email" id="email" name="email"
                    v-model="formRegister.email" required>
                <span v-if="error && error.includes('Email already registered')" class="error-message">{{ error }}</span>
                <span v-if="!validEmail" class="error-message">Invalid email format</span>
                <input class="champs-form" placeholder="Password" type="password" id="password" name="password"
                    v-model="formRegister.password" required>
                <input class="champs-form" placeholder="Confirm password" type="password" id="check_password"
                    name="check_password" v-model="checkMdp.check_password" required>
                <p v-if="passwordMismatchError" class="error-message">{{ passwordMismatchError }}</p>
                <input type="submit" value="Sign up" class="button-login">
            </form>

            <p @click="$router.push('login')" class="show-register">Back to login </p>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            formRegister: {
                email: '',
                password: '',
                nbr_currency: 0
            },
            checkMdp: {
                check_password: ''
            },
            login: {
                email: '',
                password: ''
            },
            passwordMismatchError: '',
            error: '',
            validEmail: true,
        };
    },

    methods: {
        handleSubmit() {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            this.validEmail = emailRegex.test(this.formRegister.email);
            if (this.formRegister.password === this.checkMdp.check_password && this.validEmail === true) {
                this.passwordMismatchError = ''
                this.Register();
            } else if (!this.validEmail){
                this.error = "Invalid email format"
                this.passwordMismatchError = '';
            } else {
                this.error = ""
                this.passwordMismatchError = "passwords do not match";
            }
        },
        async Register() {
            try {
                this.error = ''
                const response = await axios.post('http://localhost:8000/user', this.formRegister);
                if (response.status === 200) {
                    console.log('User created successfully:', response.data);
                    this.Login();
                } else {
                    console.error('Error creating user:', response.status);
                }

            } catch (error) {
                this.error = error.response.data.error
                console.error('Error registering :', error);
            }
        },
        async Login() {
            this.login.email = this.formRegister.email
            this.login.password = this.formRegister.password
            try {
                const response_login = await axios.post('http://localhost:8000/login', this.login);

                if (response_login.status === 200) {
                    localStorage.setItem('token', response_login.data.token);
                    localStorage.setItem('email', this.login.email);
                    this.$router.push('/game');
                } else {
                    console.error('Error while connecting:', response_login.status);
                }

            } catch (error) {
                console.error('Error login :', error);
            }
        }
    }
}
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
    gap: 10px;
}

.logo-login {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
}

.contener-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 192px;
    height: 340.8px;
    background-color: #B4B4B4;
    padding: 5%;
    gap: 20px;
    border-radius: 30px;
    font-weight: bolder;
}

.form-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.champs-form {
    width: 160px;
    height: 28.4px;
    background-color: #453F3F;
    border: solid 2px;
    border-color: black;
    border-radius: 20px;
    color: white;
    text-align: center;
    font-weight: bolder;

}

.champs-form::placeholder {
    color: white;
    font-weight: bolder;
}

.button-login {
    width: 160px;
    height: 28.4px;
    background-color: #511c52;
    cursor: pointer;
    border: solid 2px;
    border-color: black;
    border-radius: 20px;
    color: white;
    font-weight: bolder;
}

.error-message {
    color: red;
}

.show-register {
    cursor: pointer;
}
</style>