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

const playPressedKeysAudio = () => {
  validKeyCodes.forEach((keyCode) => {
    if (keyMapping[keyCode].state === KeyState.PRESSED) {
      if (!keyMapping[keyCode].srcFile) {
        console.warn(`No audio file found for key: ${keyCode}`);
        return;
      }
      keyMapping[keyCode].state = KeyState.PLAYED;
      playAudio(keyMapping[keyCode].srcFile);
    }
  });
};

const keyClickHandler = (key) => {
  console.log(`Key clicked: ${key}`);
  const keyCode = Object.keys(keyMapping).find(
    (k) => keyMapping[k].note === key,
  );
  if (!keyCode || !keyMapping[keyCode].srcFile) {
    console.warn(`No audio file found for key: ${key}`);
  }
  keyMapping[keyCode].state =  KeyState.PRESSED;
  playPressedKeysAudio();
};

const toggleKeyState = (keyCode) => {
  if (!validKeyCodes.includes(keyCode)) {
    console.warn(`Invalid key code: ${keyCode}`);
    return;
  }
  const keyElement = document.querySelector(
    `.key[data-key="${keyMapping[keyCode].note}"]`,
  );
  if (!keyElement) {
    console.warn(`No key element found for key code: ${keyCode}`);
    return;
  }
  if (keyMapping[keyCode].state === KeyState.PRESSED) {
    keyElement.classList.add("active");
  } else {
    keyElement.classList.remove("active");
  }
};

window.addEventListener("keydown", (keyEvent) => {
  // Handle keydown events for piano keys
  if (!validKeyCodes.includes(keyEvent.code)) {
    return;
  }
  if (!keyMapping[keyEvent.code].srcFile) {
    console.warn(`No audio file found for key: ${keyEvent.code}`);
    return;
  }
  keyMapping[keyEvent.code].state =
    keyMapping[keyEvent.code].state === KeyState.RELEASED
      ? KeyState.PRESSED
      : keyMapping[keyEvent.code].state;
  toggleKeyState(keyEvent.code);
  playPressedKeysAudio();
});

window.addEventListener("keyup", (keyEvent) => {
  // Handle keyup events for piano keys
  if (!validKeyCodes.includes(keyEvent.code)) {
    return;
  }
  if (!keyMapping[keyEvent.code].srcFile) {
    console.warn(`No audio file found for key: ${keyEvent.code}`);
    return;
  }
  keyMapping[keyEvent.code].state = KeyState.RELEASED;

  toggleKeyState(keyEvent.code);
  // Optionally, you can stop the audio or perform other actions on key release
});

const playAudio = (audioFile) => {
  const audio = new Audio(audioFile);
  audio.currentTime = 0; // resetting the audio to the beginning
  audio.play();
};
