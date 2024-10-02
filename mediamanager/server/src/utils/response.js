const response = (statusCode, body) => {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',  // Habilitar CORS para todas las respuestas
            'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
        }
    };
};

module.exports = response