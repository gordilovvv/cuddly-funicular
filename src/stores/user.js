import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        name: 'Вадим Александров',
        avatar: '/images/dev/avatar.png',
        isVerified: false
    })
})