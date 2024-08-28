use napi_derive::napi;
use rfd::FileDialog as Dialog;
use std::path::PathBuf;

#[napi]
pub struct FileDialog {
    dialog: Dialog,
}

#[napi]
impl FileDialog {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            dialog: Dialog::new(),
        }
    }

    #[napi]
    pub fn pick_file(&self) -> Option<String> {
        let _file = self.dialog.clone().pick_file();

        let x = _file.map(|s| s.to_str().expect("").to_string());

        x
    }

    #[napi]
    pub fn pick_folder(&self) -> Option<String> {
        self.dialog.clone().pick_folder().map(to_str)
    }

    #[napi]
    pub fn pick_folders(&self) -> Option<Vec<String>> {
        self.dialog.clone().pick_folders().map(|vec| {
            vec.into_iter()
                .map(|path| path.to_string_lossy().into_owned())
                .collect()
        })
    }

    #[napi]
    pub fn save_file(&self) -> Option<String> {
        self.dialog.clone().save_file().map(to_str)
    }

    #[napi]
    pub fn add_filter(&mut self, name: String, extensions: Vec<String>) -> &Self {
        self.dialog = self.dialog.clone().add_filter(name, &extensions);

        self
    }

    #[napi]
    pub fn pick_files(&self) -> Option<Vec<String>> {
        let x = self.dialog.clone().pick_files();

        x.map(|vec| {
            vec.into_iter()
                .map(|path| path.to_string_lossy().into_owned())
                .collect()
        })
    }

    #[napi]
    pub fn set_file_name(&mut self, file_name: String) -> &Self {
        self.dialog = self.dialog.clone().set_file_name(file_name);

        self
    }

    #[napi]
    pub fn set_title(&mut self, title: String) -> &Self {
        self.dialog = self.dialog.clone().set_title(title);

        self
    }

    #[napi]
    pub fn set_can_create_directories(&mut self, can: bool) -> &Self {
        self.dialog = self.dialog.clone().set_can_create_directories(can);

        self
    }

    #[napi]
    pub fn set_directory(&mut self, path: String) -> &Self {
        let x = self.dialog.clone().set_directory(path);

        self.dialog = x;

        self
    }
}

fn to_str(path: PathBuf) -> String {
    path.to_str().expect("hoge").to_string()
}
