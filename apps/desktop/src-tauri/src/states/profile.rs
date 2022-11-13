use reqwest::{self, Error};
use std::{sync::{Mutex, Arc}};

use crate::web_responses::LauncherProfile;

pub struct ProfileState {
  pub token: Mutex<Option<String>>,
  pub user: Mutex<Option<LauncherProfile>>,
}

impl ProfileState {
  pub fn default() -> Self {
    Self {
      token: Mutex::new(Option::None),
      user: Mutex::new(Option::None)
    }
  }
}