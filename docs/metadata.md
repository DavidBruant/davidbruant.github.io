# Metadata documentation

Metadata is a JSON file representing an object.
Keys are filenames relative to the `_sources/articles` directory.
Values are objects like:

{
    "title": string
    "writing date": datetime-formatted string
    "meta": {
        "name": "content"
    },
    "data": {
        "key": "value"
    }
}

All fields are optional.

## title

The title in the Markdown file (h1, with `#`) takes precedence. If absent, the title in the metadata is used as `h1` and for `<title>`. If no title in either markdown file or metadata, then the filename is used

## rest

If not provided, "writing date" is the date and time of when the html version first appeared in the repo
meta are meant to fill &lt;meta> elements
data are meant to fill data attributes of any element