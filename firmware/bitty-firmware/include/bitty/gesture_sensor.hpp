#pragma once

#include <Adafruit_APDS9960.h>

namespace bitty {

enum class GestureEvent {
  None = 0,
  Up,
  Down,
  Left,
  Right,
  Near,
  Far
};

class GestureSensor {
 public:
  GestureSensor();

  bool begin();
  GestureEvent poll();

 private:
  bool readGesture(uint8_t& gesture);

  Adafruit_APDS9960 sensor_;
};

}  // namespace bitty
