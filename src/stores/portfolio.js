import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolio', {
    state: () => ({
        assetsTotal: 2400, // общая сумма крипты
        assetsTotalFiat: 17937, // и тут уже сумма в зависимости от выбранной фиатной валюты
        absoluteChange24h: 1000, // это сумма в usd, rub или eur, которая изменилась за 24 час
        relativeChange24h: 10, // это процент изменения за 24 часа
    })
});