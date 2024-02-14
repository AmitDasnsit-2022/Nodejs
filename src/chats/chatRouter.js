export const socketServer = (socket, io) => {
  /**
   * @description Event of connected
   */
  socket.on("connected", async (data) => {
    console.log("connected");
  });

  /**
   * @description event of disconnect to socket server.
   */
  socket.on("disconnect", async () => {
    console.log("user disconnect");
  });
};
