#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// Sub-modules
mod commands;
mod states;
mod tray;
mod api;

// Imports
use states::config::{MutableConfigState, StaticConfigState};
use tray::get_default_menu;

// Application startup
fn main() {
  // Starting web server


  // Starting tauri application
  tauri::Builder::default()
    .system_tray(get_default_menu())
    .manage(StaticConfigState::default("bluk-launcher-1.0.0".to_string()))
    .manage(MutableConfigState::default())
    .invoke_handler(tauri::generate_handler![
      commands::initialization::start_authorization,
      commands::initialization::fetch_config
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
