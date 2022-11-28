use std::sync::Mutex;

pub struct ConfigState {
  pub auth_url: String,
  pub launcher_api_url: String,
  pub server_port: u16
}

impl ConfigState {
  pub fn default(version: String) -> Self {
      Self {
        auth_url: format!("https://apis.odzi.dog/bluk/launcher/{}/auth/token", version).to_string(),
        launcher_api_url: format!("https://apis.odzi.dog/bluk/launcher/{}", version).to_string(),
        server_port: 9871
      }
  }
}