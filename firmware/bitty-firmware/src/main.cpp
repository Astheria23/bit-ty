#include <Arduino.h>
#include <Wire.h>

#include "bitty/environment_sensor.hpp"
#include "bitty/face_display.hpp"
#include "bitty/gesture_sensor.hpp"
#include "bitty/pins.hpp"
#include "bitty/servo_manager.hpp"

namespace {

TwoWire& kI2cBus = Wire;

bitty::FaceDisplay display({128, 64, bitty::pins::OLED_RESET, 0x3C}, kI2cBus);
bitty::GestureSensor gestureSensor;
bitty::EnvironmentSensor environmentSensor(bitty::pins::DHT_DATA, DHT22);
bitty::ServoManager servoManager;

bitty::ServoManager::PinArray servoPins = {
    bitty::pins::SERVO_LEFT_ARM,
    bitty::pins::SERVO_RIGHT_ARM,
    bitty::pins::SERVO_HEAD,
    bitty::pins::SERVO_BODY,
};

void initI2C() {
  kI2cBus.begin(bitty::pins::I2C_SDA, bitty::pins::I2C_SCL, 400000);
}

void initDisplay() {
  if (!display.begin()) {
    Serial.println(F("[boot] OLED init failed"));
    return;
  }
  display.renderBootScreen();
}

void initSensors() {
  if (!gestureSensor.begin()) {
    Serial.println(F("[boot] APDS9960 init failed"));
  }

  environmentSensor.begin();
}

void initServos() {
  servoManager.attachServos(servoPins);
  for (size_t index = 0; index < servoPins.size(); ++index) {
    servoManager.writeAngle(index, 90);
  }
}

void logEnvironment() {
  const float temperature = environmentSensor.readTemperatureC();
  const float humidity = environmentSensor.readHumidity();
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println(F("[env] sensor read failed"));
    return;
  }

  Serial.print(F("[env] tempC="));
  Serial.print(temperature, 1);
  Serial.print(F(" humidity="));
  Serial.println(humidity, 1);
}

void handleGestures() {
  const bitty::GestureEvent event = gestureSensor.poll();
  if (event == bitty::GestureEvent::None) {
    return;
  }

  Serial.print(F("[gesture] event="));
  Serial.println(static_cast<int>(event));
}

unsigned long lastEnvironmentSampleMs = 0;
constexpr unsigned long kEnvironmentSampleIntervalMs = 2000;

}  // namespace

void setup() {
  Serial.begin(115200);
  initI2C();
  initDisplay();
  initSensors();
  initServos();
}

void loop() {
  handleGestures();

  const unsigned long now = millis();
  if (now - lastEnvironmentSampleMs >= kEnvironmentSampleIntervalMs) {
    lastEnvironmentSampleMs = now;
    logEnvironment();
  }

  delay(10);
}