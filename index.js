//"use strict"; // uncomment when V8 stops being a bitch about const

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

// imports
const path = require('path');
const resolve = path.resolve;
const join = path.join;

const all = require("promised-io/promise").all;
const convertNodeAsyncFunction = require("promised-io/promise").convertNodeAsyncFunction;
const fs = require("promised-io/fs");

const request = convertNodeAsyncFunction(require('request'));

// args
const args = process.argv.slice(2);
if(!args[0])
    throw new Error('Need a path to a directory where a blog is to be built as argument');

const MAIN_DIRECTORY = resolve(process.cwd(), args[0]);
console.log('MAIN_DIRECTORY', MAIN_DIRECTORY);
const SOURCES_DIRECTORY = join(MAIN_DIRECTORY, '_sources');

const BASE_HTML_PATH = join(SOURCES_DIRECTORY, 'base.html');
const ARTICLES_DIRECTORY = join(SOURCES_DIRECTORY, 'articles');


const baseHTMLP = fs.readFile(BASE_HTML_PATH);

baseHTMLP.then(function(b){
    
});

fs.readdir(ARTICLES_DIRECTORY).then(function(files){
    
    const fileContentPs = files.map(function(f){
        const path = join(ARTICLES_DIRECTORY, f);
        
        return fs.readFile(path).then(function(fileContent){
            console.log(f, 'content\n', fileContent);
            
            return request({
                url: 'https://api.github.com/markdown/raw',
                method: 'POST',
                headers:{
                    'Content-Type': 'text/x-markdown',
                    'User-Agent': 'https://github.com/DavidBruant/davidbruant.github.io'
                },
                body: fileContent
            }).then(function(response){
                return response[1]; // second non-error argument of request is the body
            });
        })
    });
    
    all.apply(undefined, fileContentPs).then(function(c){
        console.log('c', c.toString());
    });
    
});





        