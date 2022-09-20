# A-Level Project
### Introduction 🖥
This is a portfolio project for the A-Level practical course, and shows off what we can do in a given language. It focuses on our ability to create meaningful documentation and code. We have Gitbook pages to show our background thinking and preparation, and we have a GitHub repository to show the code. These two are linked into one GitHub repository accessible at https://github.com/Marling-CS-Projects/Jack-Foot-ALevel-Project. We have a Gitbook page for the project at https://marling-school.gitbook.io/jack-foot-project-2022-23/VXGCAnvrgxRbaVGYo22T/.

---
### What have I done? ⚙
I chose to create a game similar to space invaders, which I thought would have enough complexity and challenges to be able to make over a few months. I used Phaser 3 initially, but found there was a lack of documentation and reliable sources of code. Thus I switched to Phaser 2/CE which has been released for far longer and has more documentation available.

Furthermore I've been updating my Gitbook page with the code and documentation, and adding more content. This is a running log of what I've done so far and helps me to keep track of what I've done and what I'm working on and what I've learned. It also allows me to plan out what I'm going to do next, with tests and checklists.

We're also using cycles like you would in industry such as the SCRUM methodology. This allows me to plan what I'm going to do that day, work on that piece of code, and then at the end of the day evaluate what I've done and what I need to do next. This is a great way to keep track of what I'm doing and what I need to do.

---
### How to install and run the game? 💾

1. First you will need to download the files from the 'releases' tab. The only version at the moment is the pre-release version designed for testing.

2. Install the files, and use your command line to find the root folder of the game (./). To do this type ``ls`` to identify files you're currently able to access, ``cd {filename}`` to move into the specified file, E.G. ``cd downloads`` will move you to the downloads folder on your computer. Use ``cd`` to move back in the directory. **Note that you will need to install the source code as a zip, which is one of the options given, and then unzip that before you will be able to this step!**

3. Next once you reach the root folder (the one with src, package.json, and config.xml for example in), you will want to type ``npm i`` or ``npm install``. This will install the packages needed to run the game.

4. Finally type ``npm run dev``. This will start the local websever using webpack to launch the game in your browser.
