//I think that I deserve an A

var deck = []
var playerDeck=[]
var comp1Deck=[]
var comp2Deck=[]
var cardPaths = ["C14.jpg", "C2.jpg","C3.jpg","C4.jpg","C5.jpg","C6.jpg","C7.jpg","C8.jpg","C9.jpg","C10.jpg","C11.jpg","C12.jpg","C13.jpg"]
var playerimgId =["c1p","c2p","c3p","c4p","c5p","c6p","c7p","c8p","c9p","c10p","cJp","cQp","cKp"]
var computer1Id =["c1c1","c2c1","c3c1","c4c1","c5c1","c6c1","c7c1","c8c1","c9c1","c10c1","cJc1","cQc1","cKc1"]
var computer2Id =["c1c2","c2c2","c3c2","c4c2","c5c2","c6c2","c7c2","c8c2","c9c2","c10c2","cJc2","cQc2","cKc2"]
var pairs=[0,0,0]
var num
function shuffle(){
    document.getElementById("restart").disabled=true
    document.getElementById("shuffle").disabled=true
    for (i=0;i<14;i++){
        for(j=1;j<4;j++){
            deck.push(j)
        }
    }
    for (i=0;i<1000;i++){
        var num1=Math.floor(Math.random()*deck.length)
        var num2=Math.floor(Math.random()*deck.length)
        var temp
        temp=deck[num1]
        deck[num1]=deck[num2]
        deck[num2]=temp

    }
    print()
    imgCompare()
}
function populateDeck(){
    document.getElementById("populate").disabled=true
    for(i=0;i<5;i++){
        playerDeck.push(deck[0])
        deck.splice(0,1)
        comp1Deck.push(deck[0])
        deck.splice(0,1)
        comp2Deck.push(deck[0])
        deck.splice(0,1)
    }

    document.getElementById("player").disabled=true
    document.getElementById("comp1").disabled=true
    document.getElementById("comp2").disabled=true
    num=Math.round(Math.random()*2)
    if (num===0){
        document.getElementById("player").disabled=false
    }else if(num===1){
        document.getElementById("comp1").disabled=false
    }else if(num===2){

        document.getElementById("comp2").disabled=false
    }
    //alert(playerDeck)
    //alert(comp1Deck)
    //alert(comp2Deck)
    print()
    imgCompare()
    checkPair()

}
function PlayerTurn() {
    var choice = prompt("What card do you want to call?(a for ace, j for jack,etc)")
    var isInArray = false
    if (choice==="a"){
        choice=1
    }
    if (choice==="j"){
        choice=11
    }
    if (choice==="q"){
        choice=12
    }
    if (choice==="k"){
        choice=13
    }
    for (i = 0; i < playerDeck.length; i++) {

        if (choice == playerDeck[i]) {
            isInArray = true

        }
    }

    if (isInArray) {

        var inComp1 = false
        var inComp2 = false
        var position1
        var position2
        for (i = 0; i < comp1Deck.length; i++) {
            if (choice == comp1Deck[i]) {
                inComp1 = true
                position1=i

            }
        }
        for (i = 0; i < comp2Deck.length; i++) {
            if (choice == comp2Deck[i]) {
                inComp2 = true
                position2=i

            }
        }

        if (inComp1) {
            playerDeck.push(comp1Deck[position1])
            comp1Deck.splice(position1,1)

        }
        if (inComp2){
            playerDeck.push(comp2Deck[position2])
            comp2Deck.splice(position2,1)
        }
        if(inComp1===false && inComp2===false){
            playerDeck.push(deck[0])
            deck.splice(0,1)
        }

    }else{
        alert("You do not have that card")
        PlayerTurn()

    }

    checkPair()
    checkIfLeft()
    print()
    imgCompare()
    checkEnd()
    document.getElementById("player").disabled=true
    document.getElementById("comp1").disabled=false
    document.getElementById("comp2").disabled=true
}
function Computer1Turn(){
    var compChoice=comp1Deck[Math.floor(Math.random()*comp1Deck.length)]
    alert(compChoice)
    var inPlayer=false
    var inComp=false
    var position
    var position1
    for (i = 0; i < playerDeck.length; i++) {
        if (compChoice === playerDeck[i]) {
            inPlayer=true
            position=i
        }

    }
    for (j = 0; j < comp2Deck.length; j++) {
        if (compChoice === comp2Deck[j]) {
            inComp = true
            position1=j
        }
    }
    if(inPlayer){
        comp1Deck.push(playerDeck[position])
        playerDeck.splice(position,1)
    }
    if (inComp){
        comp1Deck.push(comp2Deck[position1])
        comp2Deck.splice(position1,1)
    }

    if (inPlayer===false && inComp===false){
        comp1Deck.push(deck[0])
        deck.splice(0,1)
    }
    checkPair()
    checkIfLeft()
    print()
    imgCompare()
    checkEnd()
    document.getElementById("player").disabled=true
    document.getElementById("comp1").disabled=true
    document.getElementById("comp2").disabled=false
}
function Computer2Turn(){
    var compChoice=comp2Deck[Math.floor(Math.random()*comp2Deck.length)]
    alert(compChoice)
    var inPlayer=false
    var position
    var inComp=false
    var position1
    for (i = 0; i < playerDeck.length; i++) {
        if (compChoice === playerDeck[i]) {
            inPlayer=true
            position=i
        }
    }
    for (j = 0; j < comp1Deck.length; j++) {
        if (compChoice === comp1Deck[j]) {
            inComp = true
            position1=j
        }
    }
    if(inPlayer){
        comp2Deck.push(playerDeck[position])
        playerDeck.splice(position,1)
    }
    if (inComp){
        comp2Deck.push(comp1Deck[position1])
        comp1Deck.splice(position1,1)
    }

    if (inPlayer===false && inComp===false){
        comp2Deck.push(deck[0])
        deck.splice(0,1)
    }
    checkPair()
    checkIfLeft()
    imgCompare()
    print()
    checkEnd()
    document.getElementById("player").disabled=false
    document.getElementById("comp1").disabled=true
    document.getElementById("comp2").disabled=true
}
function checkPair(){
    for (i=0;i<playerDeck.length;i++){
        for (j=0;j<playerDeck.length;j++){
            if (playerDeck[i]===playerDeck[j] && i!==j){
                //alert(0)
                playerDeck.splice(i,1)
                playerDeck.splice(j-1,1)
                pairs[0]=pairs[0]+1
                checkPair()
            }
        }
    }
    for (i=0;i<comp1Deck.length;i++){
        for (j=0;j<comp1Deck.length;j++){
            if (comp1Deck[i]===comp1Deck[j] && i!==j){
                //alert(1)
                comp1Deck.splice(i,1)
                comp1Deck.splice(j-1,1)
                pairs[1]=pairs[1]+1
                checkPair()
            }
        }
    }
    for (i=0;i<comp2Deck.length;i++){
        for (j=0;j<comp2Deck.length;j++){
            if (comp2Deck[i]===comp2Deck[j] && i!==j){
                //alert(2)
                comp2Deck.splice(i,1)
                comp2Deck.splice(j-1,1)
                pairs[2]=pairs[2]+1
                checkPair()
            }
        }
    }
    print()
    imgCompare()
}
function print(){
    document.getElementById("Deck").innerHTML="Deck:"+deck
    //document.getElementById("PlayerDeck").innerHTML="Player Deck:"+playerDeck
    //document.getElementById("Comp1Deck").innerHTML="Computer 1 Deck:"+comp1Deck
    //document.getElementById("Comp2Deck").innerHTML="Computer 2 Deck:"+comp2Deck
    document.getElementById("PlayerPairs").innerHTML="# of Player Pairs: "+pairs[0]
    document.getElementById("Comp1Pairs").innerHTML="# of Computer 1 Pairs: "+pairs[1]
    document.getElementById("Comp2Pairs").innerHTML="# of Computer 2 Pairs: "+pairs[2]

}
function imgCompare(){
    for (i=0;i<13;i++){
        document.getElementById(playerimgId[i]).src=null
        document.getElementById(computer1Id[i]).src=null
        document.getElementById(computer2Id[i]).src=null
    }
    for (i=0;i<playerDeck.length;i++){
        for(j=1;j<14;j++){
            if (playerDeck[i]===j){
                document.getElementById(playerimgId[i]).src=cardPaths[j-1]
            }
        }
    }
    for (i=0;i<comp1Deck.length;i++){
        for(j=1;j<14;j++){
            if (comp1Deck[i]===j){
                document.getElementById(computer1Id[i]).src=cardPaths[j-1]
            }
        }
    }
    for (i=0;i<comp2Deck.length;i++){
        for(j=1;j<14;j++){
            if (comp2Deck[i]===j){
                document.getElementById(computer2Id[i]).src=cardPaths[j-1]
            }
        }
    }
}
function checkIfLeft(){
    if (playerDeck.length===0){
        playerDeck.push(deck[0])
        deck.splice(0,1)
    }
    if (comp1Deck.length===0){
        comp1Deck.push(deck[0])
        deck.splice(0,1)
    }
    if (comp2Deck.length===0){
        comp2Deck.push(deck[0])
        deck.splice(0,1)
    }
}
function restart(){
    deck = []
    playerDeck=[]
    comp1Deck=[]
    comp2Deck=[]
    pairs=[0,0,0]
    document.getElementById("restart").disabled=true
    for (i=0;i<13;i++){
        document.getElementById(playerimgId[i]).src=null
        document.getElementById(computer1Id[i]).src=null
        document.getElementById(computer2Id[i]).src=null
    }
    document.getElementById("player").disabled=false
    document.getElementById("comp1").disabled=false
    document.getElementById("comp2").disabled=false
    document.getElementById("restart").disabled=true
    document.getElementById("shuffle").disabled=false
    document.getElementById("populate").disabled=false
    print()
}
function checkEnd(){
    if(playerDeck[0]===undefined){
        playerDeck.splice(0,1)
    }
    if (comp1Deck[0]===undefined){
        comp1Deck.splice(0,1)
    }
    if (comp2Deck[0]===undefined){
        comp2Deck.splice(0,1)
    }


    if (deck.length===0 && playerDeck.length===0 || deck.length===0 && comp1Deck.length===0 || deck.length===0 && comp2Deck.length===0){
        document.getElementById("restart").disabled=false
        if (pairs[0]>pairs[1] && pairs[0]>pairs[2]){
            alert("Player wins")
        }else if (pairs[1]>pairs[0] && pairs[1]>pairs[2]){
            alert("Computer 1 wins")
        }else if( pairs[2]>pairs[0] && pairs[2]>pairs[1]){
            alert("Computer 2 wins")
        }else(
            alert("Tie")
        )
    }
}