#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// Sub-modules
mod commands;
mod states;
mod tray;
mod server;
mod events;

use server::initialize_server;

use states::{config::{ConfigState}};
use tauri::Manager;
use tray::get_default_menu;

// Application startup
fn main() {
  // Starting tauri application
  tauri::Builder::default()
    .system_tray(get_default_menu())
    .manage(ConfigState::default("v1".to_string()))
    .invoke_handler(tauri::generate_handler![
      commands::authorization::start_authorization,
      commands::config::fetch_config,
      commands::window::show_window,
    ])
    .setup(|mut_app| {
      // Initializing local web-server
      initialize_server(mut_app.app_handle());
      
      Ok(())
    })
    .plugin(tauri_plugin_persisted_scope::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
