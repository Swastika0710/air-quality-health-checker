const citySelect=document.getElementById('city');
const checkButton=document.getElementById('check');
const resultSection=document.getElementById('result');
const errorEl=document.getElementById('error');
const locationEl=document.getElementById('location');
const aqiEl=document.getElementById('aqi');
const pm25El=document.getElementById('pm25');
const pm10El=document.getElementById('pm10');
const no2El=document.getElementById('no2');
const o3El=document.getElementById('o3');
const adviceEl=document.getElementById('advice');
let forecastChart;

function guidance(aqi){
  if(aqi<=20) return 'Air quality is good. It is suitable for outdoor activities for most people.';
  if(aqi<=40) return 'Air quality is fair. Most people can continue normal outdoor activities.';
  if(aqi<=60) return 'Air quality is moderate. People sensitive to air pollution may wish to reduce long or intense outdoor activity.';
  if(aqi<=80) return 'Air quality is poor. Consider reducing prolonged or strenuous outdoor activity, especially if you have breathing or heart conditions.';
  if(aqi<=100) return 'Air quality is very poor. Reduce outdoor activity where possible and follow advice from local health services.';
  return 'Air quality is extremely poor. Avoid prolonged outdoor activity and seek advice from local health services if you feel unwell.';
}

function colourFor(aqi){
  if(aqi<=20) return '#15803d';
  if(aqi<=40) return '#65a30d';
  if(aqi<=60) return '#d97706';
  if(aqi<=80) return '#ea580c';
  if(aqi<=100) return '#dc2626';
  return '#7f1d1d';
}

async function checkAirQuality(){
  errorEl.classList.add('hidden');
  const [latitude,longitude]=citySelect.value.split(',');
  const city=citySelect.options[citySelect.selectedIndex].text;
  checkButton.disabled=true;
  checkButton.textContent='Checking...';
  try{
    const url=`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi,pm2_5,pm10,nitrogen_dioxide,ozone&hourly=pm2_5&forecast_days=1&timezone=auto`;
    const response=await fetch(url);
    if(!response.ok) throw new Error('Unable to retrieve air-quality data.');
    const data=await response.json();
    const current=data.current;
    const aqi=Math.round(current.european_aqi);
    locationEl.textContent=city;
    aqiEl.textContent=aqi;
    aqiEl.style.color=colourFor(aqi);
    pm25El.textContent=current.pm2_5.toFixed(1)+' µg/m³';
    pm10El.textContent=current.pm10.toFixed(1)+' µg/m³';
    no2El.textContent=current.nitrogen_dioxide.toFixed(1)+' µg/m³';
    o3El.textContent=current.ozone.toFixed(1)+' µg/m³';
    adviceEl.textContent=guidance(aqi);
    resultSection.classList.remove('hidden');
    const labels=data.hourly.time.map(t=>new Date(t).getHours()+':00');
    if(forecastChart) forecastChart.destroy();
    forecastChart=new Chart(document.getElementById('forecastChart'),{
      type:'line',
      data:{labels,datasets:[{label:'PM2.5 forecast',data:data.hourly.pm2_5,borderColor:'#12808a',backgroundColor:'rgba(18,128,138,.15)',fill:true,tension:.3}]},
      options:{plugins:{legend:{display:false}},scales:{y:{title:{display:true,text:'PM2.5 (µg/m³)'}}}}
    });
  }catch(error){
    errorEl.textContent=error.message;
    errorEl.classList.remove('hidden');
    resultSection.classList.add('hidden');
  }finally{
    checkButton.disabled=false;
    checkButton.textContent='Check air quality';
  }
}

checkButton.addEventListener('click',checkAirQuality);