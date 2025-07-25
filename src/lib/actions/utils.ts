
export const parseJSON = (data: any) => {
    if (!data) return data;
    
    // Handle array of documents
    if (Array.isArray(data)) {
        return data.map(item => parseJSON(item));
    }

    // Handle single document
    const plainObject = JSON.parse(JSON.stringify(data));
    // Ensure 'id' virtual is present, as it's used consistently across the app.
    // This handles cases where the default toJSON virtual serialization might not behave as expected.
    if (plainObject._id && !plainObject.id) {
        plainObject.id = plainObject._id.toString();
    }
    return plainObject;
};
