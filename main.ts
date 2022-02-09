function FollowMode () {
    if (Tinybit.Ultrasonic_Car() < 15) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 70)
    } else {
        Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
    }
}
function BreathLED () {
    Tinybit.RGB_Car_Program().clear()
    for (let k = 0; k <= 255; k++) {
        Tinybit.RGB_Car_Program().setBrightness(k)
        Tinybit.RGB_Car_Program().showColor(neopixel.colors(NeoPixelColors.Purple))
        Tinybit.RGB_Car_Program().show()
    }
    j = 255
    for (let l = 0; l <= 255; l++) {
        Tinybit.RGB_Car_Program().setBrightness(j)
        j += -1
        Tinybit.RGB_Car_Program().showColor(neopixel.colors(NeoPixelColors.Purple))
        Tinybit.RGB_Car_Program().show()
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showLeds(`
        . . . . .
        # . . . #
        # # # # #
        # . . . #
        . # # # .
        `)
    basic.pause(1000)
    Tinybit.RGB_Car_Big(Tinybit.enColor.Green)
    connected = 1
    while (connected == 1) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        CarCtrl()
        domusic()
        SevenColorLED()
        SevenWaterLED()
        ModeSelect()
        distance = Tinybit.Ultrasonic_Car()
        temp = input.temperature()
        str1 = "" + distance + ""
        str1 = "" + str1 + ","
        str2 = "" + temp + ""
        str2 = "" + str2 + "#"
        CSB = "$CSB" + str1 + str2
        bluetooth.uartWriteString(CSB)
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #
        `)
    connected = 0
    Tinybit.RGB_Car_Big(Tinybit.enColor.Blue)
})
function domusic () {
    if (uartdata == "1") {
        music.ringTone(262)
    } else if (uartdata == "2") {
        music.ringTone(294)
    } else if (uartdata == "3") {
        music.ringTone(330)
    } else if (uartdata == "4") {
        music.ringTone(349)
    } else if (uartdata == "5") {
        music.ringTone(392)
    } else if (uartdata == "6") {
        music.ringTone(440)
    } else if (uartdata == "7") {
        music.ringTone(494)
    } else if (uartdata == "8") {
        music.ringTone(523)
    } else if (uartdata == "B1") {
        music.ringTone(277)
    } else if (uartdata == "B2") {
        music.ringTone(311)
    } else if (uartdata == "B3") {
        music.ringTone(370)
    } else if (uartdata == "B4") {
        music.ringTone(415)
    } else if (uartdata == "B5") {
        music.ringTone(466)
    } else if (uartdata == "O") {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
}
function ModeSelect () {
    if (uartdata == "S") {
        basic.showIcon(IconNames.House)
        g_mode = 1
    } else if (uartdata == "T") {
        basic.showIcon(IconNames.Angry)
        g_mode = 2
    } else if (uartdata == "U") {
        basic.showIcon(IconNames.EigthNote)
        g_mode = 3
    } else if (uartdata == "V") {
        g_mode = 0
        basic.showLeds(`
            . . . . .
            # . . . #
            # # # # #
            # . . . #
            . # # # .
            `)
        Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
    }
}
function AvoidMode () {
    if (Tinybit.Ultrasonic_Car() < 15) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 90)
        basic.pause(400)
    } else {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 100)
    }
}
function HorseLED () {
    Tinybit.RGB_Car_Program().setBrightness(255)
    Tinybit.RGB_Car_Program().setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(2, neopixel.colors(NeoPixelColors.Blue))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().show()
}
function TrackingMode () {
    if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White)) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 150)
    } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, 80)
    } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White)) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 80)
    } else {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Stop, 0)
    }
}
function WaterLED () {
    Tinybit.RGB_Car_Program().setBrightness(255)
    Tinybit.RGB_Car_Program().setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().show()
}
function SevenColorLED () {
    if (uartdata == "G") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
    } else if (uartdata == "H") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Green)
    } else if (uartdata == "I") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Blue)
    } else if (uartdata == "J") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Yellow)
    } else if (uartdata == "K") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Cyan)
    } else if (uartdata == "L") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Pinkish)
    } else if (uartdata == "M") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
    }
}
function CarCtrl () {
    if (uartdata == "A") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 150)
    } else if (uartdata == "B") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Back, 150)
    } else if (uartdata == "C") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Left, 150)
    } else if (uartdata == "D") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Right, 150)
    } else if (uartdata == "E") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 150)
    } else if (uartdata == "F") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, 150)
    } else if (uartdata == "0") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Right, 0)
    }
}
function SevenWaterLED () {
    if (uartdata == "N") {
        g_RGBMode = 1
    } else if (uartdata == "P") {
        g_RGBMode = 2
    } else if (uartdata == "Q") {
        g_RGBMode = 3
    } else if (uartdata == "R") {
        g_RGBMode = 4
    } else if (uartdata == "W") {
        g_RGBMode = 5
    }
}
let g_blue = 0
let g_Green = 0
let g_Red = 0
let CSB = ""
let str2 = ""
let str1 = ""
let temp = 0
let distance = 0
let uartdata = ""
let j = 0
let g_mode = 0
let g_RGBMode = 0
let connected = 0
let item = ""
let i = 0
Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
basic.showString("S")
connected = 0
g_RGBMode = 0
g_mode = 0
basic.forever(function () {
	
})
basic.forever(function () {
    if (g_mode == 1) {
        TrackingMode()
    } else if (g_mode == 2) {
        AvoidMode()
    } else if (g_mode == 3) {
        FollowMode()
    }
    if (g_RGBMode == 5) {
        Tinybit.RGB_Car_Program().clear()
        Tinybit.RGB_Car_Program().show()
    } else if (g_RGBMode == 1) {
        Tinybit.RGB_Car_Program().clear()
        WaterLED()
    } else if (g_RGBMode == 2) {
        Tinybit.RGB_Car_Program().clear()
        HorseLED()
    } else if (g_RGBMode == 3) {
        Tinybit.RGB_Car_Program().clear()
        BreathLED()
    } else if (g_RGBMode == 4) {
        Tinybit.RGB_Car_Program().clear()
        Tinybit.RGB_Car_Program().setBrightness(200)
        g_Red = randint(0, 255)
        g_Green = randint(0, 255)
        g_blue = randint(0, 255)
        Tinybit.RGB_Car_Program().showColor(neopixel.rgb(g_Red, g_Green, g_blue))
        Tinybit.RGB_Car_Program().show()
        g_RGBMode = 0
    }
    basic.pause(10)
})
