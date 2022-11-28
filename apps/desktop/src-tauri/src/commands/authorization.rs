use webbrowser::open;
use tauri::{State};
use ts_rs::TS;
use crate::{states::{config::{ConfigState}}};

#[tauri::command]
pub fn start_authorization(config: State<ConfigState>, auth_type: AuthorizationType, email: Option<String>) -> String {
  let redirect_url: String = format!("http://localhost:{}/auth/token", config.server_port.clone());

  let auth_url: String;
  match auth_type {
    AuthorizationType::EMAIL => {
      auth_url = format!("{}?redirectUrl={}&type={}&email={}", config.auth_url.clone(), redirect_url.clone(), auth_type.to_string(), email.unwrap());
    }
    _ => {
      auth_url = format!("{}?redirectUrl={}&type={}", config.auth_url.clone(), redirect_url.clone(), auth_type.to_string());
    }
  }

  // Opening web-browser
  open(auth_url.as_str());

  // Returning auth_url
  auth_url
}

// todo
// move to ../../libs/types crate
#[derive(serde::Deserialize, TS)]
#[ts(export, export_to="../../../libs/types/generated/backend_to_frontend/auth/AuthorizationType.ts")]
pub enum AuthorizationType {
  EMAIL,
  DISCORD,
  GOOGLE,
}

impl AuthorizationType {
  fn to_string(&self) -> String {
      match &self {
        AuthorizationType::DISCORD => {
          "discord".to_string()
        }
        AuthorizationType::EMAIL => {
          "email".to_string()
        }
        AuthorizationType::GOOGLE => {
          "google".to_string()
        }
      }
  }
}