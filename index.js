"use strict";

// Array.prototype.find polyfill
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find#Polyfill
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                if (i in list) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
            }
            return undefined;
        }
    });
}

// bad polyfill, but should do the trick
if(!String.prototype.endsWith){
    String.prototype.endsWith = function endsWith(str){
        var target = String(this)
        return target.lastIndexOf(str) === target.length - str.length;
    }
}
    

// imports
var fs = require("fs");
var path = require('path');
var resolve = path.resolve;
var join = path.join;

var Promise = require('es6-promise').Promise;
var jsdom = require('jsdom');
var marked = require('marked');


function makeDocument(htmlFragment){
    return new Promise(function(resolve, reject){
        jsdom.env(htmlFragment, function(err, window){
            if(err) reject(err);
            else resolve(window.document);
        });
    })
}

// args
var args = process.argv.slice(2);

// TODO : print out the options
if(!args[0])
    throw new Error('Need a path to a directory where a blog is to be built as argument');


var MAIN_DIRECTORY = resolve(process.cwd(), args[0]);
console.log('MAIN_DIRECTORY', MAIN_DIRECTORY);
var SOURCES_DIRECTORY = join(MAIN_DIRECTORY, '_sources');

var BASE_HTML_PATH = join(SOURCES_DIRECTORY, 'base.html');
var ARTICLES_DIRECTORY = join(SOURCES_DIRECTORY, 'articles');

var baseHTMLP = new Promise(function(resolve, reject){
    fs.readFile(BASE_HTML_PATH, function(err, baseHTMLBuffer){
        if(err) reject(err);
        else resolve(baseHTMLBuffer.toString());
    });
});


fs.readdir(ARTICLES_DIRECTORY, function(err, files){
    
    files
        .filter(function(f){ return f.endsWith('.md'); })
        .forEach(function(f){
            var path = join(ARTICLES_DIRECTORY, f);

            fs.readFile(path, function(err, fileContent){
                if(err) throw err;
                
                var html = marked(fileContent.toString());

                //console.log(f, html.length, typeof html);
                
                // always recreate a fresh doc from HTML string for baseHTML
                Promise.all([makeDocument(html), baseHTMLP.then(makeDocument)])
                    .then(function(results){
                        var articleDoc = results[0], baseDoc = results[1];
                        
                        var baseDocArticle = baseDoc.querySelector('article');

                        //console.log('baseDocArticle', baseDocArticle.outerHTML);
                        baseDocArticle.innerHTML = articleDoc.body.innerHTML;
                        
                        var path = join(MAIN_DIRECTORY, f.replace('.md', '.html'))
                        
                        fs.writeFile(path, baseDoc.innerHTML, function(err){
                            if(err) throw err;
                        })
                    }).catch(function(err){ console.error(err) } );
                
            })
        });
});
        