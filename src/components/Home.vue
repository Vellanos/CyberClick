<template>
    <div class="background-home">
        <div class="logo">
            <img src="../assets/cyber-click-logo.png" alt="Logo" />
        </div>
        <div class="accueil-presentation">
            <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa autem nostrum dolores nulla laudantium eos reiciendis exercitationem, voluptas dolore? Quibusdam a ea modi hic eaque. Cumque ab reprehenderit harum delectus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam nobis optio unde earum dolorum quasi facere nemo repellendus corporis officia in iusto hic, at accusantium laudantium reprehenderit iure expedita soluta.</p>
        </div>
        
        <div>
            <button type="button" class="button-start" @click="$router.push('login')"> Commencer </button>
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

.accueil-presentation {
    width: 60%;
    color: white;
    background-color: rgba(41, 41, 41, 0.5);
    text-align: center;
    padding: 2%;
    border-radius: 30px;
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
.button-start {
    width: 220px;
    height: 56.8px;
    padding: 10px 20px;
    background-color: #511c52;
    cursor: pointer;
    border: solid 2px;
    border-color: black;
    border-radius: 20px;
    color: white;
}
</style>