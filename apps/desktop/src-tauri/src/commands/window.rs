use tauri::Window;

#[tauri::command]
pub fn show_window(window: Window) {
  if !window.is_visible().unwrap() {
    window.show();
  };
}
