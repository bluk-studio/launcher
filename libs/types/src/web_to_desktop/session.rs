use ts_rs::TS;
use serde::{Serialize, Deserialize};

// Launcher session object
// @returned by
// [API] POST {apiPrefix}/session
// [API] GET {apiPrefix}/session/{sessionId}
#[derive(Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="typescript/web_to_desktop/session/LauncherSession.ts")]
pub struct LauncherSession {
  id: i32,
}