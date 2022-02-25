<template>
  <div class="text-center">
    <Navbar />
    <AddCat @addedCat="getAllCats"/>
    <div class="flex justify-around flex-wrap my-10 ">
      <div 
        v-for="(cat, index) in cats.values"
        :item="cat"
        :index="index"
        :key="cat._id"
        >
        <Cat :name="cat.name" :breed="cat.breed" :catId="cat._id" :hasPicture="cat.picture"/>
      </div>
   </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import CatsService from '@/api/services/CatsService'
import Cat from '../components/Cat.vue'
import AddCat from '../components/AddCat.vue'
import Navbar from '../components/Navbar.vue'

const cats = reactive([])

onMounted(() => {
  getAllCats()
})

async function getAllCats() {
  cats.values = await CatsService.getCats()
}
</script>
