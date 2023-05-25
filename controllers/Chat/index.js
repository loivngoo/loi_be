let users = [];
export async function Chat(io, socket) {
    socket.on('chat::sendMessage', async (payload) => {
        socket.broadcast.emit('chat::receivedMessage', {
            ...payload,
        });
    });
}
