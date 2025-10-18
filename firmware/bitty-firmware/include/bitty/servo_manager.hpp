#pragma once

#include <ESP32Servo.h>

#include <array>

namespace bitty {

class ServoManager {
 public:
  static constexpr size_t kServoCount = 4;
  using PinArray = std::array<uint8_t, kServoCount>;

  ServoManager();

  void attachServos(const PinArray& pins);
  void writeAngle(size_t index, float angleDegrees);
  void detachAll();

 private:
  PinArray attachedPins_{};
  std::array<Servo, kServoCount> servos_;
};

}  // namespace bitty
