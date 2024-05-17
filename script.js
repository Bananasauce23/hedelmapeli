document.getElementById("pelaa").addEventListener("click", pelaa)
document.getElementById("panos1").addEventListener("click", muutaPanos)
document.getElementById("panos2").addEventListener("click", muutaPanos)
document.getElementById("panos3").addEventListener("click", muutaPanos)


var kuva0=new Image()
kuva0.src="imgs/cherry.png"
var kuva1=new Image()
kuva1.src="imgs/pear.png"
var kuva2=new Image()
kuva2.src="imgs/melon.png"
var kuva3=new Image()
kuva3.src="imgs/apple.png"
var kuva4=new Image()
kuva4.src="imgs/seven.png"

var panos = 1
var raha = 50
var valittulukko = ""
var rivi = []
var maaralista = {"kirsikat": 0, "päärynät": 0, "melonit": 0, "omenat": 0, "seiskat": 0}
var voitto = 0
var kierros = 1

function muutaPanos(){
    if (event.currentTarget.id == "panos1"){
        panos = 1
    }
    else if (event.currentTarget.id == "panos2"){
        panos = 2
    }
    else if (event.currentTarget.id == "panos3"){
        panos = 3
    }
    document.getElementById("panos").innerHTML = "PANOS: " + panos + "€"

    document.getElementById("kirsikkavoitto").innerHTML = panos * 3
    document.getElementById("paarynavoitto").innerHTML = panos * 4
    document.getElementById("melonivoitto").innerHTML = panos * 5
    document.getElementById("seiskavoitto3").innerHTML = panos * 5
    document.getElementById("omenavoitto").innerHTML = panos * 6
    document.getElementById("seiskavoitto4").innerHTML = panos * 10
}

function lukitse(){
    valittulukko = event.currentTarget.id
    document.getElementById(valittulukko).src = "imgs/locked.png"
    kierros = 2
}

function pelaa(){
    maaralista = {"kirsikat": 0, "päärynät": 0, "melonit": 0, "omenat": 0, "seiskat": 0}
    voitto = 0

    if (raha - panos < 0){
        alert("Ei tarpeeksi rahaa")
    }
    else{
        raha -= panos

        var randomkuva1 = Math.round(Math.random()*4)
        var randomkuva2 = Math.round(Math.random()*4)
        var randomkuva3 = Math.round(Math.random()*4)
        var randomkuva4 = Math.round(Math.random()*4)

        if (document.getElementById("lukko1").src.includes("unlocked")){
            rivi[0] = randomkuva1
            document.images["kuvat1"].src=eval("kuva"+randomkuva1+".src")
        }
        if (document.getElementById("lukko2").src.includes("unlocked")){
            rivi[1] = randomkuva2
            document.images["kuvat2"].src=eval("kuva"+randomkuva2+".src")
        }
        if (document.getElementById("lukko3").src.includes("unlocked")){
            rivi[2] = randomkuva3
            document.images["kuvat3"].src=eval("kuva"+randomkuva3+".src")
        }
        if (document.getElementById("lukko4").src.includes("unlocked")){
            rivi[3] = randomkuva4
            document.images["kuvat4"].src=eval("kuva"+randomkuva4+".src")
        }

        document.getElementById("lukko1").addEventListener("click", lukitse)
        document.getElementById("lukko2").addEventListener("click", lukitse)
        document.getElementById("lukko3").addEventListener("click", lukitse)
        document.getElementById("lukko4").addEventListener("click", lukitse)

        rivi.forEach(luku => {
            if (luku == 0){
                maaralista["kirsikat"] += 1
            }
            else if (luku == 1){
                maaralista["päärynät"] += 1
            }
            else if (luku == 2){
                maaralista["melonit"] += 1
            }
            else if (luku == 3){
                maaralista["omenat"] += 1
            }
            else if (luku == 4){
                maaralista["seiskat"] += 1
            }
        });

        tarkastaVoitot()

        if (kierros == 2 || voitto > 0){
            document.getElementById("lukko1").removeEventListener("click", lukitse)
            document.getElementById("lukko2").removeEventListener("click", lukitse)
            document.getElementById("lukko3").removeEventListener("click", lukitse)
            document.getElementById("lukko4").removeEventListener("click", lukitse)

            document.getElementById("lukko1").src = "imgs/unlockeddark.png"
            document.getElementById("lukko2").src = "imgs/unlockeddark.png"
            document.getElementById("lukko3").src = "imgs/unlockeddark.png"
            document.getElementById("lukko4").src = "imgs/unlockeddark.png"

            kierros = 1
        }
        else{
            document.getElementById("lukko1").src = "imgs/unlocked.png"
            document.getElementById("lukko2").src = "imgs/unlocked.png"
            document.getElementById("lukko3").src = "imgs/unlocked.png"
            document.getElementById("lukko4").src = "imgs/unlocked.png"
        }

        document.getElementById("rahamaara").innerHTML = "RAHAA: " + raha + "€"
    }
}

function tarkastaVoitot(){
    if (Object.values(maaralista)[0] == 4){
        voitto = parseInt(document.getElementById("kirsikkavoitto").innerHTML)
        raha += voitto
    }
    else if (Object.values(maaralista)[1] == 4){
        voitto = parseInt(document.getElementById("paarynavoitto").innerHTML)
        raha += voitto
    }
    else if (Object.values(maaralista)[2] == 4){
        voitto = parseInt(document.getElementById("melonivoitto").innerHTML)
        raha += voitto
    }
    else if (Object.values(maaralista)[3] == 4){
        voitto = parseInt(document.getElementById("omenavoitto").innerHTML)
        raha += voitto
    }
    else if (Object.values(maaralista)[4] == 3){
        voitto = parseInt(document.getElementById("seiskavoitto3").innerHTML)
        raha += voitto
    }
    else if (Object.values(maaralista)[4] == 4){
        voitto = parseInt(document.getElementById("seiskavoitto4").innerHTML)
        raha += voitto
    }

    if (voitto > 0){
        document.getElementById("voittotarkastus").innerHTML = "Voitit " + voitto + "€!"
    }
    else{
        document.getElementById("voittotarkastus").innerHTML = "Ei voittoa"
    }
    if (kierros > 2){
        kierros = 1
    }
}