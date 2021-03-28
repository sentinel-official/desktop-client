export const capitalizeFirstLetter = (value) => {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
};
