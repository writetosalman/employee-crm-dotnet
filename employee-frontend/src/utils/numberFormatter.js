
// Create our number formatter.
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style:      'currency',
    currency:   'AUD',
    currencyDisplay: 'narrowSymbol',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// Create our number formatter.
const numberFormatter = new Intl.NumberFormat('en-US');

export const getFormattedPrice = (price, numberOfDecimals = 2) => {
    if ( !price || isNaN(price) ) return '$0.00';

    if ( numberOfDecimals === 2 ) return currencyFormatter.format(price);
    const formatter = new Intl.NumberFormat('en-US', {
        style:      'currency',
        currency:   'AUD',
        currencyDisplay: 'narrowSymbol',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: numberOfDecimals, // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(price);
};

export const getFormattedNumber = number => {
    return numberFormatter.format(number);
};

export const getFormattedPercentage = percentage => {
    if ( isNaN(percentage) ) return percentage;

    const round = Math.round(percentage);
    return (<span className={`text-${ round > 0 ? 'success':'danger'}`}>{ round }%</span>)
};

export const getPriceInShortWord = price => {
    if ( isNaN(price) ) return price;

    // Billion
    const inB = parseFloat((price / 1000000000)).toFixed(2);
    if ( inB >= 1.0 )
        return (inB) + ' B';

    // Million
    const inM = parseFloat(price / 1000000).toFixed(2);
    if ( inM >= 1.0 )
        return (inM) + ' M';

    // Thousands
    const inK = parseFloat(price / 1000).toFixed(2);
    if ( inK >= 1.0 )
        return (inK) + ' K';

    return getFormattedNumber(price);
};

export const formatTimeFromTimestamp = (ts, skipSeconds = false) => {
    const dtFormat = new Intl.DateTimeFormat('en-GB', {
        timeStyle: 'medium',
        timeZone: 'UTC'
    });

    const time = dtFormat.format(new Date(ts * 1000)); // Date needs time in ms
    if (skipSeconds)
        return time.substring(0, 5);

    return time;
}