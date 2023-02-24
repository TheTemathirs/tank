
let CTRL_BYTE_DELAY: number = 0;

let commandPin: DigitalInOutPin;
let dataPin: DigitalInOutPin;
let clkPin: DigitalInOutPin;
let attnPin: DigitalInOutPin;

let readDelay: number;

namespace PS
{

    function SET(x: number, y: number): number
    {
        return x |= (1 << y);
    }
    
    function CLR(x: number, y: number): number
    {
        return x &= (~(1 << y));
    }
    
    function CHK(x: number, y: number): number
    {
        return x & (1 << y);
    }
    
    function TOG(x: number, y: number): number
    {
        return x ^= (1 << y);
    }

    function Button(uint16_t: number): boolean
    {
        
        return true;
    }
    
    function ButtonDataByte(): number
    {
        return 1;
    }
    
    function NewButtonState_0(): boolean
    {
        return true;
    }
    
    function NewButtonState_1(value: number): boolean
    {
        return true;
    }
    
    function ButtonPressed(value: number): boolean
    {
        return true;
    }

    function ButtonReleased(value: number): boolean
    {
        return true;
    }

    function read_gamepad_0(): void
    {

    }

    function read_gamepad_1(value: boolean): boolean
    {
        return true;
    }

    function readType(): number
    {
        return 1;
    }

    function config_gamepad(clk: DigitalInOutPin, cmd: DigitalInOutPin, att: DigitalInOutPin, dat: DigitalInOutPin): number
    {
        for (i: number = 0, i < len(type_read), i++)
        {
            temp[i] = 0;
        }

        commandPin = cmd;
        dataPin = dat;
        clkPin = clk;
        attnPin = att;

        readDelay = 1;

        commandPin.digitalWrite(true);
        clkPin.digitalWrite(true);

        CMD_SET();
        CLK_SET();

        # new error checking.First, read gamepad a few times to see if it's talking
        self.read_gamepadNA()
        self.read_gamepadNA()

        # see if it talked - see if mode came back.
        # If still anything but 41, 73 or 79, then it's not talking
        if (self.PS2data[1] != 0x41 and self.PS2data[1] != 0x42 and self.PS2data[1] != 0x73 and self.PS2data[1] != 0x79):
        if debug:
            print("Controller mode not matched or no controller found , Expected 0x41, 0x42, 0x73 or 0x79, but got {}".format(
                hex(self.PS2data[1])))
        return 1  # return error code 1
        # /try setting mode, increasing delays if need be.
            self.read_delay = 1

        for y in range(11):
            self.sendCommandString(enter_config, len(
                enter_config))  # start config run

            # read type
        sleep_us(CTRL_BYTE_DELAY)
        self.CMD_SET()
        self.CLK_SET()
        self.ATT_CLR()  # low enable joystick
        sleep_us(CTRL_BYTE_DELAY)
        for i in range(9):
            temp[i] = self._gamepad_shiftinout(type_read[i])
        self.ATT_SET()  # HI disable joystick
        self.controller_type = temp[3]
        self.sendCommandString(set_mode, len(set_mode))
        if (rumble):
            self.sendCommandString(enable_rumble, len(enable_rumble))
        self.en_Rumble = True
        if (pressures):
            self.sendCommandString(set_bytes_large, len(set_bytes_large))
        self.en_Pressures = True
        self.sendCommandString(exit_config, len(exit_config))
        self.read_gamepadNA()
        if (pressures):
            if (self.PS2data[1] == 0x79):
                break
        if (self.PS2data[1] == 0x73):
            return 3
        if (self.PS2data[1] == 0x73):
            break
        if (y == 10):
            if debug:
                print("Controller not accepting commands" +
                    "mode still set at".format(hex(self.PS2data[1])))
        return 2  # exit function with error
            self.read_delay += 1  # add 1ms to read_delay
        return 0  # no error if here
    }


    function enableRumble(): void
    {

    }

    function enablePressures(): boolean
    {
        return true;
    }
    function Analog(value: number): number
    {
        return 1;
    }

    function reconfig_gamepad(): void
    {

    }
    
    function CLK_SET(): void
    {
        clkPin.digitalWrite(true);
    }
    function CLK_CLR(): void
    {
        clkPin.digitalWrite(false);
    }
    function CMD_SET(): void
    {
        commandPin.digitalWrite(true);
    }
    function CMD_CLR(): void
    {
        commandPin.digitalWrite(false);
    }
    function ATT_SET(): void
    {
        attnPin.digitalWrite(true);
    }
    function ATT_CLR(): void
    {
        attnPin.digitalWrite(false);
    }
    function DAT_CHK(): number
    {
        return dataPin.value();
    }

    

    function _gamepad_shiftinout(value: Char): Char
    {
        let tmp: Char = 0;
        for (let i: number = 0; i < 8; i++) 
        {

            if (CHK(byte, i)) CMD_SET();
            else CMD_CLR();
            CLK_CLR();

            //delayMicroseconds(CTRL_CLK);

            if (DAT_CHK()) SET(tmp, i);
            CLK_SET();
        //#if CTRL_CLK_HIGH
        //    delayMicroseconds(CTRL_CLK_HIGH);
        //#endif
        }
        CMD_SET();
        //delayMicroseconds(CTRL_BYTE_DELAY);
        return tmp;
    }
    let PS2data: String; // 21
    function sendCommandString(command: String): void
    {
        

    }
    let i: String;
    let last_buttons: number;
    let buttons: number;
    /*
#ifdef __AVR__
    uint8_t maskToBitNum(uint8_t);
    uint8_t _clk_mask;
    volatile uint8_t * _clk_oreg;
    uint8_t _cmd_mask;
    volatile uint8_t * _cmd_oreg;
    uint8_t _att_mask;
    volatile uint8_t * _att_oreg;
    uint8_t _dat_mask;
    volatile uint8_t * _dat_ireg;
#else
    uint8_t maskToBitNum(uint8_t);
    uint16_t 				_clk_mask;
    volatile uint32_t * _clk_lport_set;
    volatile uint32_t * _clk_lport_clr;
    uint16_t 				_cmd_mask;
    volatile uint32_t * _cmd_lport_set;
    volatile uint32_t * _cmd_lport_clr;
    uint16_t 				_att_mask;
    volatile uint32_t * _att_lport_set;
    volatile uint32_t * _att_lport_clr;
    uint16_t 				_dat_mask;
    volatile uint32_t * _dat_lport;
#endif
    let last_read: number;
    let read_delay: number;
    let controller_type: number;
    let en_Rumble: boolean;
    let en_Pressures: boolean;*/
}
