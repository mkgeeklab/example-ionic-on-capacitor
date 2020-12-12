package io.ionic.starter;

import android.content.res.Configuration;
import android.os.Bundle;

import androidx.annotation.NonNull;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;

import java.util.ArrayList;

import plugins.google.maps.capacitor.OpenGoogleMaps;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);

      add(OpenGoogleMaps.class);
    }});
  }

  @Override
  public void onConfigurationChanged(@NonNull Configuration newConfig) {
    super.onConfigurationChanged(newConfig);

    PluginHandle pluginHandle = this.bridge.getPlugin("OpenGoogleMaps");
    OpenGoogleMaps openGoogleMaps = (OpenGoogleMaps)pluginHandle.getInstance();
    openGoogleMaps.onConfigurationChanged(newConfig);
  }
}
