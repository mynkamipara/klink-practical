import moment from "moment";

// function to convert USD formate with $ symbole
export const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

export const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3
});

// Convert number to percentage format with % sign
export const percentageFormat = (value: number) => `${(Math.floor(value * 100) / 100)}%`;


// transform graph data and return xaxis and yaxis
export const transformGraphData = (item: Array<[number, number]>) => {
    const xaxis = [];
    const yaxis = [];
    for (let [date, price] of item) {
        yaxis.push(moment.unix(date / 1000).format('YYYY-MM-DD hh:mm'));
        xaxis.push(Math.floor(price));
    }
    return {
        xaxis,
        yaxis
    }
}