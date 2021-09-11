import React, { useState } from 'react';

class Metronome extends React.Component {
  audioContext = null;
  notesInQueue = [];
  currentQuarterNote = 0;
  lookahead = 25;
  scheduleAheadTime = 0.1;
  nextNoteTime = 0.0;
  isRunning = false;
  intervalID = null;

  constructor(props) {
    super(props);

    this.state = {
      tempo: 120,
    };
  }

  handleTempo(e) {
    this.setState({
      tempo: e.target.value,
    });
  }

  nextNote() {
      // Advance current note and time by a quarter note (crotchet if you're posh)
      var secondsPerBeat = 60.0 / this.state.tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
      this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time

      this.currentQuarterNote++;    // Advance the beat number, wrap to zero
      if (this.currentQuarterNote == 4) {
        this.currentQuarterNote = 0;
      }
  }

  scheduleNote(beatNumber, time) {
      // push the note on the queue, even if we're not playing.
      this.notesInQueue.push({ note: beatNumber, time: time });

      // create an oscillator
      const osc = this.audioContext.createOscillator();
      const envelope = this.audioContext.createGain();

      osc.frequency.value = (beatNumber % 4 == 0) ? 1000 : 800;
      envelope.gain.value = 1;
      envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
      envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

      osc.connect(envelope);
      envelope.connect(this.audioContext.destination);

      osc.start(time);
      osc.stop(time + 0.03);
  }

  scheduler() {
        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
          this.scheduleNote(this.currentQuarterNote, this.nextNoteTime);
          this.nextNote();
        }
    }

    start() {
        if (this.isRunning) return;

        if (this.audioContext == null)
        {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        this.isRunning = true;

        this.currentQuarterNote = 0;
        this.nextNoteTime = this.audioContext.currentTime + 0.05;

        this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
    }

    stop() {
        this.isRunning = false;

        clearInterval(this.intervalID);
    }

    startStop() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }

  render() {
    return (
      <>
        <button onClick={() => {this.startStop()}}>play pause</button>
        <input type="range" id="tempo" min="30" max="280" value={this.state.tempo} onChange={(e) => this.handleTempo(e)}></input>
        <div>{this.state.tempo}</div>
      </>
    )
  }
}

export default Metronome;