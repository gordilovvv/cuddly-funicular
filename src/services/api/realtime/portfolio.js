import { onMounted, onUnmounted, ref } from 'vue'

export function useRealtimePortfolioAssetsUpdate() {
    const assets = ref([]);

    const subscribe = (updateCallback) => {
        updateCallback([
            {
                id: 'bitcoin',
                symbol: 'BTC',
                chain: null,
                value: 0.0000532525,
                decimals: 16,
                price: {
                    value: 30000.25235, // цена 1-й монеты
                    relativeChange24h: 12.2215125215125 // изменение цены за день в процентах
                },
                iconUrl: '/images/dev/btc.png'
            },
            {
                id: 'usdt-tron',
                symbol: 'USDT',
                chain: 'TRC-20',
                value: 100.04215,
                decimals: 2,
                price: {
                    value: 1.00011, // цена 1-й монеты
                    relativeChange24h: 0.099932 // изменение цены за день в процентах
                },
                iconUrl: '/images/dev/usdt.png'
            },
            {
                id: 'usdt-ethereum',
                symbol: 'USDT',
                chain: 'ETH-20',
                value: 0,
                price: {
                    value: 1.00011, // цена 1-й монеты
                    relativeChange24h: 0.099932 // изменение цены за день в процентах
                },
                iconUrl: '/images/dev/usdt.png'
            },
            {
                id: 'ethereum',
                symbol: 'ETH',
                chain: 'ERC-20',
                value: 1.32141251,
                price: {
                    value: 2767.404125125125, // цена 1-й монеты
                    relativeChange24h: 9.4241244214 // изменение цены за день в процентах
                },
                iconUrl: '/images/dev/eth.png'
            },
            {
                id: 'solana',
                symbol: 'SOL',
                chain: 'Solana',
                value: 4.420124,
                price: {
                    value: 52.404125125125, // цена 1-й монеты
                    relativeChange24h: 12.5326643346 // изменение цены за день в процентах
                },
                iconUrl: '/images/dev/sol.png'
            },
        ]);

        console.log('do subscribeToPortfolioAssetsUpdate');
    }

    const unsubscribe = () => {
        // TODO: logic
        console.log('do unsubscribeFromPortfolioAssetsUpdate');
    }

    onMounted(() => {
        subscribe(portfolioAssets => {
            assets.value = portfolioAssets;
        });
    });

    onUnmounted(() => {
        unsubscribe(); 
    });

    return [ assets ];
}

export function useRealtimePortfolioTransactionsUpdate() {
    const transactions = ref([]);

    const subscribe = updateCb => {
        updateCb([
            {
                txs: [
                    {
                        id: 'afasfasf',
                        hash: '0xdde7b4bf512dc99156bde8a4a780466b6a907e43706a8101492eed340bc32e11',
                        type: 'deposit',
                        assetFrom: {
                            id: 'ruble',
                            name: 'Ruble',
                            symbol: 'RUB',
                            decimals: 2,
                            chain: null,
                            iconUrl: '/images/dev/rub.png',
                            value: 7500,
                            price: 100,

                        },
                        assetTo: {
                            id: 'ethereum',
                            name: 'Ethereum',
                            symbol: 'ETH',
                            decimals: 16,
                            chain: 'ethereum',
                            iconUrl: '/images/dev/eth.png',
                            value: 0.09253200,
                            price: 100,
                        },
                        fee: {
                            value: 0.001,
                            price: 10
                        },
                        addressFrom: null,
                        addressTo: '0xbbbd96327fb76ee01b660001608aea2e8196e193',
                        status: 'confirmed',
                        timestamp: 1654164000
                    }
                ],
                dayTs: 1654160400
            }
        ])
    }

    const unsubscribe = () => {
        
    }

    onMounted(() => {
        subscribe(transactionsRes => {
            transactions.value = transactionsRes;
        });
    });

    onUnmounted(() => {
        unsubscribe();
    });
    

    return [ transactions ];
}