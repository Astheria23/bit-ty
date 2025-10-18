#include "bitty/environment_sensor.hpp"

namespace bitty {

EnvironmentSensor::EnvironmentSensor(uint8_t dataPin, uint8_t sensorType)
    : sensor_(dataPin, sensorType) {}

void EnvironmentSensor::begin() {
  sensor_.begin();
}

float EnvironmentSensor::readTemperatureC() {
  return sensor_.readTemperature(false);
}

float EnvironmentSensor::readHumidity() {
  return sensor_.readHumidity();
}

}  // namespace bitty
