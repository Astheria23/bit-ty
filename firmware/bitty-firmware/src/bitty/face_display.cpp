#include "bitty/face_display.hpp"

namespace bitty {

FaceDisplay::FaceDisplay(const FaceDisplayConfig& config, TwoWire& wire)
    : config_(config),
      display_(config.width, config.height, &wire, config.resetPin) {}

bool FaceDisplay::begin() {
  if (!display_.begin(SSD1306_SWITCHCAPVCC, config_.i2cAddress)) {
    return false;
  }

  display_.clearDisplay();
  display_.setTextSize(1);
  display_.setTextColor(SSD1306_WHITE);
  display_.setCursor(0, 0);
  display_.println(F("Bit-Ty"));
  display_.display();
  return true;
}

void FaceDisplay::clear() {
  display_.clearDisplay();
  display_.display();
}

void FaceDisplay::renderBootScreen() {
  display_.clearDisplay();
  display_.setTextSize(2);
  display_.setTextColor(SSD1306_WHITE);
  display_.setCursor(10, 16);
  display_.println(F(":-)"));
  display_.display();
}

}  // namespace bitty
