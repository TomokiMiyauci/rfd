use napi_derive::napi;
use rfd::{
    FileDialog as Dialog, MessageButtons as _MessageButtons, MessageDialog as _MessageDialog,
    MessageDialogResult as _MessageDialogResult, MessageLevel as _MessageLevel,
};
use std::path::PathBuf;

#[napi]
pub struct MessageDialog {
    dialog: _MessageDialog,
}

#[napi]
pub struct FileDialog {
    dialog: Dialog,
}

#[napi]
pub struct MessageButtons {
    kind: String,
    yes: Option<String>,
    no: Option<String>,
    ok: Option<String>,
    cancel: Option<String>,
}

#[napi]
impl MessageButtons {
    #[napi]
    pub fn ok() -> MessageButtons {
        MessageButtons {
            kind: "Ok".to_string(),
            yes: None,
            no: None,
            ok: None,
            cancel: None,
        }
    }

    #[napi]
    pub fn yes_no() -> MessageButtons {
        MessageButtons {
            kind: "YesNo".to_string(),
            yes: None,
            no: None,
            ok: None,
            cancel: None,
        }
    }

    #[napi]
    pub fn ok_cancel() -> MessageButtons {
        MessageButtons {
            kind: "OkCancel".to_string(),
            yes: None,
            no: None,
            ok: None,
            cancel: None,
        }
    }

    #[napi]
    pub fn yes_no_cancel() -> MessageButtons {
        MessageButtons {
            kind: "YesNoCancel".to_string(),
            yes: None,
            no: None,
            ok: None,
            cancel: None,
        }
    }

    #[napi]
    pub fn ok_custom(ok: String) -> MessageButtons {
        MessageButtons {
            kind: "OkCustom".to_string(),
            yes: None,
            no: None,
            ok: Some(ok),
            cancel: None,
        }
    }

    #[napi]
    pub fn ok_cancel_custom(ok: String, cancel: String) -> MessageButtons {
        MessageButtons {
            kind: "OkCancelCustom".to_string(),
            yes: None,
            no: None,
            ok: Some(ok),
            cancel: Some(cancel),
        }
    }

    #[napi]
    pub fn yes_no_cancel_custom(yes: String, no: String, cancel: String) -> MessageButtons {
        MessageButtons {
            kind: "YesNoCancelCustom".to_string(),
            yes: Some(yes),
            no: Some(no),
            ok: None,
            cancel: Some(cancel),
        }
    }
}

#[napi(string_enum)]
pub enum MessageLevel {
    Info,
    Warning,
    Error,
}

#[napi]
pub struct MessageDialogResult {
    pub kind: String,
    pub value: Option<String>,
}

#[napi]
impl MessageDialog {
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            dialog: _MessageDialog::new(),
        }
    }

    #[napi]
    pub fn set_level(&mut self, level: MessageLevel) -> &Self {
        let level = match level {
            MessageLevel::Error => _MessageLevel::Error,
            MessageLevel::Info => _MessageLevel::Info,
            MessageLevel::Warning => _MessageLevel::Warning,
        };

        self.dialog = self.dialog.clone().set_level(level);

        self
    }

    #[napi]
    pub fn set_title(&mut self, title: String) -> &Self {
        self.dialog = self.dialog.clone().set_title(title);

        self
    }

    #[napi]
    pub fn set_description(&mut self, text: String) -> &Self {
        self.dialog = self.dialog.clone().set_description(text);

        self
    }

    #[napi]
    pub fn set_buttons(&mut self, btn: &MessageButtons) -> &Self {
        let btn: _MessageButtons = match btn.kind.as_str() {
            "Ok" => _MessageButtons::Ok,
            "YesNo" => _MessageButtons::YesNo,
            "OkCancel" => _MessageButtons::OkCancel,
            "YesNoCancel" => _MessageButtons::YesNoCancel,
            "OkCustom" => _MessageButtons::OkCustom(btn.ok.as_ref().unwrap().to_string()),
            "OkCancelCustom" => _MessageButtons::OkCancelCustom(
                btn.ok.as_ref().unwrap().to_string(),
                btn.cancel.as_ref().unwrap().to_string(),
            ),
            "YesNoCancelCustom" => _MessageButtons::YesNoCancelCustom(
                btn.yes.as_ref().unwrap().to_string(),
                btn.no.as_ref().unwrap().to_string(),
                btn.cancel.as_ref().unwrap().to_string(),
            ),
            _ => panic!("Unknown message button kind"),
        };

        self.dialog = self.dialog.clone().set_buttons(btn);

        self
    }

    #[napi]
    pub fn show(&self) -> MessageDialogResult {
        match self.dialog.clone().show() {
            _MessageDialogResult::Ok => MessageDialogResult {
                kind: "Ok".to_string(),
                value: None,
            },
            _MessageDialogResult::Yes => MessageDialogResult {
                kind: "Yes".to_string(),
                value: None,
            },
            _MessageDialogResult::No => MessageDialogResult {
                kind: "No".to_string(),
                value: None,
            },
            _MessageDialogResult::Cancel => MessageDialogResult {
                kind: "Cancel".to_string(),
                value: None,
            },
            _MessageDialogResult::Custom(value) => MessageDialogResult {
                kind: "Custom".to_string(),
                value: Some(value),
            },
        }
    }
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
        let path = self.dialog.clone().pick_file();

        path.map(to_str)
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
        let paths = self.dialog.clone().pick_files();

        paths.map(|vec| {
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
        self.dialog = self.dialog.clone().set_directory(path);

        self
    }
}

fn to_str(path: PathBuf) -> String {
    path.to_str().expect("Invalid UTF-8 sequence").to_string()
}
