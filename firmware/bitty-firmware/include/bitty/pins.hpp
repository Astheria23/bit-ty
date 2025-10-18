#pragma once

#include <Arduino.h>

namespace bitty::pins {

constexpr uint8_t I2C_SDA = 21;
constexpr uint8_t I2C_SCL = 22;

constexpr uint8_t SERVO_LEFT_ARM = 32;
constexpr uint8_t SERVO_RIGHT_ARM = 33;
constexpr uint8_t SERVO_HEAD = 25;
constexpr uint8_t SERVO_BODY = 26;

constexpr uint8_t DHT_DATA = 27;

constexpr int8_t OLED_RESET = 16;

constexpr uint8_t APDS9960_INT = 4;

}  // namespace bitty::pins
