/*
 * Copyright (C) 2014 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.google.android.exoplayer.demo;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.MediaController;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.exoplayer.VideoSurfaceView;
import com.google.android.exoplayer.demo.player.DemoPlayer;
import com.google.android.exoplayer.text.SubtitleView;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Timer;
import java.util.TimerTask;

/**
 * An activity that plays media using {@link DemoPlayer}.
 */
public class PlayerActivity extends Activity{
  public Timer timer = new Timer();
  public static final String CONTENT_TYPE_EXTRA = "content_type";
  public static final String CONTENT_ID_EXTRA = "content_id";
  public String textToSaveString = "Hello Android";
  private static final String TAG = "PlayerActivity";

  private static final float CAPTION_LINE_HEIGHT_RATIO = 0.0533f;
  private static final int MENU_GROUP_TRACKS = 1;
  private static final int ID_OFFSET = 2;

  private EventLogger eventLogger;
  private int direction;
  private MediaController mediaController;
  private View debugRootView;
  private View shutterView;
  private VideoSurfaceView surfaceView;
  private TextView debugTextView;
  private TextView playerStateTextView;
  private SubtitleView subtitleView;
  private Button videoButton;
  private Button audioButton;
  private Button textButton;
  private Button retryButton;

  private DemoPlayer player;
  private boolean playerNeedsPrepare;

  private long playerPosition;
  private boolean enableBackgroundAudio;

  private Uri contentUri;
  private int contentType;
  private String contentId;
  private WebView webView;
  // Activity lifecycle
  private static String FILENAME;
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.player_activity);
    Intent intent = getIntent();
    contentUri = intent.getData();
    contentType = intent.getIntExtra(CONTENT_TYPE_EXTRA, DemoUtil.TYPE_gradient);
    contentId = intent.getStringExtra(CONTENT_ID_EXTRA);
    webView = (WebView) findViewById(R.id.surface_view);
    WebSettings webSettings = webView.getSettings();
    webSettings.setJavaScriptEnabled(true);
    webSettings.setBuiltInZoomControls(true);
    webSettings.setLoadWithOverviewMode(true);
    webSettings.setUseWideViewPort(true);
    webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
    webView.addJavascriptInterface(new myJsInterface(this), "MyHandler");
    direction = 0;
    myJsInterface inter = new myJsInterface(this);


    if(contentType == 0 || contentType == 3)
        timer.schedule(new MyTimerTask(), 0, 5000);

      webView.setWebViewClient(new WebViewClient(){
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(webView, url);
            Toast.makeText(getApplicationContext(), "" + url +"", Toast.LENGTH_SHORT).show();
            if(contentType == 0) {
                int a = volumeValue();
                if(a > 10000) {
                    if(direction == 0) {
                        webView.loadUrl("javascript:hBarMove(1)");
                        direction = 1;
                    }else {
                        webView.loadUrl("javascript:hBarMove(0)");
                        direction = 0;
                    }
                   }
            }
            if(contentType == 1){
                FILENAME = "bar2_parameters.txt";
                InputStream inputStream = null;
                try {
                    inputStream = openFileInput(FILENAME);
                } catch (FileNotFoundException e) {
                    callJavaScriptFunctionAndGetResultBack();
                }
                String speed = readFromFile();
                int val1, val2;
                val1 = Integer.parseInt(speed.substring(0, 2));
                val2 = Integer.parseInt(speed.substring(3, 5));
                webView.loadUrl("javascript:changeParameters("+val1+","+val2+")");
                webView.loadUrl("javascript:changeThe();");
            }

            if(contentType == 2){
                FILENAME = "Gradient_Grating_parameters.txt";
                callJavaScriptFunctionAndGetResultBack();
            }
            if(contentType == 3) {
                int a = volumeValue();
                if(a > 10000) {
                    if(direction == 0) {
                        webView.loadUrl("javascript:looming(30, 1)");
                        direction = 1;
                    }else {
                        webView.loadUrl("javascript:looming(30, 0)");
                        direction = 0;
                    }
                }
            }
        }//
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
            Toast.makeText(getApplicationContext(), "Oh no! " + description, Toast.LENGTH_SHORT).show();
        }
    });

    if(contentType == 1){
        webView.loadUrl("file:///android_asset/bar2.html");
    }
    if(contentType == 2){
        webView.loadUrl("file:///android_asset/gradient.html");
    }
    if(contentType == 4){
        webView.loadUrl("file:///android_asset/MovingDot.html");
    }
    if(contentType == 5){
        webView.loadUrl("file:///android_asset/NaturalScene.html");
    }
      DemoUtil.setDefaultCookieManager();
      //Button btnSimple = (Button)this.findViewById(R.id.btnSimple);
      // btnSimple.setOnClickListener(new View.OnClickListener() {
      //    @Override
      //    public void onClick(View view) {

      //     }
      // });

      //String textFromFileString =  readFromFile();

      //if ( textToSaveString.equals(textFromFileString) )
      //    Toast.makeText(getApplicationContext(), "both string are equal", Toast.LENGTH_SHORT).show();
      // else
      //    Toast.makeText(getApplicationContext(), "there is a problem", Toast.LENGTH_SHORT).show();
  }

    public void changeText(String someText){
        Log.v("mylog","changeText is called");
        webView.loadUrl("javascript:document.getElementById('gpa').innerHTML = '<strong>"+someText+"</strong>'");

    }

    public void callJavaScriptFunctionAndGetResultBack(){
        Log.v("mylog","MyActivity.callJavascriptFunction is called");
        webView.loadUrl("javascript:window.MyHandler.setResult(parametersString())");
    }

    public void javascriptCallFinished(final String val){
        Log.v("mylog","MyActivity.javascriptCallFinished is called : " + val);
        Toast.makeText(this, "Recorded the parameters into log file" + val, Toast.LENGTH_SHORT).show();
        this.textToSaveString = val;
    }

    public int volumeValue(){
        AudioClipRecorder ar = new AudioClipRecorder(new LoudNoiseDetector());
        return ar.startRecording();
    }

    private class MyTimerTask extends TimerTask{

        @Override
        public void run() {
            runOnUiThread(new Runnable() {
                @Override

                public void run() {
                    if(contentType == 0) {
                        webView.loadUrl("file:///android_asset/bar.html");
                    }
                    if(contentType == 3) {
                        webView.loadUrl("file:///android_asset/loom.html");
                    }
                }
            });
        }
    }

    public void onBackPressed() {
        if(timer != null) {
            timer.cancel();
            timer.purge();
            timer = null;
        }
        // Otherwise defer to system default behavior.
        super.onBackPressed();
        return;
    }

    private void writeToFile(String data) {
        try {
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(openFileOutput(FILENAME, this.MODE_PRIVATE ));
            outputStreamWriter.write(data);
            outputStreamWriter.close();
        }
        catch (IOException e) {
            Log.e(TAG, "File write failed: " + e.toString());
        }

    }
    private String readFromFile() {

        String ret = "";

        try {
            InputStream inputStream = openFileInput(FILENAME);

            if ( inputStream != null ) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while ( (receiveString = bufferedReader.readLine()) != null ) {
                    stringBuilder.append(receiveString);
                }



                inputStream.close();
                ret = stringBuilder.substring(33, 35) + stringBuilder.substring(43, 46);
            }
        }
        catch (FileNotFoundException e) {
            Log.e(TAG, "File not found: " + e.toString());
        } catch (IOException e) {
            Log.e(TAG, "Can not read file: " + e.toString());
        }

        return ret;
    }

    public class myJsInterface {
        PlayerActivity parentActivity;
        public myJsInterface(PlayerActivity activity) {
            parentActivity = activity;
        }

        public void setResult(String val){
            Log.v("mylog", "JavaScriptHandler.setResult is called : " + val);
            this.parentActivity.javascriptCallFinished(val);
            this.parentActivity.textToSaveString = val;
            System.out.println("textToSaveString" + this.parentActivity.textToSaveString);
            writeToFile(textToSaveString);
        }

    }
}
