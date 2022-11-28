use tauri::{State, Window};

use ts_rs::TS;
use crate::{states::{config::{ConfigState}}};

//
// Fetch config
//
#[tauri::command]
pub fn fetch_config(config: State<ConfigState>, window: Window) -> FetchConfigResponse {
  // Returning config
  FetchConfigResponse {
    logotype: "https://res.cloudinary.com/lococovu-cdn/image/upload/v1636815887/bluk-studio-white.svg".to_string()
  }
}

// todo
// move to ../../libs/types crate
#[derive(serde::Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="../../../libs/types/generated/backend_to_frontend/config/FetchConfigResponse.ts")]
pub struct FetchConfigResponse {
  logotype: String,

}