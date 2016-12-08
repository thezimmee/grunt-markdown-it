# grunt-markdown-it

Small wrapper for [markdown-it](https://github.com/markdown-it/markdown-it). Converts `*.md` files to `.html` files.

- Syntax highlighting support
- Works with many `markdown-it` plugins

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-markdown-it --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-markdown-it');
```

## Usage

```js
grunt.initConfig({
  markdownit: {
    options: {
      // markdown-it options here
    },
    target: {
      // target-specific file lists and/or options go here.
    },
  },
})
```

## Options

Possible options are as follows:

### `options.highlightjs`
Type: `boolean` Default: `false`

Easy way to enable parsing of code blocks for syntax highlighting with [highlight.js](highlightjs.org/). Alternatively you may use `markdown-it`'s `highlight` property, or the `options.plugins` property, to implement a different syntax highlighting soluton.

_Note: If set to true, make sure `highlight.js` is installed. You will also need to include the `highlight.js` script and desired styles. See [highlight.js usage](highlightjs.org/usage/) for details._

### `options.prefix`
Type: `string` Default: `<pre class="hljs"><code class="{{langClass}}">`

Simple way to override the default opening tag(s) for a code block. Make sure to use with `options.suffix`.

### `options.suffix`
Type: `string` Default: `</code></pre>`

Simple way to override the default closing tag(s) for a code block. Make sure to use with `options.prefix`.

### `options.plugins`
Type: `object` Default: `null`

Pass plugins to markdown-it. _Currently only plugins with zero configuration or a single configuration object will work._

### `options.*`

Any other options not specified above are passed directly to [markdown-it](https://github.com/markdown-it/markdown-it).

## Release History

- 0.1.1: Initial release.

## To Do:

- [ ] Integrate markdown-it plugins that might have multiple arguments.

## License

(c) 2016 The Zimmee
Licensed under the MIT License
