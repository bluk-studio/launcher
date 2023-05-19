use webbrowser::open;
use tauri::{State};
use ts_rs::TS;
use crate::{states::{config::{ConfigState}}};

#[tauri::command]
pub fn start_authorization(config: State<ConfigState>) -> String {
  let redirect_url: String = format!("http://localhost:{}/auth/token", config.server_port.clone());

  let auth_url: String;
  auth_url = format!("{}?redirectUrl={}", config.auth_url.clone(), redirect_url.clone());

  // Opening web-browser
  open(auth_url.as_str());

  // Returning auth_url
  auth_url
}