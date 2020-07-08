"use strict";

var x = 0;
var y = 0;
var r = 90;
var ls = [];
var nume = process.argv[2];

var fs = require('fs');
try {
   var data = fs.readFileSync(nume).toString();
} catch(err) {
   console.error(err);
}

var j = 0;
for(var i = 0; i <= data.length; i++){
    if(data[i] == '\n'){
        ls.push(data.substring(j, i-1));
        j = i + 1;
    }else if(i == data.length){
        ls.push(data.substring(j, i));
    }
}

for(var i = 0; i < ls.length; i++){
    if(ls[i].trim() != ''){
        var com = ls[i].split(",").join(" ");
        com = com.split(" ");
        var c = '';
        var ok = false;
        var j;

        for(j = 0; j < com.length && ok == false; j++){
            if(com[j].toUpperCase() == 'FORWARD' || com[j].toUpperCase() == 'BACKWARD' || com[j].toUpperCase() == 'TURN' || com[j].toUpperCase() == 'JUMP' || com[j].toUpperCase() == 'REPEAT' || com[j].toUpperCase() == 'END' || com[j] == '#'){
                c = com[j].toUpperCase();
                ok = true;
            }
        }

        if(ok == false){
            console.log("ERROR LINE " +(i+1) +": Unknown command " +ls[i].trim());

        }else if(c == 'REPEAT'){
            console.log('repeat nefacut');
            
        }else if(c == 'END'){
            console.log('end nefacut');
            
        }else if(c == 'FORWARD'){
            var val = null;
            var val_gr;
            var nr = 0;
            for(var k = j; k < com.length; k++){
                if(com[k] != '' && com[k] != ','){
                    nr++;
                    if(isNaN(com[k]) == false && Number.isInteger(+com[k]) == true && nr == 1){
                        val = parseInt(com[k]);
                    }else{
                        val_gr = com[k];
                    }
                }
            }
            if(val == null && nr == 1){
                console.log("ERROR LINE " +(i+1) +": FORWARD parameter 1 requires a number, you wrote " +val_gr);
            }else if(nr != 1){
                console.log("ERROR LINE " +(i+1) +":FORWARD has 1 parameters, you wrote " +nr);
            }else{
                x = x + val * Math.cos(r * Math.PI / 180);
                y = y + val * Math.sin(r * Math.PI / 180);
                x = Math.round(x);
                y = Math.round(y);
                console.log("OK " +x +", " +y +", " +r);
            }

        }else if(c == 'BACKWARD'){
            var val = null;
            var val_gr;
            var nr = 0;
            for(var k = j; k < com.length; k++){
                if(com[k] != '' && com[k] != ','){
                    nr++;
                    if(isNaN(com[k]) == false && Number.isInteger(+com[k]) == true && nr == 1){
                        val = parseInt(com[k]);
                    }else{
                        val_gr = com[k];
                    }
                }
            }
            if(val == null && nr == 1){
                console.log("ERROR LINE " +(i+1) +": BACKWARD parameter 1 requires a number, you wrote " +val_gr);
            }else if(nr != 1){
                console.log("ERROR LINE " +(i+1) +": BACKWARD has 1 parameters, you wrote " +nr);
            }else{
                x = x - val * Math.cos(r * Math.PI / 180);
                y = y - val * Math.sin(r * Math.PI / 180);
                x = Math.round(x);
                y = Math.round(y);
                console.log("OK " +x +", " +y +", " +r);
            }
        
        }else if(c == 'TURN'){
            var dir = null;
            var val = null;
            var val_gr;
            var nr = 0;
            for(var k = j; k < com.length; k++){
                if(com[k] != '' && com[k] != ','){
                    nr++;
                    if(dir == null && nr == 1){
                        dir = com[k];
                    }
                    if(isNaN(com[k]) == false && Number.isInteger(+com[k]) == true && nr == 2 && dir != null){
                        val = parseInt(com[k]);
                    }else{
                        val_gr = com[k];
                    }
                }
            }
            if(dir != "left" && dir != "right" && nr == 2){
                console.log("ERROR LINE " +(i+1) +": TURN parameter 1 requires a left/right, you wrote " +dir);
            }else if(val == null && nr == 2){
                console.log("ERROR LINE " +(i+1) +": TURN parameter 2 requires a number, you wrote " +val_gr);
            }else if(nr != 2){
                console.log("ERROR LINE " +(i+1) +": TURN has 2 parameters, you wrote " +nr);
            }else if (dir == "left"){
                if(r + val > 360){
                    r = r + val - 360;
                }else{
                    r = r + val;
                }
                console.log("OK " +x +", " +y +", " +r);
            }else if (dir == "right"){
                if(r - val < 0){
                    r = 360 - (val - r);
                }else{
                    r = r - val;
                }
                console.log("OK " +x +", " +y +", " +r);
            }
        
        }else if(c == 'JUMP'){
            var poz_x = null;
            var poz_y = null;
            var x_gr = null;
            var y_gr = null;
            var nr = 0;
            for(var k = j; k < com.length; k++){
                if(com[k] != '' && com[k] != ','){
                    nr++;
                    if(poz_x == null && nr == 1){
                        if(com[k] == '~'){
                            poz_x = com[k];
                        }else if(isNaN(com[k]) == false && Number.isInteger(+com[k]) == true){
                            poz_x = parseInt(com[k]);
                        }else{
                            x_gr = com[k];
                        }
                    }
                    if(isNaN(com[k]) == false && Number.isInteger(+com[k]) == true && nr == 2 && poz_x != null){
                        poz_y = parseInt(com[k]);
                    }else if(com[k] == '~' && nr ==2 && poz_x != null){
                        poz_y = com[k];
                    }else if(poz_x != null && nr ==2){
                        y_gr = com[k];
                    }
                }
            }
            if(x_gr != null && nr ==2){
                console.log("ERROR LINE " +(i+1) +": JUMP parameter 1 requires a number, you wrote " +x_gr);
            }else if(y_gr != null && nr ==2){
                console.log("ERROR LINE " +(i+1) +": JUMP parameter 2 requires a number, you wrote " +y_gr);
            }else if(nr != 2){
                console.log("ERROR LINE " +(i+1) +": JUMP has 2 parameters, you wrote " +nr);
            }else{
                if(poz_x != "~" && poz_y != "~"){
                    x = parseInt(poz_x);
                    y = parseInt(poz_y);
                }else if(poz_x == "~" && poz_y != "~"){
                    y = parseInt(poz_y);
                }else if(poz_x != "~" && poz_y == "~"){
                    x = parseInt(poz_x);
                }
                console.log("OK " +x +", " +y +", " +r);
            }
        
        }
    }
}