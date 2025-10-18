#pragma once

#include <DHT.h>

namespace bitty {

class EnvironmentSensor {
 public:
  EnvironmentSensor(uint8_t dataPin, uint8_t sensorType);

  void begin();
  float readTemperatureC();
  float readHumidity();

 private:
  DHT sensor_;
};

}  // namespace bitty
