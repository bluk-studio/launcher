use std::thread;

use tauri::{AppHandle, Manager};
use tiny_http::{Server, Response};
use url::Url;

use crate::states::config::ConfigState;
use crate::events::TokenReceivedEventPayload;

pub fn initialize_server(app: AppHandle) {
    // Config state
    let config = app.state::<ConfigState>();

    // Starting lightweight web-server, that'll listen for auth response
    let server_port: u16 = config.server_port.clone();

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

                        // Sending token_received event
                        app.emit_all("token_received", TokenReceivedEventPayload { id: pair.1.to_string() }).unwrap();
                        
                        // Closing server
                        request.respond(Response::from_string("Authorization successful")).unwrap();

                        // Breaking loop (because we found token information - we do not need
                        // anything else)
                        break;
                    }
                };
            };
        }
    });    
}