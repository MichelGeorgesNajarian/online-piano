# Online Piano

A one-octave piano (C to B, including sharps) built with plain HTML, CSS and JavaScript. Play it by clicking the keys or with your computer keyboard.

## The exercise

This project is a practice run of a sample front-end interview question I found online: **"Build a playable piano in the browser using only vanilla HTML, CSS and JavaScript."** The question forbids frameworks, libraries and build tools, so it tests DOM layout, event handling and a bit of state management with nothing to lean on.

It was done under mock-interview conditions:

- **Limited time.** One timeboxed session, like a live coding round or take-home. The aim was a working, readable solution, not a polished product.
- **No online resources.** No documentation lookups, Stack Overflow, tutorials or copied snippets. Everything comes from what I already knew, which is why the CSS hand-writes its column classes instead of pulling in Bootstrap.
- **Vanilla HTML, CSS and JS only, as the question requires.** No React or other framework, no CSS library, no npm packages and no build step: just three files opened directly in a browser.

## Running it

No install needed. Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server
# then open http://localhost:8000
```

Some browsers block audio until the page has been clicked or a key has been pressed once.

## Controls

The keyboard layout copies the one most DAWs use: the home row plays white keys, and the row above it plays black keys.

| Key | Note | Key | Note |
| --- | ---- | --- | ---- |
| `A` | C    | `W` | C#   |
| `S` | D    | `E` | D#   |
| `D` | E    |     |      |
| `F` | F    | `T` | F#   |
| `G` | G    | `Y` | G#   |
| `H` | A    | `U` | A#   |
| `J` | B    |     |      |

## How it works

### Layout (`index.html`, `styles.css`)

- The keyboard has **two rows stacked in the same CSS grid cell**: white keys underneath, black keys on top at 60% height.
- Each black key takes one white-key-width slot and is narrowed with `transform: scaleX(0.5)`, so it sits over the gap between two white keys. Its label is scaled back with `scaleX(2)` so the text isn't squashed.
- A hidden `blank-key` fills the gap between D# and F#, where a real piano has no black key.
- The black-key row has `pointer-events: none` and each black key turns it back on. Clicks between black keys then reach the white keys underneath.
- The footer uses a small 12-column grid (`.col-1` to `.col-12`), modelled on Bootstrap and written by hand because plain CSS has no loops.

### Behaviour (`script.js`)

- `keyMapping` maps each keyboard `code` to its note and sample file, plus a state.
- Each key is in one of three states: `RELEASED`, `PRESSED` or `PLAYED`. Holding a key fires repeated `keydown` events, and these states make sure the note plays only once per press: `RELEASED → PRESSED → PLAYED` on `keydown`, then back to `RELEASED` on `keyup`.
- Pressing a key adds an `active` class to it, so it looks pressed while held.
- Every press creates a new `Audio` object, so quick repeats and chords overlap instead of cutting each other off.

## Audio samples

The 12 samples in `audio/` came from screen recordings of [Synthesia](https://synthesiagame.com/), one note per recording. The audio was extracted with `ffmpeg`, which:

1. dropped the video track,
2. cut the silence before each note so it plays the moment a key is pressed,
3. kept about one second of each note with a short fade-out,
4. raised every note by the same amount so their volumes match,
5. encoded the result as 192 kbps MP3.

The raw `.mp4` recordings are git-ignored. Only the extracted `.mp3` files are committed.

## Possible next steps

These were out of scope for the timebox:

- Preload the samples (or use the Web Audio API) to cut delay on the first play.
- Make the layout responsive. The piano is currently a fixed 1250px wide.
- Add more octaves and octave-shift controls.
- Replace the inline `onclick` attributes with event listeners in `script.js`.
- Add a sustain pedal and fade notes out on key release.

## License

The code is released under the [MIT License](LICENSE). The audio samples are recordings of Synthesia's output, and the MIT license may not cover them.
