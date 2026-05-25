export const calculateTotalPrice = (pricePerPerson, numberOfPeople) => {
    return pricePerPerson * numberOfPeople;
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('sr-RS', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatPrice = (price) => {
    return new Intl.NumberFormat('sr-RS').format(price) + ' RSD';
};