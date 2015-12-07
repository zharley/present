# Present

This is my scaffolding for composing presentations on the [Reveal.js](https://github.com/hakimel/reveal.js/) framework.

## Setup

First, install dependencies (including **Reveal.js**):

    npm install

Next, install [Decktape](https://github.com/astefanutti/decktape) for pixel-perfect export to PDF.

    git clone --depth 1 https://github.com/astefanutti/decktape.git

**Decktape** uses a custom build of [PhantomJS](http://phantomjs.org/). See [Decktape installation](https://github.com/astefanutti/decktape#install) for the appropriate platform-specific version, or the following command for OSX.

    curl -L http://astefanutti.github.io/decktape/downloads/phantomjs-osx-cocoa-x86-64 -o decktape/bin/phantomjs

Make it executable:

    chmod +x decktape/bin/phantomjs

## Reference

To begin working on a new presentation, this creates a new directory containing a Markdown file `slides.md` and a subdirectory for assets.

    ./new-dir /path/to/new/dir

Next, run the server command:

    ./serve /path/to/new/dir

To export to PDF, keep the server running and execute:

    ./export /path/to/file.pdf
