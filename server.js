import './src/app'; // Chạy app

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1;
process.on('uncaughtException', function (exception) {
    console.log(exception);
});
