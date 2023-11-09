<template>
    <div class="background-game">
        <DataClic />

    </div>
</template>

<script>
import DataClic from './DataClic.vue';

export default {
    components: {
        DataClic
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