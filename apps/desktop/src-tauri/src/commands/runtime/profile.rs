use std::sync::Mutex;

use reqwest::{StatusCode};
use tauri::{State, Manager};

use ts_rs::TS;
use crate::{states::{config::{StaticConfigState}, profile::{ProfileState}}, web_responses::LauncherProfile, events::ProfileUpdatedEventPayload};

#[derive(serde::Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="../../../libs/types/generated/backend_to_frontend/profile/UpdateProfileResponse.ts")]
pub struct UpdateProfileResponse {
  pub id: String,
}

#[tauri::command]
pub fn update_profile(app: tauri::AppHandle, config: State<StaticConfigState>, profile: State<'_, ProfileState>, profile_id: String) -> UpdateProfileResponse {
  // Getting profile information from token's profileId
  match reqwest::blocking::get(format!("{}/profile/{}", config.launcher_api_url.clone(), profile_id.clone())) {
    Ok(response) => {
      match response.status() {
        StatusCode::OK => {
          // Parsing response
          let launcher_profile: LauncherProfile = serde_json::from_str(response.text().unwrap().as_str()).unwrap();

          // Updating our profile state
          *profile.user.lock().unwrap() = Option::Some(launcher_profile.clone());

          // Emitting profile_updated event
          app.emit_all("profile_updated", ProfileUpdatedEventPayload {
            id: launcher_profile.id.clone(),
            email: launcher_profile.email.clone(),
            avatar: launcher_profile.avatar.clone(),
            username: launcher_profile.username.clone(),
          });

          UpdateProfileResponse {
            id: launcher_profile.id
          }
        }
        _ => {
          println!("Response text: {:?}", response.text());
          panic!("Fuck 2");
        }
      }
    }
    Err(_) => {
      panic!("Fuck");
    }
  }
}
