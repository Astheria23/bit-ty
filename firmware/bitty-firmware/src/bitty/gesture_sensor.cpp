#include "bitty/gesture_sensor.hpp"

namespace bitty {

GestureSensor::GestureSensor() = default;

bool GestureSensor::begin() {
  if (!sensor_.begin()) {
    return false;
  }
  sensor_.enableGesture(true);
  return true;
}

GestureEvent GestureSensor::poll() {
  uint8_t gesture = 0;
  if (!readGesture(gesture)) {
    return GestureEvent::None;
  }

  switch (gesture) {
    case APDS9960_DOWN:
      return GestureEvent::Down;
    case APDS9960_UP:
      return GestureEvent::Up;
    case APDS9960_LEFT:
      return GestureEvent::Left;
    case APDS9960_RIGHT:
      return GestureEvent::Right;
    case APDS9960_NEAR:
      return GestureEvent::Near;
    case APDS9960_FAR:
      return GestureEvent::Far;
    default:
      return GestureEvent::None;
  }
}

bool GestureSensor::readGesture(uint8_t& gesture) {
  if (!sensor_.gestureValid()) {
    return false;
  }

  gesture = sensor_.readGesture();
  return gesture != 0;
}

}  // namespace bitty
