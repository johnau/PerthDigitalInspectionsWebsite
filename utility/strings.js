export const toTitleCase = (str) => {
    if (!str) return "";
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};

export const truncateString = (str, n) => {
    return (str.length > n) ? str.slice(0, n) + '...' : str;
} ;