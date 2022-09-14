use tauri::{State, Window};

use ts_rs::TS;
use crate::states::config::{StaticConfigState};
use webbrowser::open;

//
// Fetch config
//
#[tauri::command]
pub fn fetch_config(config: State<StaticConfigState>, window: Window) -> FetchConfigResponse {
  // Showing our main application window
  if !window.is_visible().unwrap() {
    window.show();
  };
  
  // todo
  // Fetching config information from Bluk Launcher API

  // Generating new LauncherSession

  // Returning config
  FetchConfigResponse {
    launcher_session: Option::None,
    logotype: "https://res.cloudinary.com/lococovu-cdn/image/upload/v1636815887/bluk-studio-white.svg".to_string()
  }
}

// todo
// move to ../../libs/types crate
#[derive(serde::Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="../../../libs/types/typescript/backend_to_frontend/config/FetchConfigResponse.ts")]
pub struct FetchConfigResponse {
  launcher_session: Option<String>,
  logotype: String,
}

//
// Start authorization
//
#[tauri::command]
pub fn start_authorization(config: State<StaticConfigState>, auth_type: AuthorizationType, email: Option<String>) -> String {
  let auth_url: String;
  match auth_type {
    AuthorizationType::EMAIL => {
      auth_url = format!("{}?type={}&email={}", config.auth_url.clone(), auth_type.to_string(), email.unwrap());
    }
    _ => {
      auth_url = format!("{}?type={}", config.auth_url.clone(), auth_type.to_string());
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
#[ts(export, export_to="../../../libs/types/typescript/backend_to_frontend/auth/AuthorizationType.ts")]
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