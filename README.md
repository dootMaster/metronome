# Leslie's Metronome

This responsive React application allows musicians to keep time as they practice. This uses a combination of `setTimeout` and Web Audio API's currentTime method in order to keep consistent and usable time. I built this metronome in September 2021 when I was curious about Web Audio API.
This took me 2 days to build, and I **[deployed it to gitPages here](https://dootmaster.github.io/metronome/)**.

## Contents
* [Stack](#Stack)
* [Setup](#Setup)
* [Instructions](#Instructions)
* [Observations](#Observations)

## Stack

- ReactJS
- Web Audio API

- Development
  - Webpack/Babel
  - ExpressJS

## Setup
Install and run this app locally on your machine.

- `npm install`
- `npm start` to serve the app via Express on port 3000.

- Development
  - `npm run dev` to start with nodemon
  - `npm run build` to compile and bundle

## Instructions
- The play button starts and stops the metronome. Once started, the display will show the count, and the bpm and accent will be minimized below. Stopping will show the bpm in the main display again.
- The number buttons will increment or decrement the bpm by the value stated on the button.
- The `acc` buttons will adjust where you hear the accented beat.
- The slider at the bottom adjusts the gain of the oscillator.

## Observations

When programming a metronome with JavaScript, the function we would normally reach for might be `setInterval`. Unfortunately, `setInterval` on its own is unable to keep time that is consistent enough for practice due to the fact that `setTimeout` and `setInterval` time can be influenced by other processes in the Javascript event loop. Even without musical training, our ears can hear differences in the milliseconds, and `setTimeout` can be off by at least 40ms. A metronome relying on `setTimeout` will also be susceptible to timing inaccuracies upon resizing of the window and other events.

In order to keep accurate time, `setTimeout` is instead responsible for scheduling upcoming audio events using Web Audio API's `currentTime` method. The `currentTime` is a highly accurate "property representing a hardware timestamp" [according to MDN](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/currentTime), and can have accuracy down to **20us** (microseconds) and lower.

A good analogy to represent what's happening in code:
- You hire a worker to create your schedule for the next day.
- They are very good at their job, and always finish their work sometime between 1:00PM and 5:00PM, but you never know exactly when.
- The exact time they finish their work doesn't matter because the schedule created for the next day is very accurate.
- You follow the schedule and the day goes well, and your worker again creates the schedule for the following day.
