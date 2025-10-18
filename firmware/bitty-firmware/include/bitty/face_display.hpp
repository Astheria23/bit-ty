#pragma once

#include <Adafruit_SSD1306.h>
#include <Wire.h>

namespace bitty {

struct FaceDisplayConfig {
  uint8_t width;
  uint8_t height;
  int8_t resetPin;
  uint8_t i2cAddress;
};

class FaceDisplay {
 public:
  FaceDisplay(const FaceDisplayConfig& config, TwoWire& wire);

  bool begin();
  void clear();
  void renderBootScreen();

 private:
  FaceDisplayConfig config_;
  Adafruit_SSD1306 display_;
};

}  // namespace bitty
