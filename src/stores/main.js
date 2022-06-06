import { defineStore } from 'pinia'
import { USD_TYPE, EUR_TYPE, RUB_TYPE } from '@/utils/currency'

export const useMainStore = defineStore('main', {
    state: () => ({
        currency: USD_TYPE,
        hideBalances: false
    }),

    actions: {
        changeCurrency(currency) {
            if (![USD_TYPE, EUR_TYPE, RUB_TYPE].includes(currency)) {
                console.warn('unknown currency');

                return;
            }

            this.currency = currency;
        }
    }
})