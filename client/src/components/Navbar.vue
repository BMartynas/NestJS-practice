<template>
    <div class="bg-blue-50 flex align-baseline justify-between px-16 py-5">
        <div @click="onGoHome" class=" table cursor-pointer">
            <h1 class="max-h-16 italic font-bold font-serif text-3xl table-cell align-middle">CatsApp</h1>
            <!-- <img :src="logo" class="max-h-16" /> -->
        </div>
        <div>
            <span v-if="user" class=" h-auto">{{user.username}}</span>
            <button @click="onLogout" class="bg-indigo-400 hover:bg-indigo-500 px-4 py-2 ml-8 rounded-3xl ring-2">Log out</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import UsersService from '@/api/services/UsersService'

const router = useRouter()
const user = ref(null)

onMounted(async() => {
        user.value = await UsersService.getProfile();
})

function onGoHome() {
    router.push({ name: 'Home'});
}

function onLogout() {
    localStorage.removeItem('jwtToken');
    router.push({ name: 'Login'});
}
</script>
