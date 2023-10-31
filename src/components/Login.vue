<template>
    <div class="background-home">
        <img @click="$router.push('/')" class="logo-login" src="../assets/cyber-click-logo.png" alt="Logo">
        <div class="contener-form">
            <h2>Login</h2>
            <form class="form-login" method="post">
                <input class="champs-form" placeholder="Email" type="email" id="email" name="email" required>
                <input class="champs-form" placeholder="Mot de passe" type="password" id="password" name="password" required>
                <input type="submit" value="Login" class="button-login">
            </form>
            <p @click="$router.push('register')" class="show-register"> Register here </p>
        </div>
    </div>
</template>

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

.show-register {
    cursor: pointer;
}
</style>