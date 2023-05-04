#include <cstdint>
#include <iostream>

extern "C" {
  void process_frame(const uint8_t* data, int width, int height) {
    std::cout << "Received frame data (first 10 bytes): ";
    for (int i = 0; i < 10; ++i) {
      std::cout << static_cast<int>(data[i]) << " ";
    }
    std::cout << std::endl;

    // 在这里处理接收到的帧数据
  }
}
