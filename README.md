# Detox
[Detox](https://github.com/wix/Detox) is a gray box end-to-end testing and automation framework for mobile apps.
This PR helps to learn how to setup and use detox in simple project.

`NOTE: This project is built on Expo and use jest as the test runner`

# About
There are 4 branches in this repository. You can choose based on your need.
1. [`master`](https://github.com/carissacks/detox101/tree/master)
    - Contains only the project, without detox. 
    - Expo managed flow
    - TODO: eject from expo, run `detox init`, config detox, setup android, make end-to-end test
2. [`setup`](https://github.com/carissacks/detox101/tree/setup)
    - Contains project with detox and jest-circus.
    - Bare workflow
    - Detox runs well in ios
    - TODO: setup android, make end-to-end test
3. [`setup-android`](https://github.com/carissacks/detox101/tree/setup-android)
    - Contains project with detox and jest-circus.
    - Bare workflow.
    - Android detox setup is added.
    - Detox runs well in android and ios
    - TODO: make end-to-end test
4. [`test`](https://github.com/carissacks/detox101/tree/test)
    - Contains project with detox and jest-circus
    - Detox runs well in android and ios
    - Test only passed on Android (intentional)

# App
https://user-images.githubusercontent.com/46070698/154253596-c48bfa54-fafb-4a9b-8089-be183708b2af.mp4

---------

# How to Run
## Prerequisites
1. Homebrew
2. Simulator (ios) and Emulator (android)
3. Node.js
4. Yarn (optional, but might need to add some additional packages if you use npm)
5. Detox-cli
6. Expo-cli (optional if you only want to run the test, then it's fine)

## Installation
Here are some commands you might need. Check the full documentation [here](https://wix.github.io/Detox/docs/introduction/getting-started)
1. Node
`brew install node`
2. Yarn
`npm install -g yarn`
3. Detox-cli
`yarn global add detox-cli`
4. Expo-cli
`yarn global add expo-cli`

## Setting up Emulator (WIP)
You can follow the full instructions from [react-native documentation](https://reactnative.dev/docs/environment-setup#installing-dependencies) or [expo documentation](https://docs.expo.dev/workflow/android-studio-emulator/)
1. Ensure the java version installed is jdk v 8 (1.8) or 11, as suggested in react native documentation
```
java --version //to check
brew install --cask adoptopenjdk/openjdk/adoptopenjdk8 // to install jdk 8
```
2. Add this setup in `.bask_profile` or `.zshenv`
```
export ANDROID_HOME=$HOME/Library/Android/sdk
path=("$ANDROID_HOME/emulator" "$ANDROID_HOME/tools" "$ANDROID_HOME/tools/bin" "$ANDROID_HOME/platform-tools" "$path[@]")
```
3. Open `Android Studio` and create new AVD (Android Virtual Device) if you haven't.
- More options > AVD Manager > Create Virtual Device

## Clone the project
- You can run the command below to clone the master branch
```
git clone https://github.com/carissacks/detox101.git
```
- Open the project using this command or you can open it manually
```
cd detox101 && code .
```

### Other Branches
- Follow these instructions below to clone the other three branches
1. Create new branch
```
git checkout -b <new-branch-name>
```
2. Rebase from the repo
```
git pull origin <repo-branch-name> --rebase
```
3. Don't forget to go back to master before cloning other branches
```
git checkout master
```


## Install Dependencies
- Run this command in `detox101` to install all packages needed in the project
```
yarn
```

## Choose Your Device
You can choose the type of devices you want to run the end-to-end tests with.
- It is optional for the simulator, since we start with all types of devices
- However it is mandatory for the emulator, because your avd name is possible different than mine.
- Change the device type in `.detoxrc.json`
```
  "devices": {
    "simulator": {
      "type": "ios.simulator",
      "device": {
        "type": <iphone type>
      }
    },
    "emulator": {
      "type": "android.emulator",
      "device": {
        "avdName": <android type name>
      }
    }
  },
```

## Run in IOS
`NOTE: Doesn't work in master branch`

1. Install package for ios native code
```
npx pod-install
```
- If something went wrong, try checking the `command line tools` in xcode.
xcode > preferences > locations > command line tools > should be filled with the xcode version

2. Build the app for end-to-end test. -c stands for --configuration
```
detox build -c ios
```

3. Run the test
```
detox test -c ios
```
- If `applesimutils` is missing, run these commands below to install. 
To see more, click [here](https://github.com/wix/AppleSimulatorUtils)
```
brew tap wix/brew
brew install applesimutils
```
4. Open simulator
The end-to-end test might run but the simulator is not showing because it runs in headless mode. Run this command to open the simulator
```
open -a Simulator.app
```

## Run in Android
`NOTE: Doesn't work in master branch nor setup branch`

1. Build the app for end-to-end test. -c stands for --configuration
```
detox build -c android
```

2. Run the test
```
detox test -c android
```

----

# Let's Practice 
They said practice makes perfect!
You can check the full documentations [here](https://wix.github.io/Detox/docs/api/matchers) for all the matchers, actions, and what to expect.

## First Case (in `test` branch)
1. Login Scene
    - Empty field: Show "Tell me who you are."
    - Wrong credentials or unregistered username: Show "Sorry, we have never met before"
    - Right username with right credentials (name: detox101, password: 123): Navigate to Home Scene
2. Home Scene
    - Show "Welcome back, detox101" 


## Second Case
1. Login Scene
    - Right username with right credentials:
      - Could be one of the followings -format: name/password
      - john/doe, rex orange/sunflower, simple/plan
    - Navigate to Home Scene
2. Home Scene
    - Show "Welcome back, {name}", depends on the username
    - Find 'End of list'
    - Sign out



----

# Notes
- You need to re-run `detox build` after changing the project code, otherwise the changes won't be updated on your test app.
- Check the PRs to know more about the code and feel free to ask questions :smile:
