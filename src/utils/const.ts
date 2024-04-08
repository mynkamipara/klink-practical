/*
* list of day item for graph filter
* {Array<Object>} daysItem - {
*  label: <String>
*  value: <String>
*  }
*/
export const daysItem = [
    { label: '1D', value: '1' },
    { label: '1W', value: '7' },
    { label: '1M', value: '30' },
    { label: '3M', value: '90' },
    { label: '1Y', value: '365' },
    { label: 'ALL', value: 'max' }
]

/*
* colorcode object to define color for different coins
* {Object} colorCode - {
*  bitcoin : <String> // color code value
*  }
*/
export const colorCode: any = {
    'bitcoin': '#F7931A',
    'usd': '#2775CA',
    'ethereum': '#8A8FAF',
    'tether': '#26A17B',
    'dai': '#FBC44D',
    'solana': '#26A17B',
    'dogecoin': '#26A17B',
    'cardano': '#2775CA',
    'avalanche-2': '#E84142',
}

// Object to define color for coin's graph
export const chartColorCode: any = {
    'bitcoin': {
        border: '#F7931A',
        charthigh: {
            default: "rgba(161,98,22)",
            half: "rgba(46,33,16)",
            quarter: "rgba(34,26,16)",
            zero: "rgba(149, 76, 233, 0)"
        },
        chartlow: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    },
    'usd': {
        border: '#F7931A',
        charthigh: {
            default: "rgba(161,98,22)",
            half: "rgba(46,33,16)",
            quarter: "rgba(34,26,16)",
            zero: "rgba(149, 76, 233, 0)"
        },
        chartlow: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    },
    'ethereum': {
        border: '#6977d8fa',
        charthigh: {
            default: "rgb(99,103,141)",
            half: "rgb(80,88,146,0.55)",
            quarter: "rgba(34,26,16)",
            zero: "rgba(149, 76, 233, 0)"
        },
        chartlow: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    },
    'tether': {
        border: '#26A17B',
        charthigh: {
            default: "rgb(38 161 123)",
            half: "rgb(38 161 123 / 37%)",
            quarter: "rgb(38 161 123 / 24%)",
            zero: "rgba(149, 76, 233, 0)"
        },
        chartlow: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    },
    'solana': {
        border: '#26A17B',
        charthigh: {
            default: "rgb(38 161 123)",
            half: "rgb(38 161 123 / 37%)",
            quarter: "rgb(38 161 123 / 24%)",
            zero: "rgba(149, 76, 233, 0)"
        },
        chartlow: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    },
    'dogecoin': {
        border: '#26A17B',
        charthigh: {
            default: "rgb(38 161 123)",
            half: "rgb(38 161 123 / 37%)",
            quarter: "rgb(38 161 123 / 24%)",
            zero: "rgba(149, 76, 233, 0)"
        },
        chartlow: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    },
    'cardano': {
        border: '#2675CA',
        charthigh: {
            default: "rgb(18,28,39)",
            half: "rgb(18,29,40)",
            quarter: "rgb(18,29,40)",
            zero: "rgba(149, 76, 233, 0)"
        },
        chartlow: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    },
    'avalanche-2': {
        border: '#E84142',
        charthigh: {
            default: "rgb(44,21,21)",
            half: "rgb(40,21,21)",
            quarter: "rgb(31,19,19)",
            zero: "rgba(149, 76, 233, 0)"
        },
        chartlow: {
            default: "rgba(80, 102, 120, 1)",
            quarter: "rgba(80, 102, 120, 0.25)"
        }
    },
}