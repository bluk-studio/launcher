use ts_rs::TS;
use serde::{Serialize, Deserialize};

// Token
// @returned by
// [API] GET {apiPrefix}/launcher/{version}/token/{token}
#[derive(Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="../../../libs/types/generated/web_to_desktop/token/LauncherToken.ts")]
pub struct LauncherToken {
  pub id: String,
  pub profile_id: String,
  pub issued: u32,
  pub last_used: u32,
}

#[derive(Serialize, Deserialize, TS, Clone)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="../../../libs/types/generated/web_to_desktop/profile/LauncherProfile.ts")]
pub struct LauncherProfile {
  pub id: String,
  pub identity_id: String,
  pub email: String,
  pub avatar: String,
  pub username: String,
}

// Launcher Config object
// @returned by
// [API] GET {apiPrefix}/launcher/{version}
#[derive(Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="../../../libs/types/generated/web_to_desktop/launcher/LauncherConfig.ts")]
pub struct LauncherConfig {
  id: String,
  version: String,
  logotype: String,
}