use serde::Serialize;
use ts_rs::TS;

// Profile-related events
// > token_updated
#[derive(Serialize, Clone, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="../../../libs/types/generated/backend_to_frontend/events/TokenReceivedEventPayload.ts")]
pub struct TokenReceivedEventPayload {
  pub id: String,
  pub profile_id: String,
}

#[derive(Serialize, Clone, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to="../../../libs/types/generated/backend_to_frontend/events/ProfileUpdatedEventPayload.ts")]
pub struct ProfileUpdatedEventPayload {
  pub id: String,
  pub email: String,
  pub avatar: String,
  pub username: String,
}
