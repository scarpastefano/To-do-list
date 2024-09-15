<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import Product from './Product.vue'
const Tab = ref(1);
</script>

<template>
    <div class="w-full">
        <div class="flex justify-center p-5">
            <button 
                @click="Tab = 1"
                :class="{'btn-neutral': Tab === 1}"
                class="btn">
                Home
            </button>
            <button 
                @click="Tab = 0"
                :class="{'btn-neutral': Tab === 0}"
                class="btn">
                Prodotti
            </button>
        </div>

        <div>
            <div v-if="Tab === 1" class="py-10 px-6">
                <Home />
            </div>
            <div v-if="Tab === 0" class="py-10 px-6">
                <Product />
            </div>
        </div>
    </div>
</template>

<script setup>

</script>