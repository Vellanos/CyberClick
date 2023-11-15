<template>
  <div class="background-dataclic">
    <div class="navigation-game" @click="changeElementGame">
      <p> Game </p>
    </div>
    <div class="currency">
      <p>{{ currency }}</p>
      <img src="../assets/data_button.png" />
    </div>
    <div class="wrapper-container">
      <div class="shop-wrapper">
        <Bonus v-for="(index, i) in 5" :key="i" :name="bonus.name[i]" :price="bonus.price[i]" :img="bonus.img[i]"
          :number="bonus.number[i]" />
      </div>
      <div class="shop-wrapper">
        <Bonus :name="bonus.name[this.rang_max]" :price="bonus.price[this.rang_max]" :img="bonus.img[this.rang_max]"
          :number="bonus.number[this.rang_max]" />
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
import axios from 'axios';
import Bonus from './Bonus.vue';
import Stuff from './Stuff.vue'

export default {
  name: 'Shop',
  components: {
    Bonus,
    Stuff
  },
  props: {
    currency: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      user: {
        uuid: ''
      },
      bonus: {
        id: [],
        name: [],
        price: [],
        gain: [],
        img: [],
        number: []
      },
      stuff: {
        id: [],
        name: [],
        price: [],
        img: [],
        statut: []
      },
      rang_max: null
    };
  },
  mounted() {
    this.getDataBonus();
    this.getDataStuff();
    this.getDataUser();
  },
  methods: {
    async getDataBonus() {
      try {
        const response = await axios.get('http://localhost:8000/bonus');
        if (response.status === 200) {
          const data = response.data.data;
          let bonus_max = data.length
          for (let i = 0; i < bonus_max; i++) {
            this.bonus.id.push(i + 1)
            this.bonus.name.push(data[i].nom);
            this.bonus.price.push(data[i].price);
            this.bonus.gain.push(data[i].gain);
            this.bonus.img.push(data[i].img);

          }
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
            this.stuff.id.push(i + 1)
            this.stuff.name.push(data[i].nom);
            this.stuff.price.push(data[i].price_puce);
            this.stuff.img.push(data[i].img);

          }
        } else {
          console.error('Erreur lors de la récupération des stuff:', response.status);
        }
      } catch (error) {
        console.error('Error stuff call :', error);
      }
    },
    async getDataUser() {
      let user_email = localStorage.getItem("email")
      try {
        const response_user = await axios.get('http://localhost:8000/user/' + user_email);
        if (response_user.status === 200) {
          const data_user = response_user.data.data;
          this.user.uuid = data_user.id
        } else {
          console.error('Erreur lors de la récupération des infos du user:', response_user.status);
        }
      } catch (error) {
        console.error('Error user call :', error);
      }

      try {
        const response_user_bonus = await axios.get('http://localhost:8000/userhasbonus/' + this.user.uuid);
        if (response_user_bonus.status === 200) {
          const data_user_bonus = response_user_bonus.data.data;
          let user_bonus_max = data_user_bonus.length
          for (let i = 0; i < user_bonus_max; i++) {
            this.bonus.number.push(data_user_bonus[i].number)
          }
          console.log(this.bonus);
        } else {
          console.error('Erreur lors de la récupération des bonus du user:', response_user_bonus.status);
        }
      } catch (error) {
        console.error('Error userhasbonus call :', error);
      }

      try {
        const response_user_stuff = await axios.get('http://localhost:8000/userhasstuff/' + this.user.uuid);
        if (response_user_stuff.status === 200) {
          const data_user_stuff = response_user_stuff.data.data;
          let user_stuff_max = data_user_stuff.length
          for (let i = 0; i < user_stuff_max; i++) {
            this.stuff.statut.push(data_user_stuff[i].statut)
          }
          console.log(this.stuff);
          console.log(this.bonus);
          console.log(this.user);
        } else {
          console.error('Erreur lors de la récupération des bonus du user:', response_user_stuff.status);
        }
      } catch (error) {
        console.error('Error userhasbonus call :', error);
      }

    },
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
  