use std::sync::Mutex;

pub struct MutableConfigState {
  // Theme-related config
  pub logotype: Mutex<String>,
}

impl MutableConfigState {
  pub fn default() -> Self {
    Self {
      // Default logotype
      logotype: Mutex::new("https://res.cloudinary.com/lococovu-cdn/image/upload/v1636815887/bluk-studio-white.svg".to_string()),
    }
  }
}

pub struct StaticConfigState {
  pub auth_url: String,
  pub launcher_api_url: String,
  pub server_port: u16
}

impl StaticConfigState {
  pub fn default(version: String) -> Self {
      Self {
        auth_url: format!("https://apis.odzi.dog/bluk/launcher/{}/auth/token", version).to_string(),
        launcher_api_url: format!("https://apis.odzi.dog/bluk/launcher/{}", version).to_string(),
        server_port: 9871
      }
  }
}