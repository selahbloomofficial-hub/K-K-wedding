(() => {
  const snow = document.getElementById("snowfall");
  ["❄","✦","❅","❄","✧","❅","❄","✦","❅","❄","✧","❅","❄","✦","❅","❄","❅","✧"].forEach((glyph,i)=>{
    const flake=document.createElement("span");flake.className="snowflake";flake.textContent=glyph;
    flake.style.setProperty("--left",`${(i*47+9)%100}%`);flake.style.setProperty("--delay",`${-((i*2.7)%18)}s`);flake.style.setProperty("--duration",`${13+(i%7)*2}s`);flake.style.setProperty("--drift",`${((i*29)%120)-60}px`);flake.style.setProperty("--size",`${17+(i%5)*3}px`);snow.appendChild(flake);
  });
  const musicButton=document.getElementById("musicToggle"),musicLabel=musicButton.querySelector(".music-label"),audio=document.getElementById("weddingAudio");let musicOn=false;
  function toggleMusic(on){
    musicOn=on;musicButton.setAttribute("aria-pressed",String(on));musicLabel.textContent=`RIVER IN FLOW · ${on?"ON":"OFF"}`;musicButton.classList.toggle("is-playing",on);
    if(on){audio.volume=.55;audio.play().catch(()=>{musicOn=false;musicButton.setAttribute("aria-pressed","false");musicButton.classList.remove("is-playing");musicLabel.textContent="RIVER IN FLOW · TAP TO PLAY";});}
    else audio.pause();
  }
  musicButton.addEventListener("click",()=>toggleMusic(!musicOn));
  const welcome=document.getElementById("welcome");
  function openSite(){if(welcome.classList.contains("is-opening"))return;welcome.classList.add("is-opening");document.body.classList.add("has-opened");toggleMusic(true);setTimeout(()=>{welcome.hidden=true;document.body.classList.remove("has-welcome");document.getElementById("home").scrollIntoView({behavior:"smooth"});},950);}
  document.getElementById("openInvitation").addEventListener("click",openSite);
  document.getElementById("rsvpForm").addEventListener("submit",e=>{e.preventDefault();const data=new FormData(e.currentTarget),subject=encodeURIComponent("Wedding RSVP — K & K"),body=encodeURIComponent([`Guest name: ${data.get("guestName")}`,`Attendance: ${data.get("attendance")}`,`Number of guests: ${data.get("guestCount")}`,`Wishes for the couple: ${data.get("wish")||"(none)"}`].join("\n"));window.location.href=`mailto:htetthayapekyaw@gmail.com?subject=${subject}&body=${body}`;});
  const countdownTarget=new Date("2026-12-05T11:00:00+09:00").getTime();
  const countdownFields={days:document.getElementById("countDays"),hours:document.getElementById("countHours"),minutes:document.getElementById("countMinutes"),seconds:document.getElementById("countSeconds")};
  function updateCountdown(){
    const remaining=countdownTarget-Date.now();
    if(remaining<=0){Object.values(countdownFields).forEach(field=>field.textContent="00");document.querySelector(".countdown-heading").textContent=remaining< -86400000?"CELEBRATING OUR FOREVER":"TODAY IS THE DAY";return;}
    const days=Math.floor(remaining/86400000),hours=Math.floor(remaining%86400000/3600000),minutes=Math.floor(remaining%3600000/60000),seconds=Math.floor(remaining%60000/1000);
    countdownFields.days.textContent=String(days).padStart(2,"0");countdownFields.hours.textContent=String(hours).padStart(2,"0");countdownFields.minutes.textContent=String(minutes).padStart(2,"0");countdownFields.seconds.textContent=String(seconds).padStart(2,"0");
  }
  updateCountdown();setInterval(updateCountdown,1000);
})();

