export const utcDate = (localDate) => {
    
    if (localDate===null) return null;

    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate())); 

};