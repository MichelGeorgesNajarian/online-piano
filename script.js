const KeyState = {
  PRESSED: "pressed",
  PLAYED: "played",
  RELEASED: "released",
};

const keyMapping = {
  KeyA: { note: "C", srcFile: "audio/c.mp3", state: KeyState.RELEASED },
  KeyW: { note: "C#", srcFile: "audio/csharp.mp3", state: KeyState.RELEASED },
  KeyS: { note: "D", srcFile: "audio/d.mp3", state: KeyState.RELEASED },
  KeyE: { note: "D#", srcFile: "audio/dsharp.mp3", state: KeyState.RELEASED },
  KeyD: { note: "E", srcFile: "audio/e.mp3", state: KeyState.RELEASED },
  KeyF: { note: "F", srcFile: "audio/f.mp3", state: KeyState.RELEASED },
  KeyT: { note: "F#", srcFile: "audio/fsharp.mp3", state: KeyState.RELEASED },
  KeyG: { note: "G", srcFile: "audio/g.mp3", state: KeyState.RELEASED },
  KeyY: { note: "G#", srcFile: "audio/gsharp.mp3", state: KeyState.RELEASED },
  KeyH: { note: "A", srcFile: "audio/a.mp3", state: KeyState.RELEASED },
  KeyU: { note: "A#", srcFile: "audio/asharp.mp3", state: KeyState.RELEASED },
  KeyJ: { note: "B", srcFile: "audio/b.mp3", state: KeyState.RELEASED },
};

const validKeyCodes = Object.keys(keyMapping);

validKeyCodes.forEach((keyCode) => {
  const srcFile = keyMapping[keyCode].srcFile;
  if (!srcFile) {
    console.warn(`No audio file found for key: ${keyCode}`);
    return;
  }
  keyMapping[keyCode].audio = new Audio(srcFile);
});

const playAudio = (audio) => {
  audio.currentTime = 0; // resetting the audio to the beginning
  audio.play();
};

const playPressedKeysAudio = () => {
  validKeyCodes.forEach((keyCode) => {
    if (keyMapping[keyCode].state === KeyState.PRESSED) {
      if (!keyMapping[keyCode].srcFile) {
        console.warn(`No audio file found for key: ${keyCode}`);
        return;
      }
      keyMapping[keyCode].state = KeyState.PLAYED;
      playAudio(keyMapping[keyCode].audio);
    }
  });
};

const toggleKeyState = (keyCode) => {
  if (!validKeyCodes.includes(keyCode)) {
    console.warn(`Invalid key code: ${keyCode}`);
    return;
  }
  const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!keyElement) {
    console.warn(`No key element found for key code: ${keyCode}`);
    return;
  }

  if (keyMapping[keyCode].state !== KeyState.RELEASED) {
    keyElement.classList.add("active");
  } else {
    keyElement.classList.remove("active");
  }
};

const handlePlayEvent = (keyCode) => {
  keyMapping[keyCode].state =
    keyMapping[keyCode].state === KeyState.RELEASED
      ? KeyState.PRESSED
      : keyMapping[keyCode].state;
  toggleKeyState(keyCode);
  playPressedKeysAudio();
};

const handleReleaseEvent = (keyCode) => {
  keyMapping[keyCode].state = KeyState.RELEASED;
  toggleKeyState(keyCode);
};

window.addEventListener("pointerdown", (pointerDownEvt) => {
  if (pointerDownEvt.button !== 0) {
    return;
  }
  const keyPressed =
    pointerDownEvt.target.getAttribute("data-key") ||
    pointerDownEvt.target.parentElement.getAttribute("data-key"); // need to add this in case the user clicks on the text inside the key
  if (!keyPressed) {
    return;
  }
  handlePlayEvent(keyPressed);
});

const cancelPointerEvents = (pointerEvent) => {
  if (pointerEvent.button !== 0) {
    return;
  }
  const keyPressed =
    pointerEvent.target.getAttribute("data-key") ||
    pointerEvent.target.parentElement.getAttribute("data-key"); // need to add this in case the user clicks on the text inside the key
  if (!keyPressed) {
    return;
  }
  handleReleaseEvent(keyPressed);
};

window.addEventListener("pointerup", (pointerUpEvt) => {
  cancelPointerEvents(pointerUpEvt);
});

window.addEventListener("pointercancel", (pointerCancelEvt) => {
  cancelPointerEvents(pointerCancelEvt);
});

window.addEventListener("keydown", (keyEvent) => {
  // Handle keydown events for piano keys
  if (!validKeyCodes.includes(keyEvent.code)) {
    return;
  }
  handlePlayEvent(keyEvent.code);
});

window.addEventListener("keyup", (keyEvent) => {
  // Handle keyup events for piano keys
  if (!validKeyCodes.includes(keyEvent.code)) {
    return;
  }
  handleReleaseEvent(keyEvent.code);
});
