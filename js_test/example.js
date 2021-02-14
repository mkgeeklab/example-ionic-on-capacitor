const onLoad = () => {
  let mapDiv = document.getElementById('test');
  mapDiv.addEventListener('click', () => {
  mapDiv.visible = !mapDiv.visible;
    console.log(`mapDiv.visible ---> ${mapDiv.visible}`);
  });

  const observer = new MutationObserver((mutation) => {
    console.log('mutation', mutation);
  });
  observer.observe(mapDiv, {
    childList: true,
    subtree: true
  });

  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    if (mapDiv.parentElement) {
      mapDiv.parentElement.removeChild(mapDiv);
    } else {
      document.body.appendChild(mapDiv);
    }
  });
};

window.addEventListener('load', onLoad);
