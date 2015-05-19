package com.google.android.exoplayer.demo;
import java.util.*;
import android.util.Log;


import com.google.android.exoplayer.demo.AudioClipListener;
import com.google.android.exoplayer.demo.player.FFT;

public class LoudNoiseDetector implements AudioClipListener
{
    private static final String TAG = "LoudNoiseDetector";
    private LinkedList<Integer> frequencyHistory;
    private double volumeThreshold;
private double rangeThreshold;
    public static final int DEFAULT_LOUDNESS_THRESHOLD = 2000;

    public LoudNoiseDetector()
    {
        volumeThreshold = DEFAULT_LOUDNESS_THRESHOLD;
        frequencyHistory = new LinkedList<Integer>();
        // pre-fill so modification is easy
        for (int i = 0; i < 10; i++)
        {
            frequencyHistory.add(Integer.MAX_VALUE);
        }
        rangeThreshold = 1000;
    }

    public LoudNoiseDetector(double volumeThreshold)
    {
        this.volumeThreshold = volumeThreshold;
        frequencyHistory = new LinkedList<Integer>();
        // pre-fill so modification is easy
        for (int i = 0; i < 10; i++)
        {
            frequencyHistory.add(Integer.MAX_VALUE);
        }
        this.rangeThreshold = 1000;
    }

    @Override
    public int heard(short[] data, int sampleRate)
    {

        double currentVolume = rootMeanSquared(data);

        if (currentVolume > volumeThreshold)
        {
            Log.d(TAG, "heard");

        }

        return (int)currentVolume;
    }

    private double rootMeanSquared(short[] nums)
    {
        double ms = 0;
        for (int i = 0; i < nums.length; i++)
        {
            ms += nums[i] * nums[i];
        }
        ms /= nums.length;
        return Math.sqrt(ms);
    }
    private static int zeroCrossing(int sampleRate, short [] audioData) {
        int numSamples = audioData.length;
        int numCrossing = 0;
        for (int p = 0; p < numSamples - 1; p++) {
            if ((audioData[p] > 0 && audioData[p + 1] <= 0) ||
                    (audioData[p] < 0 && audioData[p + 1] >= 0)) {
                numCrossing++;
            }
        }

        float numSecondsRecorded = (float) numSamples / (float) sampleRate;
        float numCycles = numCrossing / 2;
        float frequency = numCycles / numSecondsRecorded;

        return (int) frequency;
    }
    public int heardFrequency(short[] audioData, int sampleRate)
    {
        int trim = (int)(Math.log(audioData.length)/Math.log(2));
        int used = (int)Math.pow(2,trim);
        double[] a = new double[used];
        Complex[] fftTempArray = new Complex[used];
        Complex[] ana;
        for(int i = 0; i < used; i++)
        {a[i] = (double) (audioData[i]/32768.0);
            fftTempArray[i] = new Complex(a[i],0);
        }
        ana=FFT.fft(fftTempArray);
        double[] freX = new double[ana.length];
        double[] ampY = new double[ana.length];
        double max = -1.0;
        double freM = 0.0;
        for(int j = 0; j < freX.length; j++)
        {
            ampY[j]=ana[j].abs();
            freX[j]=ComputeFrequency(ampY[j],sampleRate);
            if(max < ampY[j])
            {
                max = ampY[j];
                freM = freX[j];
            }
        }
        int frequency = zeroCrossing(sampleRate, audioData);
        return (int) freM;
        //return frequency;
    }
    private double ComputeFrequency(double arrayIndex, int rate) {
        return ((1.0 * rate) / (1.0 * 100)) * arrayIndex;
    }
}
