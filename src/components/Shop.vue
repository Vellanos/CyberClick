<template>
  <div class="background-dataclic">
    <div class="navigation-game" @click="changeElementGame">
      <p> Game </p>
    </div>
    <div class="currency">
      <p>{{ user.currency }}</p>
      <img src="../assets/data_button.png" />
    </div>
    <div class="wrapper-container">
      <div class="shop-wrapper">
        <Bonus v-for="(index, i) in 5" :key="i" :name="bonus.name[i]" :price="bonus.price[i]" :img="bonus.img[i]"
          :number="bonus.number[i]" />
      </div>
      <div class="shop-wrapper">
        <Bonus :name="bonus.name[range]" :price="bonus.price[range]" :img="bonus.img[range]"
          :number="bonus.number[range]" />
        <Stuff v-for="(index, i) in 4" :key="i" :name="stuff.name[i]" :price="stuff.price[i]" :img="stuff.img[i]"
          :statut="stuff.statut[i]" />
      </div>
    </div>

    <div class="navigation-options" @click="changeElementOptions">
      <p> OPTIONS </p>
    </div>
  </div>
</template>
  
<script>
import Bonus from './Bonus.vue';
import Stuff from './Stuff.vue'

export default {
  name: 'Shop',
  components: {
    Bonus,
    Stuff
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    bonus: {
      type: Object,
      required: true,
    },
    stuff: {
      type: Object,
      required: true,
    }
  },
  data() {
        return {
            range: 5
        };
    },
  methods: {

    changeElementGame() {
      this.$emit("changeElement", 1)
    },
    changeElementOptions() {
      this.$emit("changeElement", 3)
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

.currency {
  font-size: 1.2em;
  color: white;
  font-weight: bolder;
  display: flex;
  align-items: center;
  gap: 8px;
  border: solid 2px black;
  background-color: #4A1587;
  padding-left: 1%;
  padding-right: 1%;
}

.currency img {
  width: 1em;
  height: 1em;

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
  