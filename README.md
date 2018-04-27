# Present

This is my scaffolding for composing presentations on the [Reveal.js](https://github.com/hakimel/reveal.js/) framework.

## Setup

First, install dependencies (including **Reveal.js**):

    npm install

Next, install [Decktape](https://github.com/astefanutti/decktape) for pixel-perfect export to PDF.

    npm install -g decktape

## Reference

To begin working on a new presentation, this creates a new directory containing a Markdown file `slides.md` and a subdirectory for assets.

    ./new-dir /path/to/new/dir

Next, run the server command:

    ./serve /path/to/new/dir

To export to PDF, keep the server running and execute:

    ./export /path/to/file.pdf
