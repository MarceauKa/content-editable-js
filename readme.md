# Content Editable JS

Content editable helps you to interact with your HTML content.
Just add some attributes and let the magic happen!

- [Demo](https://marceauka.github.com/content-editable-js)
- [Basic usage](#basic-usage)
- [Documentation](#documentation)
- [Extend](#extend)
- [Server](#server)
- [Contribute](#contribute)
- [Licence](#licence)

## Basic usage

**Please note that library should not be used in production yet!**

### Add the library
```html
<!-- With CDN -->
<script src="https://unpkg.com/content-editable-js/dist/content-editable.js"></script>
<!-- Locally -->
<script src="dist/content-editable.js"></script>
```

Note: If you want to integrate content-editable-js to your own JS app, use npm `npm install content-editable-js --save`

### Call the library
```html
<script type="text/javascript">
let editable = contentEditable({
    // (default: true) Auto show the editor when initialized
    showOnInit: true,
    // (default: false) Show debug infos
    debug: true,
    // (default: null) URL called to save your content
    defaultEndpoint: 'http://127.0.0.1:1080/server.php',
    // (default: {}) Additional headers sent to your endpoint
    headers: {
        'Authorization': 'Bearer your-token'
    },
})
</script>
```

### Prepare your HTML
```html
<h4 data-editable="title">Hello world!</h4>

<img src="..." data-editable="picture" data-editable-is-image />

<p data-editable="paragraph" data-editable-is-text>
    Lorem ipsum dolor sit amet            
</p>
```

## Documentation

### Editable

An **Editable** is an HTML element that can be edited.

- `data-editable="KEY"`  
Where `KEY` is the name of the editable.

- `data-editable-type="TYPE"`  
Where `TYPE` is the type of the editable. Optional.  

|Name      |Description    |
|----------|---------------|
| `text`   | __(default)__ Simple text element without HTML |
| `html`   | Simple element with HTML content |
| `image`  | Simple image content |

### Groups

A **Group** is a collection of editables which are sent together to a same endpoint.
Groups must be configured at the parent of your editables.

- `data-group="KEY"`  
Where `KEY` is the name of the group. It must be unique.

- `data-group-endpoint="URL"`  
Where `URL` is your endpoint for the included editables.

#### Example
```html
<table data-group="openings" data-group-endpoint="http://your.url/openings/edit">
<tr>
    <td data-editable="week-days">Monday to Friday</td>
    <td data-editable="week-hours">8am to 8pm</td>
</tr>
<tr>
    <td data-editable="weekend-days">Saturday</td>
    <td data-editable="weekend-hours">10am to 7pm</td>
</tr>
</table>
```

### Methods

The function `contentEditable()` returns an App instance with some methods:

|Method        |Description                    |
|--------------|-------------------------------|
|show()        |Show the app and init editables|
|hide()        |Hide the app|
|setRecorder() |Add [your own recorder](#recorder) logic|
|setToolbar()  |Add [your own toolbar](#toolbar) logic|

## Extend

### Editable types

__TODO__

### Recorder

Recorder is in charge to post changes to your endpoints. When initializing you can replace the default one.
Just bring your own object (or class) with just a function named `save(changes = [])`.

```js
let contentEditable = contentEditable({ /* your config */ })

contentEditable.setRecorder({
  save(changes = [], endpoint = null) {
      /* My logic */
  }
})
```

See the default recorder located at [src/classes/recorder.js](https://github.com/MarceauKa/content-editable-js/tree/master/src/classes/recorder.js) for details.

### Toolbar

The toolbar is the default component responsible for showing edit buttons. You can replace it at the initialization.
Just implement an object with the functions `show()` and `hide()`. 
The library will hide the default one immediatly and replace it with your own.

```js
let contentEditable = contentEditable({ /* your config */ })

contentEditable.setToolbar({
  show() { /* My logic */ },
  hide() { /* My logic */ }  
})
```

See the default toolbar located at [src/classes/toolbar.js](https://github.com/MarceauKa/content-editable-js/tree/master/src/classes/toolbar.js) for details.

### Localization

For now, this library is translated in English and French.
Localizations are hard-coded in `src/classes/i18n.js`.

Note that the locale is based on the HTML **lang attribute**.

### Backend

You can easily develop your own backend (in PHP, node.js, etc...), when changes are made, your endpoint will be reached with a POST request, containing:
- Your configured headers
- Array of objects containing the editable name and the editable value 

## Server

This library provides a basic PHP server to test your integration. 
Clone this repo and just run the following PHP command at the root:

```bash
php -S 127.0.0.1:1080
```

You now have the access to:
- The demo page: [http://127.0.0.1:1080/index.html](http://127.0.0.1:1080/index.html)
- The server endpoint: [http://127.0.0.1:1080/server.php](http://127.0.0.1:1080/server.php)

## Support

Content Editable is built for modern web browsers. No supports for IE.
For bugs and suggestions, [open an issue here](https://github.com/MarceauKa/content-editable-js/issues).

## Contribute

Feel free to make a PR! Once cloned, use these commands:

```
npm install # or yarn install
npm run dev # or npm run watch
npm run prod # before commit 
```

## Licence

MIT
