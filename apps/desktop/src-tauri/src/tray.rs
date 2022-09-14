use tauri::{SystemTray, CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};

pub fn get_default_menu() -> SystemTray {
  let default_menu = SystemTrayMenu::new()
    .add_item(CustomMenuItem::new("test".to_string(), "Test"))
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(CustomMenuItem::new("test2".to_string(), "Test 2"));

  SystemTray::new().with_menu(default_menu)
}