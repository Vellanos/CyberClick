<template>
    <div class="background-game">
        <!-- <DataClic /> -->
        <Shop />

    </div>
</template>

<script>
import DataClic from './DataClic.vue';
import Shop from './Shop.vue';

export default {
    components: {
        DataClic,
        Shop
    },
}

</script>

<style>
.background-game {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>