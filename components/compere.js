'use strict'
class compere {
    // --------------------- init
    init ({c1,c2,complex = false}){
        if(complex === true){
            return this.CIE2000({c1: c1, c2: c2})
        } else {
            return this.CIE76({c1: c1, c2: c2})
        }
    }

    // --------------------- compare
    CIE76 ({c1, c2}) {
        // compare rgb liniar
        if (c1 && c2) {
            let _this = 0
            for (const _key in c2) {
                _this += Math.pow((c1[_key] - c2[_key]), 2)
            }
            
            return Math.sqrt(_this)
        }

        return false
    }

    CIE2000 ({c1,c2}) {
        // compare lab
        const C1 = Math.sqrt( Math.pow(c1.a, 2) + Math.pow(c1.b, 2)) 
        const C2 = Math.sqrt( Math.pow(c2.a, 2) + Math.pow(c2.b, 2)) 
    
        const aC1C2 = (C1 + C2) / 2.0
    
        let G = 0.5 * (1 - Math.sqrt( Math.pow(aC1C2, 7.0) / (Math.pow(aC1C2, 7.0) + Math.pow(25.0, 7.0))))
    
        let a1p = (1 + G) * c1.a 
        let a2p = (1 + G) * c2.a 
    
        let C1p = Math.sqrt(Math.pow(a1p, 2) + Math.pow(c1.b, 2)) 
        let C2p = Math.sqrt(Math.pow(a2p, 2) + Math.pow(c2.b, 2))
    
        let h1p = this.hpf(c1.b, a1p) 
        let h2p = this.hpf(c2.b, a2p)
    
        let dLp = c2.l - c1.l 
        let dCp = C2p - C1p 
    
        let dhp = this.dhpf(C1, C2, h1p, h2p) 
        let dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(this.toRadians(dhp) / 2.0)
    
        let aL = (c1.l + c2.l) / 2.0 
        let aCp = (C1p + C2p) / 2.0
    
        let ahp = this.ahpf(C1, C2, h1p, h2p)
        let T = 1 - 0.17 * Math.cos(this.toRadians(ahp - 30)) + 0.24 * Math.cos(this.toRadians(2 * ahp)) + 0.32 * Math.cos(this.toRadians(3 * ahp + 6)) - 0.2 * Math.cos(this.toRadians(4 * ahp - 63)) 
        let dro = 30 * Math.abs(-Math.pow((ahp - 275) / 25, 2))
        let RC = Math.sqrt( Math.pow(aCp, 7.0) / (Math.pow(aCp, 7.0) + Math.pow(25.0, 7.0))) 
        let SL = 1 + (0.015 * Math.pow(aL - 50, 2)) / Math.sqrt(20 + Math.pow(aL - 50, 2.0))
        let SC = 1 + 0.045 * aCp 
        let SH = 1 + 0.015 * aCp * T 
        let RT = -2 * RC * Math.sin(this.toRadians(2 * dro)) 
    
        return Math.sqrt( Math.pow(dLp / (SL * 1), 2) + Math.pow(dCp / (SC * 1), 2) + Math.pow(dHp / (SH * 1), 2) + RT * (dCp / (SC * 1)) * (dHp / (SH * 1)))
    }

    // --------------------- helpers for cie2000

    toDegrees(radians) {
        return radians * (180 / Math.PI)
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180)
    }

    hpf(x, y) {
        if (x === 0 && y === 0) {
            return 0
        } else {
            const tmphp = this.toDegrees(Math.atan2(x, y))
            if (tmphp >= 0) {
                return tmphp
            }
            return tmphp + 360
        }
    }

    dhpf(C1, C2, h1p, h2p) {
        if (C1 * C2 === 0) {
            return 0
        } else if (Math.abs(h2p - h1p) <= 180) {
            return h2p - h1p
        } else if (h2p - h1p > 180) {
            return h2p - h1p - 360
        } else if (h2p - h1p < -180) {
            return h2p - h1p + 360
        }
    }

    ahpf(C1, C2, h1p, h2p) {
        if (C1 * C2 === 0) {
            return h1p + h2p
        } else if (Math.abs(h1p - h2p) <= 180) {
            return (h1p + h2p) / 2.0
        } else if (Math.abs(h1p - h2p) > 180 && h1p + h2p < 360) {
            return (h1p + h2p + 360) / 2.0
        } else if (Math.abs(h1p - h2p) > 180 && h1p + h2p >= 360) {
            return (h1p + h2p - 360) / 2.0
        }
    }
}

module.exports = new compere()