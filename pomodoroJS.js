// Aggiunge un listener per l'evento di submit al form con id 'studyForm'
document.getElementById('studyForm').addEventListener('submit', function(event) {
  // Previene il comportamento di default dell'evento, che sarebbe il submit del form
  event.preventDefault();

  let isStudy = true;   //if true, it's time to study, if false, take a nap

  function ticTacMF(time){

  //cambia il titolo della pagina a seconda del se il timer è per studiare o riposare
  if(isStudy == true){
    document.getElementById("kek").innerText = "Study Time";
  }
  else{
    document.getElementById("kek").innerText = "Relax Time";
  }

  // Converte i minuti in secondi per l'animazione
  let animationDuration = time * 60; 

  // Imposta l'animazione con durata dinamica per gli pseudo-elementi ::before e ::after
  let styleSheet = document.createElement("style");
  styleSheet.innerText = `
    .blob::before, .blob::after {
      animation: rotate ${animationDuration}s linear forwards;
    }
  `;
  // Aggiunge il foglio di stile creato all'elemento head del documento
  document.head.appendChild(styleSheet);

  // Calcola il tempo di fine aggiungendo la durata del timer al tempo corrente
  let endTime = Date.now() + studyTime * 60000; 

  // Imposta un intervallo che si ripete ogni secondo
  let interval = setInterval(function() {
    let now = Date.now();
    // Calcola la differenza tra il tempo di fine e il tempo corrente
    let difference = endTime - now;
    
    // Se la differenza è minore o uguale a 0, ferma l'intervallo
    if (difference <= 0) {
      clearInterval(interval);
      // Pulisce il testo dell'elemento con id 'timerDisplay'
      document.getElementById('timerDisplay').textContent = ""; 
      isStudy = !isStudy;
      return;
    }

    // Calcola i minuti e i secondi rimanenti
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    //modifica il testo del pomodoro a seconda del tempo rimasto
    /*
    >5 minuti: verde
    >1 minuto, <5 minuti: arancione
    <1 minuto: rosso, ingrandisce progressivamente il testo
    */
    let cronometro = document.getElementById("timerDisplay");
    if(minutes>5){
      cronometro.style.color="green";
    }else if(minutes >=1) {
      cronometro.style.color="orange";
    }else{
      let tmpSize = cronometro.style.fontSize;
      tmpSize = tmpSize + (tmpSize/60);
      cronometro.style.color="red";
      cronometro.style.fontSize = "2." + (6-seconds/10)  + "em";
      console.log("current font size is " + tmpSize);
    }
    // Visualizza il tempo rimanente nell'elemento con id 'timerDisplay'
   //padstart aggiunge uno zero prima della stringa se non raggiunge almeno una lunghezza di 2
    document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
    
  }


  function reset(){
    document.getElementById("timerDisplay").textContent = "00:00";
    document.getElementById("timerDisplay").innerText = "00:00";
    document.head.removeChild(document.head.lastElementChild);
  }

  // Ottiene il tempo di studio inserito dall'utente e lo converte in un numero intero, su base 10
  let studyTime = parseInt(document.getElementById('studyTime').value, 10);
  let restTime = parseInt(document.getElementById("pausina").value, 10 );
  let i = parseInt(document.getElementById("cicli").value, 10);
  for(let j=0; j<i; j++){ //for point 3, still to be perfected
    setTimeout(()=>{
      ticTacMF(studyTime);
      setTimeout(reset, studyTime*60000);
      setTimeout(ticTacMF, studyTime*60000+100, restTime); //executes rest time after 1 sec
      //once the function terminates, it changes the time
      setTimeout(reset, (studyTime+restTime)*60000+200);
  },((studyTime+restTime)*60000+300)*j)
    
  }
  
  });



