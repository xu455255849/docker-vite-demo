#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>

#include <iostream>
#include <string>

typedef websocketpp::server<websocketpp::config::asio> server;

void on_message(websocketpp::connection_hdl hdl, server::message_ptr msg) {
    std::cout << "Received frame data: " << msg->get_payload() << std::endl;

    // Process the received frame data here.
}

int main() {
    server ws_server;

    ws_server.init_asio();
    ws_server.set_message_handler(&on_message);

    uint16_t port = 9000;
    ws_server.listen(port);
    ws_server.start_accept();

    std::cout << "WebSocket server started on port: " << port << std::endl;

    ws_server.run();
}
