use deno_bindgen::deno_bindgen;
use rfd::FileDialog;
use serde_json::json;
use serde_json::Value;
use std::ffi::c_char;
use std::ffi::CString;
use std::path::Path;
use std::str;

#[deno_bindgen]
pub struct Dialog {
    dialog: FileDialog,
}

#[deno_bindgen]
impl Dialog {
    #[constructor]
    fn new() -> Dialog {
        Dialog {
            dialog: FileDialog::new(),
        }
    }

    pub fn pick_file(&self) -> *mut c_char {
        let path_buf = self.dialog.clone().pick_file();

        let result = match path_buf {
            Some(path) => json!({
              "success": true,
              "data": path
            }),
            None => json!({
              "success": false
            }),
        };

        let c_string = CString::new(result.to_string()).unwrap();

        c_string.into_raw()
    }

    pub fn pick_files(&self) -> *mut c_char {
        let files = self.dialog.clone().pick_files();

        let result = match files {
            Some(path) => json!({
              "success": true,
              "data": path
            }),
            None => json!({
              "success": false
            }),
        };

        let c_string = CString::new(result.to_string()).unwrap();

        c_string.into_raw()
    }

    pub fn pick_folder(&self) -> *mut c_char {
        let path_buf = self.dialog.clone().pick_folder();

        let result = match path_buf {
            Some(path) => json!({
              "success": true,
              "data": path
            }),
            None => json!({
              "success": false
            }),
        };

        let c_string = CString::new(result.to_string()).unwrap();

        c_string.into_raw()
    }

    pub fn pick_folders(&self) -> *mut c_char {
        let path_buf = self.dialog.clone().pick_folders();

        let result = match path_buf {
            Some(path) => json!({
              "success": true,
              "data": path
            }),
            None => json!({
              "success": false
            }),
        };

        let c_string = CString::new(result.to_string()).unwrap();

        c_string.into_raw()
    }

    pub fn save_file(&self) -> *mut c_char {
        let path_buf = self.dialog.clone().save_file();

        let result = match path_buf {
            Some(path) => json!({
              "success": true,
              "data": path
            }),
            None => json!({
              "success": false
            }),
        };

        let c_string = CString::new(result.to_string()).unwrap();

        c_string.into_raw()
    }

    pub fn set_directory(&mut self, p: &[u8]) {
        let path_str = str::from_utf8(p).unwrap();
        let path = Path::new(path_str);

        self.dialog = self.dialog.clone().set_directory(path);
    }

    pub fn set_file_name(&mut self, file_name: &[u8]) {
        let file_name = str::from_utf8(file_name).unwrap();

        self.dialog = self.dialog.clone().set_file_name(file_name);
    }

    pub fn add_filter(&mut self, extensions: &[u8]) {
        // let name: &str = str::from_utf8(name).expect("Invalid UTF-8 sequence");
        let json = str::from_utf8(extensions).unwrap();
        let parsed: Value = serde_json::from_str(json).unwrap();

        let x = parsed.as_array().unwrap();
        let y: Vec<&str> = x.iter().filter_map(|v| v.as_str()).collect();

        self.dialog = self.dialog.clone().add_filter("", &y);
    }

    pub fn set_title(&mut self, title: &[u8]) {
        let title = str::from_utf8(title).unwrap();

        self.dialog = self.dialog.clone().set_title(title);
    }

    pub fn set_can_create_directories(&mut self, can: &[u8]) {
        let json = str::from_utf8(can).unwrap();
        let parsed: Value = serde_json::from_str(json).unwrap();
        let can = parsed.as_bool().unwrap();

        self.dialog = self.dialog.clone().set_can_create_directories(can)
    }
}
