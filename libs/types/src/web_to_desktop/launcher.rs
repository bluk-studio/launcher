use ts_rs::TS;
use serde::{Serialize, Deserialize};

// Launcher Config object
// @returned by
// [API] GET {apiPrefix}/launcher/{version}
#[derive(Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="typescript/web_to_desktop/launcher/LauncherConfig.ts")]
pub struct LauncherConfig {
  id: String,
  version: String,
  logotype: String,
}