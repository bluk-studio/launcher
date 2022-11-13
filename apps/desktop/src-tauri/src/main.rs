#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// Sub-modules
mod commands;
mod states;
mod tray;
mod api;
mod events;
mod web_responses;

use std::thread;

use events::TokenReceivedEventPayload;
use reqwest::{StatusCode, Url};
// Imports
use states::{config::{MutableConfigState, StaticConfigState}, profile::{ProfileState}};
use tauri::Manager;
use tauri::State;
use tiny_http::{Server, Response};
use tray::get_default_menu;
use web_responses::LauncherToken;

// Application startup
fn main() {
  // Starting tauri application
  tauri::Builder::default()
    .system_tray(get_default_menu())
    .manage(StaticConfigState::default("v1".to_string()))
    .manage(MutableConfigState::default())
    .manage(ProfileState::default())
    .invoke_handler(tauri::generate_handler![
      commands::initialization::start_authorization,
      commands::initialization::fetch_config,
      commands::runtime::profile::update_profile
    ])
    .setup(|mut_app| {
      // Config state
      let config = mut_app.state::<StaticConfigState>();

      // Starting lightweight web-server, that'll listen for auth response
      let server_port: u16 = config.server_port.clone();
      let app = mut_app.app_handle();

      thread::spawn(move || {
        let server = Server::http(format!("0.0.0.0:{}", server_port.clone())).unwrap();
      
        // Processing requests
        for request in server.incoming_requests() {
          // Parsing request and trying to get auth token
          if request.url().starts_with("/auth/token") {
            // Getting auth token from query parameters
            let parsed_url = Url::parse(format!("http://localhost:3000{}", request.url()).as_str()).unwrap();
            let query_pairs = parsed_url.query_pairs();

            for pair in query_pairs {
              if pair.0 == "token" {
                // Fetching token information
                match reqwest::blocking::get(format!("https://apis.odzi.dog/bluk/launcher/v1/token/{}", pair.1.clone())) {
                  Ok(response) => {
                    // Working with response
                    match response.status() {
                      StatusCode::OK => {
                        // Parsing response
                        let token: LauncherToken = serde_json::from_str(response.text().unwrap().as_str()).unwrap();

                        // Sending token_received event
                        app.emit_all("token_received", TokenReceivedEventPayload { id: token.id, profile_id: token.profile_id }).unwrap();
                        
                        // Closing server
                        request.respond(Response::from_string("Authorization successful")).unwrap();
                      }
                      _ => {
                        println!("Something else happened!");
                      }
                    };
                  }
                  Err(_) => {
                    println!("Error!");
                  }
                };

                // Breaking loop (because we found token information - we do not need
                // anything else)
                break;
              }
            };
          };
        }
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
