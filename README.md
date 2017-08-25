# steam_suite
Set of tools/libraries to make integrating steam, DRM-free games and the concept of basic taste easier.
# Dependencies
This will only work on Linux. You need rofi(available on the AUR, apt-get, and the Fedora repo.) Steam needs to be installed(obviously)
Semaphore, rofi , steam and a steam API key. I highly reccomend starting steam in the background before using these, as otherwise it'll open steam whenever you use them. Run makeallshortcuts from the directory you want the shortcuts to be made(default is ~/Games), and then point gamemenu to that directory(again, default is ~/Games). Run installmenu from anywhere and it should work. I've bound installmenu to $mod+Shift+i and gamemenu to $mod+Shift+g. Rofi can be installed from any good package manager, and semaphore is a node module so just run npm install.
g
