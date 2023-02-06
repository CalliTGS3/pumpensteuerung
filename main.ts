input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    basic.showNumber(Bodenfeuchte)
    basic.pause(1000)
    basic.clearScreen()
})
function Pumpe_aus () {
    Pumpenstatus = 0
    pins.analogWritePin(AnalogPin.P2, Pumpenstatus)
}
function Pumpe_an () {
    Pumpenstatus = 1023
    pins.analogWritePin(AnalogPin.P2, Pumpenstatus)
    Sekunden_seit_gießen = 0
}
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    Sekunden_seit_gießen = WartezeitNachGiessenInSekunden
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    basic.showNumber(Sekunden_seit_gießen)
    basic.pause(1000)
    basic.clearScreen()
})
function messe_Bodenfeuchte () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    Bodenfeuchte = pins.analogReadPin(AnalogPin.P1)
    pins.digitalWritePin(DigitalPin.P0, 0)
}
let Pumpsekunden = 0
let Pumpenstatus = 0
let Bodenfeuchte = 0
let Sekunden_seit_gießen = 0
let WartezeitNachGiessenInSekunden = 0
WartezeitNachGiessenInSekunden = 1 * 60
let GrenzwertBodenfeuchte = 500
let DauerPumpenInSekunden = 10
Sekunden_seit_gießen = 0
loops.everyInterval(1000, function () {
    if (Pumpsekunden == 0) {
        Pumpe_aus()
    } else {
        Pumpe_an()
        Pumpsekunden += -1
    }
    if (Sekunden_seit_gießen >= WartezeitNachGiessenInSekunden) {
        messe_Bodenfeuchte()
        if (Bodenfeuchte < GrenzwertBodenfeuchte) {
            Pumpsekunden = DauerPumpenInSekunden
        }
    }
    Sekunden_seit_gießen += 1
})
