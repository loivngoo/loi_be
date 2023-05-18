export default async function (io, socket) {
    socket.on('Support::JOIN', async (payload) => {
        socket.broadcast.emit('Support::JOINED', payload);
    });
}
