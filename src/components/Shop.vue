<template>
    <div class="background-dataclic">
      <div class="navigation-game">
        <p> Game </p>
      </div>
  
      <div class="wrapper-container">
        <div class="shop-wrapper">
          <Bonus v-for="(index, i) in 5" :key="i"
                 :name="bonus.name[i]" :price="bonus.price[i]"
                 :img="bonus.img[i]" />
        </div>
        <div class="shop-wrapper">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
  
      <div class="navigation-options">
        <p> OPTIONS </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Bonus from './Bonus.vue';
  
  export default {
    name: 'Shop',
    components: {
      Bonus
    },
    data() {
      return {
        bonus: {
          name: [],
          price: [],
          gain: [],
          img: []
        },
      };
    },
    mounted() {
      this.getDataBonus();
    },
    methods: {
      async getDataBonus() {
        try {
          const response = await axios.get('http://localhost:8000/bonus');
          if (response.status === 200) {
            const data = response.data.data;
            for (let i = 0; i < 5; i++) {
              this.bonus.name.push(data[i].nom);
              this.bonus.price.push(data[i].price);
              this.bonus.gain.push(data[i].gain);
              this.bonus.img.push(data[i].img);
            }
            console.log(this.bonus);
          } else {
            console.error('Erreur lors de la récupération des bonus:', response.status);
          }
        } catch (error) {
          console.error('Error bonus call :', error);
        }
      }
    },
  };
  </script>

  
<style scoped>
.background-dataclic {
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

.wrapper-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    gap: 5%;

}

.shop-wrapper {
    width: 100%;
    height: 75vh;
    background-color: #a583cf70;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 20px;
    margin: 0% 3%;
    padding: 2% 0%;
}



.navigation-game {
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

.navigation-options {
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
  