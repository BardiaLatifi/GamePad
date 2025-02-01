const menus = {
  main: {
    title: "MAIN MENU",
    items: [
      { label: "Games", target: "games" },
      { label: "Settings", target: "settings" },
      { label: "About This Project", target: "about" }
    ],
    parent: null
  },
  games: {
    title: "GAMES",
    items: [
      { label: "Title-1", action: "startGame" },
      { label: "Tile-2", action: "startGame" },
      { label: "Title-3", action: "startGame" },
      { label: "Back", action: "back" }
    ],
    parent: "main"
  },
  settings: {
    title: "SETTINGS",
    items: [
      { label: "Controller Settings", target: "controllerSettings" },
      { label: "Themes", target: "themes" },
      { label: "Audio", target: "audio" },
      { label: "Back", action: "back" }
    ],
    parent: "main"
  },
  controllerSettings: {
    title: "CONTROLLER SETTINGS",
    items: [
      { label: "Button Style", action: "changeBtnStyle" },
      { label: "Color", action: "changeColor" },
      { label: "Back", action: "back" }
    ],
    parent: "settings"
  },
  themes: {
    title: "THEMES",
    items: [
      { label: "Menu Themes", action: "changeMenuThemes" },
      { label: "Back", action: "back" }
    ],
    parent: "settings"
  },
  audio: {
    title: "AUDIO SETTINGS",
    items: [
      { label: "Mute", action: "toggleMute" },
      { label: "Sounds Effects", action: "changeSoundsEffects" },
      { label: "Music", action: "changeMusic" },
      { label: "Back", action: "back" }
    ],
    parent: "settings"
  },
  about: {
    title: "ABOUT THIS PROJECT",
    items: [
      { label: "How to use GamePad?", action: "howToUse" },
      { label: "Who am I & what I'm Doing?", target: "Info" },
      { label: "Back", action: "back" }
    ],
    parent: "main"
  },
  Info: {
    title: "PROJECT INFO",
    items: [
      { label: "Back", action: "back" }
    ],
    parent: "about"
  }
};