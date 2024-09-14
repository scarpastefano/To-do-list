<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const endpoint = 'http://localhost:3000/product';

let products = ref([]);

let boughtProduct = computed(() => products.value.filter(p => p.completed).length);
let toBuyProduct = computed(() => products.value.filter(p => !p.completed).length);

onMounted(() => {
    axios.get(endpoint).then((resp) => {
        // console.log(resp.data);
        products.value = resp.data;
    })
})

function onAddProduct(e) {
    // console.log(e);
    const nameProduct = e.target.value
    
    const newProduct = {
        name: nameProduct,
        completed: false
    }
    
    axios.post(endpoint, newProduct).then((resp) => {
        products.value = [...products.value, resp.data];
        
        e.target.value = "";
    })
}

function toggleCompleted(item){
    axios.patch(`${endpoint}/${item.id}`, item).then((resp) => {
    })
}

function deleteProduct(productID){
    axios.delete(`${endpoint}/${productID}`).then((resp) => {
        products.value = products.value.filter(p => p.id != productID)
    })
}

</script>

<template>
    
    <!-- input creazione -->
    <div class="w-full sm:w-2/5 mx-auto my-4">
        <label class="input input-bordered flex items-center gap-2">
            <input @keyup.enter="onAddProduct($event)" type="text" class="grow" placeholder="inserisci il prodotto" />
            <kbd class="kbd kbd-sm">invio</kbd>
        </label>
    </div>
    
    <!-- contatori -->
    <div class="w-full sm:w-2/5 mx-auto my-4">
        <div class="w-full flex flex-row justify-between">
            <button class="btn w-1/2">
                comprati
                <span class="badge">{{ boughtProduct }}</span>
            </button>
            <button class="btn w-1/2">
                da comprare
                <span class="badge">{{ toBuyProduct }}</span>
            </button>
        </div>
    </div>
    
    <!-- lista prodotti -->
    <div class="w-full sm:w-2/5 mx-auto my-4 border-neutral border rounded-2xl p-2">
        <div v-for="product in products" :key="product.id" class="flex justify-between">
            <button @click="deleteProduct(product.id)" class="btn btn-ghost text-error hover:bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
            
            <span class="label-text my-auto w-full" :class="{'line-through': product.completed }" >{{ product.name }}</span>
            
            
            <label class="label cursor-pointer me-5">
                <input 
                @change="toggleCompleted(product)"
                v-model="product.completed" 
                type="checkbox" 
                class="checkbox" />
            </label>
        </div>
    </div>
</template>

<script setup>

</script>