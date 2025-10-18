#include "bitty/servo_manager.hpp"

#include <algorithm>

namespace bitty {

ServoManager::ServoManager() {
  attachedPins_.fill(255);
}

void ServoManager::attachServos(const PinArray& pins) {
  detachAll();
  for (size_t index = 0; index < pins.size(); ++index) {
    servos_[index].attach(pins[index]);
    attachedPins_[index] = pins[index];
  }
}

void ServoManager::writeAngle(size_t index, float angleDegrees) {
  if (index >= servos_.size()) {
    return;
  }
  servos_[index].write(static_cast<int>(angleDegrees));
}

void ServoManager::detachAll() {
  for (size_t index = 0; index < servos_.size(); ++index) {
    if (attachedPins_[index] != 255) {
      servos_[index].detach();
      attachedPins_[index] = 255;
    }
  }
}

}  // namespace bitty
