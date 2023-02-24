function doSomething1() {
    pins.P6.digitalWrite(false)
    pins.P7.digitalWrite(true)
    control.waitMicros(3000000)
    pins.P6.digitalWrite(false)
    pins.P7.digitalWrite(false)
}

function doSomething2() {
    pins.P6.digitalWrite(true)
    pins.P7.digitalWrite(false)
    control.waitMicros(3000000)
    pins.P6.digitalWrite(false)
    pins.P7.digitalWrite(false)
}

pins.LED.digitalWrite(true)
forever(function on_forever() {
    pins.LED.digitalWrite(false)
    control.waitMicros(1000000)
    pins.LED.digitalWrite(true)
    control.waitMicros(1000000)
    doSomething1()
    control.waitMicros(1000000)
    doSomething2()
})
