def doSomething1():
    pins.P6.digital_write(False)
    pins.P7.digital_write(True)
    control.wait_micros(3000000)
    pins.P6.digital_write(False)
    pins.P7.digital_write(False)
def doSomething2():
    pins.P6.digital_write(True)
    pins.P7.digital_write(False)
    control.wait_micros(3000000)
    pins.P6.digital_write(False)
    pins.P7.digital_write(False)
pins.LED.digital_write(True)

def on_forever():
    pins.LED.digital_write(False)
    control.wait_micros(1000000)
    pins.LED.digital_write(True)
    control.wait_micros(1000000)
    doSomething1()
    control.wait_micros(1000000)
    doSomething2()
forever(on_forever)
