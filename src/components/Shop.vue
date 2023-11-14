<template>
  <div class="background-dataclic">
    <div class="navigation-game">
      <p> Game </p>
    </div>

    <div class="wrapper-container">
      <div class="shop-wrapper">
        <Bonus v-for="(index, i) in 5" :key="i" :name="bonus.name[i]" :price="bonus.price[i]" :img="bonus.img[i]" />
      </div>
      <div class="shop-wrapper">
        <Bonus :name="bonus.name[this.rang_max]" :price="bonus.price[this.rang_max]" :img="bonus.img[this.rang_max]" />
        <Stuff v-for="(index, i) in 4" :key="i" :name="stuff.name[i]" :price="stuff.price[i]" :img="stuff.img[i]" />
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
import Stuff from './Stuff.vue'

export default {
  name: 'Shop',
  components: {
    Bonus,
    Stuff
  },
  data() {
    return {
      bonus: {
        name: [],
        price: [],
        gain: [],
        img: []
      },
      stuff: {
        name: [],
        price: [],
        img: []
      },
      rang_max: null
    };
  },
  mounted() {
    this.getDataBonus();
    this.getDataStuff();
  },
  methods: {
    async getDataBonus() {
      try {
        const response = await axios.get('http://localhost:8000/bonus');
        if (response.status === 200) {
          const data = response.data.data;
          for (let i = 0; i < 6; i++) {
            this.bonus.name.push(data[i].nom);
            this.bonus.price.push(data[i].price);
            this.bonus.gain.push(data[i].gain);
            this.bonus.img.push(data[i].img);

          }
          console.log(this.bonus);
          this.rang_max = this.bonus.name.length - 1
        } else {
          console.error('Erreur lors de la récupération des bonus:', response.status);
        }
      } catch (error) {
        console.error('Error bonus call :', error);
      }
    },
    async getDataStuff() {
      try {
        const response = await axios.get('http://localhost:8000/stuff');
        if (response.status === 200) {
          const data = response.data.data;
          let stuff_max = data.length
          for (let i = 0; i < stuff_max; i++) {
            this.stuff.name.push(data[i].nom);
            this.stuff.price.push(data[i].price_puce);
            this.stuff.img.push(data[i].img);

          }
          console.log(this.stuff);
        } else {
          console.error('Erreur lors de la récupération des stuff:', response.status);
        }
      } catch (error) {
        console.error('Error stuff call :', error);
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
  