const swaggerAutogen = require('swagger-autogen')(); 

const doc= {
    info: {
        title:'Contacts Api',
        descripition: 'Contacts Api'
    },
    host: 'localhost: 3002',
    schemes: ['http','https']    
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];


// This will generate swagger.json

swaggerAutogen(outputFile, endpointFiles, doc);
