package com.google.android.exoplayer.demo;

public interface AudioClipListener
{
    public int heard(short [] audioData, int sampleRate);
    public int heardFrequency(short [] audioData, int sampleRate);
}
